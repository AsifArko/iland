"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  FolderOpen,
  Monitor,
  Smartphone,
  StickyNote,
  Code,
  Bolt,
  BookMarked,
} from "lucide-react";

const desktopScreens = [
  {
    id: " ",
    title: "Home Page",
    description:
      "Welcome dashboard with marketplace overview and quick actions",
    icon: Home,
    color: "from-blue-500 to-purple-600",
    placeholder: "Home Dashboard",
    image: "/desktop-ui/iland-homepage.png",
  },
  {
    id: "my-courses",
    title: "My Downloads",
    description: "Browse and manage all your purchased source code",
    icon: BookOpen,
    color: "from-green-500 to-teal-600",
    placeholder: "Download Library",
    image: "/desktop-ui/my-courses.png",
  },
  {
    id: "courses/course-slug",
    title: "Product Page",
    description: "Detailed product view with features and purchase options",
    icon: GraduationCap,
    color: "from-orange-500 to-red-600",
    placeholder: "Product Details",
    image: "/desktop-ui/course-details.png",
  },
  {
    id: "dashboard/courses/slug/lessons/lesson-slug",
    title: "Download Page",
    description: "Secure download experience with verification and access",
    icon: Play,
    color: "from-purple-500 to-pink-600",
    placeholder: "Download Content",
    image: "/desktop-ui/lesson-page.png",
  },
  {
    id: "lesson-notes",
    title: "Documentation",
    description: "Comprehensive documentation and setup guides",
    icon: StickyNote,
    color: "from-purple-500 to-pink-600",
    placeholder: "Documentation",
    image: "/desktop-ui/lesson-notes.png",
  },
  {
    id: "dashboard/courses/id/lessons/id",
    title: "Analytics",
    description: "Sales and download analytics dashboard",
    icon: Code,
    color: "from-indigo-500 to-blue-600",
    placeholder: "Analytics Dashboard",
    image: "/desktop-ui/jupyter-view.png",
  },
  {
    id: "studio",
    title: "Studio",
    description: "Sanity Studio for content management",
    icon: Bolt,
    color: "from-indigo-500 to-blue-600",
    placeholder: "Content Studio",
    image: "/desktop-ui/sanity.png",
  },
  {
    id: "asset-manager",
    title: "Asset Manager",
    description: "Manage and organize your source code assets",
    icon: FolderOpen,
    color: "from-emerald-500 to-green-600",
    placeholder: "Asset Management",
    image: "/desktop-ui/asset-manager.png",
  },
];

const mobileScreens = [
  {
    id: "mobile-home",
    title: "Mobile Home",
    description: "Optimized mobile dashboard for on-the-go marketplace access",
    icon: Home,
    color: "from-blue-500 to-purple-600",
    placeholder: "Mobile Dashboard",
    image: "/mobile-ui/home.png",
  },
  {
    id: "mobile-courses",
    title: "My Downloads",
    description: "Browse downloads with touch-friendly interface",
    icon: BookMarked,
    color: "from-green-500 to-teal-600",
    placeholder: "Download Library",
    image: "/mobile-ui/myCourses.png",
  },
  {
    id: "mobile-course-page",
    title: "Product Page",
    description: "Detailed product view with features and purchase options",
    icon: GraduationCap,
    color: "from-orange-500 to-red-600",
    placeholder: "Product Details",
    image: "/mobile-ui/coursePage.png",
  },
  {
    id: "mobile-lesson",
    title: "Download Page",
    description: "Download anywhere with responsive interface",
    icon: Play,
    color: "from-purple-500 to-pink-600",
    placeholder: "Download View",
    image: "/mobile-ui/lessonPage.png",
  },
  {
    id: "mobile-sidebar",
    title: "Sidebar",
    description: "Navigation and menu options for mobile interface",
    icon: BarChart3,
    color: "from-indigo-500 to-blue-600",
    placeholder: "Navigation Menu",
    image: "/mobile-ui/sidebar.png",
  },
];

type DeviceType = "desktop" | "mobile";

