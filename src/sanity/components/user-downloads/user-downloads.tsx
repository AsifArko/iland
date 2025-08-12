"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Download,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Mail,
  Clock,
  CheckCircle,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Calendar,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadInfo } from "./downloads/types";
import { formatDate, formatCurrency, copyToClipboard } from "./downloads/utils";
import { EmailSender } from "@/components/ui/email-sender";

const ITEMS_PER_PAGE = 6;

export function UserDownloads() {
  const [downloads, setDownloads] = useState<DownloadInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [renewingSession, setRenewingSession] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [expandingSession, setExpandingSession] = useState<string | null>(null);
  const [expiryMinutes, setExpiryMinutes] = useState(10);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "expired"
  >("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const [sortField, setSortField] = useState<
    "createdAt" | "customerEmail" | "amount" | "sessionId"
  >("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const fetchData = useCallback(async () => {
    try {
      setRefreshing(true);

      // Fetch orders from Sanity
      const ordersResponse = await fetch("/api/admin/downloads");
      const ordersData = await ordersResponse.json();

      console.log("Fetched downloads data:", ordersData);
      console.log("Number of downloads:", ordersData.downloads?.length || 0);

      // Check if our session is in the data
      const ourSession = ordersData.downloads?.find(
        (d: DownloadInfo) => d.sessionId === expandingSession
      );
      console.log("Our session in fetched data:", ourSession);

      setDownloads(ordersData.downloads || []);
    } catch (error) {
      console.error("Error fetching download data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [expandingSession]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setCurrentPage(1);
    fetchData();
  };

  // Filter and sort downloads
  const filteredAndSortedDownloads = useMemo(() => {
    const filtered = downloads.filter(download => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        download.customerEmail
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        download.sessionId.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && download.hasActiveToken) ||
        (statusFilter === "expired" && !download.hasActiveToken);

      // Date filter
      const downloadDate = new Date(download.createdAt);
      const matchesDate =
        selectedDate === "" ||
        downloadDate.toDateString() === new Date(selectedDate).toDateString();

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort downloads
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number, bValue: string | number;

      switch (sortField) {
        case "customerEmail":
          aValue = a.customerEmail.toLowerCase();
          bValue = b.customerEmail.toLowerCase();
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "sessionId":
          aValue = a.sessionId.toLowerCase();
          bValue = b.sessionId.toLowerCase();
          break;
        case "createdAt":
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [
    downloads,
    searchQuery,
    statusFilter,
    selectedDate,
    sortField,
    sortDirection,
  ]);

  const paginatedDownloads = filteredAndSortedDownloads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(
    filteredAndSortedDownloads.length / ITEMS_PER_PAGE
  );

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  // Calendar functions
  const formatCalendarDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add previous month's days to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add next month's days to fill the last week
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(formatCalendarDate(date));
    setIsCalendarOpen(false);
  };

  const clearDateFilter = () => {
    setSelectedDate("");
    setIsCalendarOpen(false);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">
            Loading download information...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-1 h-screen flex flex-col overflow-hidden">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">
            Download link renewed and copied to clipboard!
          </span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-6">
        {/* Title and Stats */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-3">
              User Downloads
            </h2>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {filteredAndSortedDownloads.length} downloads
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {
                  filteredAndSortedDownloads.filter(d => d.hasActiveToken)
                    .length
                }{" "}
                active tokens
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {
                  filteredAndSortedDownloads.filter(d => d.hasActiveToken)
                    .length
                }{" "}
                active sessions
              </span>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {refreshing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <Download className="h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by email or session ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e =>
                setStatusFilter(e.target.value as "all" | "active" | "expired")
              }
              className="pl-10 pr-8 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Date Filter */}
          <div className="relative" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className={`pl-10 pr-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background cursor-pointer flex items-center justify-between min-w-[140px] ${
                selectedDate
                  ? "border-primary text-foreground"
                  : "border-input text-muted-foreground"
              }`}
            >
              <span className="truncate">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString()
                  : "Select date"}
              </span>
              {selectedDate && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    clearDateFilter();
                  }}
                  className="absolute right-8 p-0.5 hover:bg-muted rounded-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </button>
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

            {/* Calendar Dropdown */}
            {isCalendarOpen && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-input rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1
                        )
                      )
                    }
                    className="p-1 hover:bg-muted rounded-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h3 className="text-sm font-medium">
                    {currentMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1
                        )
                      )
                    }
                    className="p-1 hover:bg-muted rounded-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    day => (
                      <div
                        key={day}
                        className="text-xs text-muted-foreground text-center py-1"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((date, index) => {
                    const isCurrentMonth =
                      date.getMonth() === currentMonth.getMonth();
                    const isSelected =
                      selectedDate === formatCalendarDate(date);
                    const isToday =
                      formatCalendarDate(date) ===
                      formatCalendarDate(new Date());

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        className={`h-8 text-xs rounded-sm transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : isToday
                              ? "bg-muted text-foreground hover:bg-muted/80"
                              : isCurrentMonth
                                ? "text-foreground hover:bg-muted"
                                : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <button
                    onClick={() => handleDateSelect(new Date())}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Today
                  </button>
                  <button
                    onClick={clearDateFilter}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Downloads Table */}
      <div className="border-none rounded-sm bg-card space-y-4">
        <Card
          className="overflow-hidden flex flex-col flex-1 min-h-0 border rounded-sm"
          style={{ height: "calc(100vh - 250px)", backgroundColor: "ffeefe" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 pl-12 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("customerEmail")}
                >
                  <div className="flex items-center gap-1">
                    Customer
                    {sortField === "customerEmail" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("sessionId")}
                >
                  <div className="flex items-center gap-1">
                    Session
                    {sortField === "sessionId" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center gap-1">
                    Amount
                    {sortField === "amount" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1">
                    Created
                    {sortField === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4">
                  Renew Token
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDownloads.map(download => (
                <TableRow key={download.sessionId}>
                  <TableCell className="px-4 pl-12">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-foreground" />
                      <span className="text-xs text-foreground">
                        {download.customerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <code
                      className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono cursor-pointer hover:bg-muted/70 transition-colors text-muted-foreground/80"
                      onClick={() => copyToClipboard(download.sessionId)}
                      title="Click to copy session ID"
                    >
                      {download.sessionId.slice(0, 12)}...
                    </code>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-xs text-foreground">
                      {formatCurrency(download.amount, download.currency)}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-xs text-muted-foreground/70">
                      {formatDate(download.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex items-center space-x-1">
                      {download.hasActiveToken ? (
                        <div className="flex items-center bg-muted/30 rounded-lg p-1 border border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(download.downloadUrl)
                            }
                            className="h-7 w-7 p-0 hover:bg-background/80 transition-all duration-200 rounded-md"
                            title="Copy download link"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                          <div className="w-px h-4 bg-border/50 mx-0.5"></div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(download.downloadUrl, "_blank")
                            }
                            className="h-7 w-7 p-0 hover:bg-background/80 transition-all duration-200 rounded-md"
                            title="Open download link"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                          <div className="w-px h-4 bg-border/50 mx-0.5"></div>
                          <EmailSender
                            customerEmail={download.customerEmail}
                            downloadUrl={download.downloadUrl}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-background/80 transition-all duration-200 rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={renewingSession === download.sessionId}
                            onClick={() => {
                              setExpandingSession(
                                expandingSession === download.sessionId
                                  ? null
                                  : download.sessionId
                              );
                            }}
                            className="h-8 px-3 text-xs"
                            title="Renew token"
                          >
                            Renew Token
                          </Button>

                          {/* Inline expiry form */}
                          {expandingSession === download.sessionId && (
                            <div className="bg-muted/50 p-3 rounded-md border space-y-3">
                              <div className="flex items-center gap-2">
                                <label className="text-xs font-medium">
                                  Expiry (minutes):
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="60"
                                  value={expiryMinutes}
                                  onChange={e =>
                                    setExpiryMinutes(Number(e.target.value))
                                  }
                                  className="w-16 px-2 py-1 text-xs border border-input rounded focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={async () => {
                                    // Prevent multiple clicks
                                    if (
                                      renewingSession === download.sessionId
                                    ) {
                                      return;
                                    }

                                    try {
                                      console.log(
                                        "Creating link for session:",
                                        download.sessionId
                                      );
                                      console.log(
                                        "Expiry minutes:",
                                        expiryMinutes
                                      );

                                      setRenewingSession(download.sessionId);

                                      const response = await fetch(
                                        "/api/proxy-url",
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            sessionId: download.sessionId,
                                            expiryMinutes: expiryMinutes,
                                          }),
                                        }
                                      );

                                      console.log(
                                        "Response status:",
                                        response.status
                                      );
                                      console.log("Response ok:", response.ok);

                                      if (response.ok) {
                                        const data = await response.json();
                                        console.log("Response data:", data);

                                        // Add a small delay to ensure state updates properly
                                        await new Promise(resolve =>
                                          setTimeout(resolve, 100)
                                        );

                                        copyToClipboard(data.downloadUrl);
                                        setShowSuccessMessage(true);
                                        setTimeout(
                                          () => setShowSuccessMessage(false),
                                          3000
                                        );

                                        // Store session ID before clearing state
                                        const currentSessionId =
                                          download.sessionId;

                                        // Wait for the token to be properly available in the database
                                        console.log(
                                          "Waiting for token to be available in database..."
                                        );
                                        let tokenAvailable = false;
                                        let attempts = 0;
                                        const maxAttempts = 10;

                                        while (
                                          !tokenAvailable &&
                                          attempts < maxAttempts
                                        ) {
                                          attempts++;
                                          console.log(
                                            `Checking for token availability (attempt ${attempts})...`
                                          );

                                          // Wait before checking
                                          await new Promise(resolve =>
                                            setTimeout(resolve, 1000)
                                          );

                                          try {
                                            const checkResponse = await fetch(
                                              "/api/admin/downloads"
                                            );
                                            const checkData =
                                              await checkResponse.json();
                                            const sessionData =
                                              checkData.downloads?.find(
                                                (d: DownloadInfo) =>
                                                  d.sessionId ===
                                                  currentSessionId
                                              );

                                            if (
                                              sessionData &&
                                              sessionData.hasActiveToken
                                            ) {
                                              console.log(
                                                "Token is now available in database!"
                                              );
                                              tokenAvailable = true;
                                              // Update the local state with the new data
                                              setDownloads(
                                                checkData.downloads || []
                                              );
                                              break;
                                            } else {
                                              console.log(
                                                "Token not yet available, retrying..."
                                              );
                                              console.log(
                                                "Session data:",
                                                sessionData
                                              );
                                              if (sessionData) {
                                                console.log(
                                                  "hasActiveToken:",
                                                  sessionData.hasActiveToken
                                                );
                                                console.log(
                                                  "isExpired:",
                                                  sessionData.isExpired
                                                );
                                                console.log(
                                                  "expiresAt:",
                                                  sessionData.expiresAt
                                                );
                                              }
                                            }
                                          } catch (error) {
                                            console.error(
                                              "Error checking token availability:",
                                              error
                                            );
                                          }
                                        }

                                        if (!tokenAvailable) {
                                          console.error(
                                            "Token verification failed after all attempts"
                                          );
                                          // Still refresh the data as a fallback
                                          await fetchData();
                                        }

                                        console.log(
                                          "Token creation process completed"
                                        );
                                        setExpandingSession(null);
                                      } else {
                                        const errorData = await response.json();
                                        console.error(
                                          "Failed to renew download link:",
                                          errorData
                                        );
                                      }
                                    } catch (error) {
                                      console.error(
                                        "Error renewing download link:",
                                        error
                                      );
                                    } finally {
                                      setRenewingSession(null);
                                    }
                                  }}
                                  disabled={
                                    renewingSession === download.sessionId
                                  }
                                  className={`h-7 px-2 text-xs transition-all duration-200 ${
                                    renewingSession === download.sessionId
                                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  {renewingSession === download.sessionId ? (
                                    <div className="flex items-center gap-1.5">
                                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-muted-foreground/30 border-t-muted-foreground"></div>
                                      <span className="text-xs">
                                        Creating...
                                      </span>
                                    </div>
                                  ) : (
                                    "Create Link"
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setExpandingSession(null)}
                                  className="h-7 px-2 text-xs"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <Badge variant="default">
                      {download.hasActiveToken ? "Active" : "Expired"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2 border-t">
              <div className="text-xs text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredAndSortedDownloads.length
                )}{" "}
                of {filteredAndSortedDownloads.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-8 px-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0 text-sm"
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="h-8 px-3"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Empty States */}
      {filteredAndSortedDownloads.length === 0 && downloads.length > 0 && (
        <Card className="p-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or filters to find what you&apos;re
            looking for.
          </p>
        </Card>
      )}

      {downloads.length === 0 && (
        <Card className="p-12 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No downloads found</h3>
          <p className="text-sm text-muted-foreground">
            Download information will appear here once customers make purchases.
          </p>
        </Card>
      )}
    </div>
  );
}
