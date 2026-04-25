"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useScrollToAnchor() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;

    if (hash) {
      // Remove the # from the hash
      const id = hash.substring(1);

      // Wait for the page to fully load
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Scroll to the element with smooth behavior
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [searchParams]);
}