export function Screenshots() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousDeviceType, setPreviousDeviceType] =
    useState<DeviceType>("desktop");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Retry failed images after a delay
  const retryImage = (imagePath: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(imagePath);
      return newSet;
    });
  };

  // Auto-retry failed images after 5 seconds
  useEffect(() => {
    if (imageErrors.size > 0) {
      const timer = setTimeout(() => {
        imageErrors.forEach(imagePath => {
          retryImage(imagePath);
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [imageErrors]);

  const screens = deviceType === "desktop" ? desktopScreens : mobileScreens;
  const previousScreens =
    previousDeviceType === "desktop" ? desktopScreens : mobileScreens;

  const nextScreen = () => {
    setCurrentScreen(prev => (prev + 1) % screens.length);
  };

  const prevScreen = () => {
    setCurrentScreen(prev => (prev - 1 + screens.length) % screens.length);
  };

  const goToScreen = (index: number) => {
    setCurrentScreen(index);
  };

  const switchDevice = (type: DeviceType) => {
    if (type === deviceType) return;

    setIsTransitioning(true);
    setPreviousDeviceType(deviceType);

    // Delay the actual switch to allow for smooth transition
    setTimeout(() => {
      setDeviceType(type);
      setCurrentScreen(0);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            See iLand in action
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Explore our intuitive interface designed for modern learning
            experiences across all devices.
          </p>
        </div>

        {/* Device Type Selector */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
              <button
                onClick={() => switchDevice("desktop")}
                disabled={isTransitioning}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  deviceType === "desktop"
                    ? "bg-background text-foreground shadow-sm scale-105"
                    : "text-muted-foreground hover:text-foreground"
                } ${isTransitioning ? "opacity-50 pointer-events-none" : ""}`}
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
                <span className="sm:hidden">Desktop</span>
              </button>
              <button
                onClick={() => switchDevice("mobile")}
                disabled={isTransitioning}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  deviceType === "mobile"
                    ? "bg-background text-foreground shadow-sm scale-105"
                    : "text-muted-foreground hover:text-foreground"
                } ${isTransitioning ? "opacity-50 pointer-events-none" : ""}`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
                <span className="sm:hidden">Mobile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Screen Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center min-h-[48px]">
            {/* Show previous screens during transition to maintain layout */}
            {(isTransitioning ? previousScreens : screens).map(
              (screen, index) => {
                const Icon = screen.icon;
                const isVisible =
                  !isTransitioning ||
                  index < Math.min(previousScreens.length, screens.length);
                const isActive = currentScreen === index && !isTransitioning;

                return (
                  <button
                    key={`${isTransitioning ? "prev-" : "current-"}${screen.id}`}
                    onClick={() => !isTransitioning && goToScreen(index)}
                    disabled={isTransitioning}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-500 ease-out ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    } ${
                      isTransitioning
                        ? "opacity-50 scale-95 pointer-events-none"
                        : "opacity-100 scale-100"
                    } ${!isVisible ? "hidden" : ""}`}
                    style={{
                      transform: `translateY(${isTransitioning ? "10px" : "0px"})`,
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden lg:inline">
                      {screen.title}
                    </span>
                    <span className="text-sm font-medium lg:hidden">
                      {screen.title.split(" ")[0]}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Main Screenshot Display */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevScreen}
            disabled={isTransitioning}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl ${
              isTransitioning ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextScreen}
            disabled={isTransitioning}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl ${
              isTransitioning ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Transition Overlay */}
          {isTransitioning && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-foreground">
                    Switching to{" "}
                    {previousDeviceType === "desktop" ? "Mobile" : "Desktop"}{" "}
                    view...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Screenshot Container */}
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              {/* Screenshot Display */}
              <div className="relative group min-h-[600px]">
                {deviceType === "desktop" ? (
                  <div
                    className={`transition-all duration-700 ease-in-out transform ${
                      isTransitioning
                        ? "opacity-0 scale-95 translate-y-4"
                        : "opacity-100 scale-100 translate-y-0"
                    }`}
                  >
                    {/* Desktop Device Frame */}
                    <div className="mx-auto max-w-4xl">
                      <div className="relative rounded-sm overflow-hidden shadow-2xl border border-border/50 bg-background">
                        {/* Browser Bar */}
                        <div className="bg-muted/50 border-b border-border/50 px-4 py-3 flex items-center gap-2">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="bg-background rounded-lg px-3 py-1 text-xs text-muted-foreground text-center">
                              iland.com/{screens[currentScreen].id}
                            </div>
                          </div>
                        </div>

                        {/* Screen Content */}
                        <div className="relative">
                          <div
                            className={`aspect-video w-full bg-gradient-to-br ${screens[currentScreen].color} bg-opacity-10 flex items-center justify-center relative overflow-hidden`}
                          >
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse"></div>
                            </div>

                            {/* Show image if available and not in error state, otherwise show placeholder */}
                            {screens[currentScreen].image &&
                            !imageErrors.has(screens[currentScreen].image) ? (
                              <>
                                <Image
                                  src={screens[currentScreen].image}
                                  alt={screens[currentScreen].title}
                                  fill
                                  className="object-cover"
                                  priority={currentScreen === 0}
                                  onError={e => {
                                    console.warn(
                                      `Failed to load image: ${screens[currentScreen].image}`
                                    );
                                    setImageErrors(prev =>
                                      new Set(prev).add(
                                        screens[currentScreen].image
                                      )
                                    );
                                    // Fallback to placeholder on error
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement;
                                    if (parent) {
                                      const placeholder = parent.querySelector(
                                        ".image-placeholder"
                                      ) as HTMLElement;
                                      if (placeholder) {
                                        placeholder.style.display = "block";
                                      }
                                    }
                                  }}
                                />
                                {/* Fallback placeholder */}
                                <div
                                  className="image-placeholder absolute inset-0 flex items-center justify-center text-center z-10"
                                  style={{ display: "none" }}
                                >
                                  <div>
                                    <div className="text-4xl sm:text-6xl font-bold text-foreground/20 mb-4">
                                      {screens[currentScreen].placeholder}
                                    </div>
                                    <div className="text-sm text-muted-foreground/50 mb-4">
                                      Image preview
                                    </div>
                                    <button
                                      onClick={() =>
                                        retryImage(screens[currentScreen].image)
                                      }
                                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                                    >
                                      Retry Image
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="text-center z-10">
                                <div className="text-4xl sm:text-6xl font-bold text-foreground/20 mb-4">
                                  {screens[currentScreen].placeholder}
                                </div>
                                <div className="text-sm text-muted-foreground/50">
                                  Interactive preview coming soon
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-700 ease-in-out transform ${
                      isTransitioning
                        ? "opacity-0 scale-95 translate-y-4"
                        : "opacity-100 scale-100 translate-y-0"
                    }`}
                  >
                    {/* Professional Mobile Screenshot Display */}
                    <div className="mx-auto max-w-4xl">
                      <div className="relative">
                        {/* Mobile Screenshot Container */}
                        <div className="relative mx-auto max-w-[280px]">
                          {/* Screenshot Frame with Elegant Styling */}
                          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-border/20">
                            {/* Subtle gradient overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 rounded-2xl pointer-events-none"></div>

                            {/* Screenshot Content */}
                            <div className="relative">
                              {screens[currentScreen].image &&
                              !imageErrors.has(screens[currentScreen].image) ? (
                                <div className="relative w-full">
                                  <Image
                                    src={screens[currentScreen].image}
                                    alt={screens[currentScreen].title}
                                    width={280}
                                    height={560}
                                    className="w-full h-auto object-contain max-h-[500px]"
                                    priority={currentScreen === 0}
                                    style={{ aspectRatio: "auto" }}
                                    onError={e => {
                                      console.warn(
                                        `Failed to load mobile image: ${screens[currentScreen].image}`
                                      );
                                      setImageErrors(prev =>
                                        new Set(prev).add(
                                          screens[currentScreen].image
                                        )
                                      );
                                      // Fallback to placeholder on error
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.style.display = "none";
                                      const parent = target.parentElement;
                                      if (parent) {
                                        const placeholder =
                                          parent.querySelector(
                                            ".mobile-image-placeholder"
                                          ) as HTMLElement;
                                        if (placeholder) {
                                          placeholder.style.display = "block";
                                        }
                                      }
                                    }}
                                  />
                                  {/* Fallback placeholder for mobile */}
                                  <div
                                    className="mobile-image-placeholder absolute inset-0 flex items-center justify-center text-center"
                                    style={{ display: "none" }}
                                  >
                                    <div className="px-4">
                                      <div className="text-base font-bold text-gray-400 mb-2">
                                        {screens[currentScreen].placeholder}
                                      </div>
                                      <div className="text-xs text-gray-500 mb-3">
                                        Mobile interface
                                      </div>
                                      <button
                                        onClick={() =>
                                          retryImage(
                                            screens[currentScreen].image
                                          )
                                        }
                                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 transition-colors"
                                      >
                                        Retry
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="aspect-[9/16] w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <div className="text-center px-4">
                                    <div className="text-base font-bold text-gray-400 mb-2">
                                      {screens[currentScreen].placeholder}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Mobile interface
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Professional Shadow */}
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-4 bg-gradient-to-r from-black/10 via-black/20 to-black/10 rounded-full blur-lg"></div>

                          {/* Ambient Glow */}
                          <div className="absolute -inset-6 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl blur-2xl opacity-30"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Screen Indicators */}
        <div className="flex justify-center mt-8 gap-2 min-h-[8px]">
          {(isTransitioning ? previousScreens : screens).map((_, index) => {
            const isVisible =
              !isTransitioning ||
              index < Math.min(previousScreens.length, screens.length);
            const isActive = currentScreen === index && !isTransitioning;

            return (
              <button
                key={`indicator-${isTransitioning ? "prev-" : "current-"}${index}`}
                onClick={() => !isTransitioning && goToScreen(index)}
                disabled={isTransitioning}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                  isActive
                    ? "bg-primary w-6 scale-125"
                    : "bg-border hover:bg-primary/50"
                } ${
                  isTransitioning
                    ? "opacity-40 scale-50"
                    : "opacity-100 scale-100"
                } ${!isVisible ? "hidden" : ""}`}
                style={{
                  transitionDelay: `${index * 40}ms`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
