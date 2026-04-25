"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Calendar,
  X,
  Download,
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

interface OrderInfo {
  _id: string;
  stripeSessionId: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  product: string;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 10;

export function StripePayments() {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const [sortField, setSortField] = useState<
    "createdAt" | "customerEmail" | "amount" | "stripeSessionId" | "product"
  >("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const fetchOrders = async () => {
    try {
      setRefreshing(true);

      // Fetch orders from Sanity
      const response = await fetch("/api/admin/stripe-payments");
      const data = await response.json();

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setCurrentPage(1);
    fetchOrders();
  };

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter(order => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.stripeSessionId
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      // Date filter
      const orderDate = new Date(order.createdAt);
      const matchesDate =
        selectedDate === "" ||
        orderDate.toDateString() === new Date(selectedDate).toDateString();

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort orders
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
        case "stripeSessionId":
          aValue = a.stripeSessionId.toLowerCase();
          bValue = b.stripeSessionId.toLowerCase();
          break;
        case "product":
          aValue = a.product.toLowerCase();
          bValue = b.product.toLowerCase();
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
    orders,
    searchQuery,
    statusFilter,
    selectedDate,
    sortField,
    sortDirection,
  ]);

  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredAndSortedOrders.length / ITEMS_PER_PAGE);

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

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency || "USD").toUpperCase(),
    }).format(amount / 100);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">
            Loading payment information...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-1 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="space-y-6">
        {/* Title and Stats */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-3">
              Stripe Payments Management
            </h2>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {filteredAndSortedOrders.length} orders
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {
                  filteredAndSortedOrders.filter(o => o.status === "completed")
                    .length
                }{" "}
                completed
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {
                  filteredAndSortedOrders.filter(o => o.status === "pending")
                    .length
                }{" "}
                pending
              </span>
              <span className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {
                  filteredAndSortedOrders.filter(o => o.status === "failed")
                    .length
                }{" "}
                failed
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
              placeholder="Search by email, session ID, or product..."
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
                setStatusFilter(
                  e.target.value as "all" | "completed" | "pending" | "failed"
                )
              }
              className="pl-10 pr-8 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
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

      {/* Stripe Payments Table */}
      <div className="border-none rounded-sm bg-card space-y-4">
        <Card
          className="overflow-hidden flex flex-col flex-1 min-h-0 border rounded-sm"
          style={{ height: "calc(100vh - 250px)" }}
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
                  onClick={() => handleSort("stripeSessionId")}
                >
                  <div className="flex items-center gap-1">
                    Session ID
                    {sortField === "stripeSessionId" &&
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
                  onClick={() => handleSort("product")}
                >
                  <div className="flex items-center gap-1">
                    Product
                    {sortField === "product" &&
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
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map(order => (
                <TableRow key={order._id}>
                  <TableCell className="px-4 pl-12">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-foreground" />
                      <span className="text-xs text-foreground">
                        {order.customerEmail || "No email"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <code
                      className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded font-mono cursor-pointer hover:bg-muted/70 transition-colors text-muted-foreground/80"
                      onClick={() =>
                        copyToClipboard(order.stripeSessionId || "")
                      }
                      title="Click to copy session ID"
                    >
                      {order.stripeSessionId
                        ? `${order.stripeSessionId.slice(0, 12)}...`
                        : "No session ID"}
                    </code>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-foreground">
                        {formatCurrency(order.amount, order.currency)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-xs text-foreground">
                      {order.product || "Unknown product"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <span className="text-xs text-muted-foreground/70">
                      {formatDate(order.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    {getStatusBadge(order.status || "pending")}
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
                  filteredAndSortedOrders.length
                )}{" "}
                of {filteredAndSortedOrders.length} results
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
      {filteredAndSortedOrders.length === 0 && orders.length > 0 && (
        <Card className="p-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or filters to find what you&apos;re
            looking for.
          </p>
        </Card>
      )}

      {orders.length === 0 && (
        <Card className="p-12 text-center">
          <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No payments found</h3>
          <p className="text-sm text-muted-foreground">
            Payment information will appear here once customers make purchases.
          </p>
        </Card>
      )}
    </div>
  );
}
