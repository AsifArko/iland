"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Download,
  MonitorIcon,
  ChartLine,
  ChartSpline,
  Code,
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
    id: "user-downloads",
    title: "Downloads",
    description: "User downloads and Token management",
    icon: Download,
    color: "from-green-500 to-teal-600",
    placeholder: "Download Library",
    image: "/desktop-ui/user-downloads.png",
  },
  {
    id: "traffic-overview",
    title: "Traffic Overview",
    description: "Reliable traffic overview for your site",
    icon: ChartLine,
    color: "from-orange-500 to-red-600",
    placeholder: "Traffic Overview",
    image: "/desktop-ui/traffic-overview.png",
  },
  {
    id: "system-monitoring",
    title: "System Monitoring",
    description: "Your own system monitoring dashboard",
    icon: MonitorIcon,
    color: "from-purple-500 to-pink-600",
    placeholder: "Download Content",
    image: "/desktop-ui/system-monitoring.png",
  },
  {
    id: "site-analytics",
    title: "Site Analytics",
    description: "Comprehensive analytics for your site",
    icon: ChartSpline,
    color: "from-purple-500 to-pink-600",
    placeholder: "Site Analytics",
    image: "/desktop-ui/site-analytics.png",
  },
  {
    id: "user-events",
    title: "User Events",
    description: "See yours interactions with the platform",
    icon: Code,
    color: "from-indigo-500 to-blue-600",
    placeholder: "Analytics Dashboard",
    image: "/desktop-ui/user-events.png",
  },
];

export function Screenshots() {
  const [currentScreen, setCurrentScreen] = useState(0);
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

  const nextScreen = () => {
    setCurrentScreen(prev => (prev + 1) % desktopScreens.length);
  };

  const prevScreen = () => {
    setCurrentScreen(
      prev => (prev - 1 + desktopScreens.length) % desktopScreens.length
    );
  };

  const goToScreen = (index: number) => {
    setCurrentScreen(index);
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
            Explore our intuitive desktop interface designed for modern learning
            experiences.
          </p>
        </div>

        {/* Screen Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center min-h-[48px]">
            {desktopScreens.map((screen, index) => {
              const Icon = screen.icon;
              const isActive = currentScreen === index;

              return (
                <button
                  key={screen.id}
                  onClick={() => goToScreen(index)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary shadow-lg scale-105"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
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
            })}
          </div>
        </div>

        {/* Main Screenshot Display */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevScreen}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextScreen}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Screenshot Container */}
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              {/* Screenshot Display */}
              <div className="relative group min-h-[600px]">
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
                          iland.com/{desktopScreens[currentScreen].id}
                        </div>
                      </div>
                    </div>

                    {/* Screen Content */}
                    <div className="relative">
                      <div
                        className={`aspect-video w-full bg-gradient-to-br ${desktopScreens[currentScreen].color} bg-opacity-10 flex items-center justify-center relative overflow-hidden`}
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse"></div>
                        </div>

                        {/* Show image if available and not in error state, otherwise show placeholder */}
                        {desktopScreens[currentScreen].image &&
                        !imageErrors.has(
                          desktopScreens[currentScreen].image
                        ) ? (
                          <>
                            <Image
                              src={desktopScreens[currentScreen].image}
                              alt={desktopScreens[currentScreen].title}
                              fill
                              className="object-cover"
                              priority={currentScreen === 0}
                              onError={e => {
                                console.warn(
                                  `Failed to load image: ${desktopScreens[currentScreen].image}`
                                );
                                setImageErrors(prev =>
                                  new Set(prev).add(
                                    desktopScreens[currentScreen].image
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
                                  {desktopScreens[currentScreen].placeholder}
                                </div>
                                <div className="text-sm text-muted-foreground/50 mb-4">
                                  Image preview
                                </div>
                                <button
                                  onClick={() =>
                                    retryImage(
                                      desktopScreens[currentScreen].image
                                    )
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
                              {desktopScreens[currentScreen].placeholder}
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
            </div>
          </div>
        </div>

        {/* Screen Indicators */}
        <div className="flex justify-center mt-8 gap-2 min-h-[8px]">
          {desktopScreens.map((_, index) => {
            const isActive = currentScreen === index;

            return (
              <button
                key={`indicator-${index}`}
                onClick={() => goToScreen(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary w-6 scale-125"
                    : "bg-border hover:bg-primary/50"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
