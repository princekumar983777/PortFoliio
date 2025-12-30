import { useState, useEffect, useCallback, useRef } from "react";

interface UseHorizontalScrollOptions {
  totalSections: number;
  transitionDuration?: number;
}

export const useHorizontalScroll = ({
  totalSections,
  transitionDuration = 800,
}: UseHorizontalScrollOptions) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef(0);

  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  const navigateToSection = useCallback(
    (index: number) => {
      if (isTransitioning || index < 0 || index >= totalSections) return;
      if (index === currentSection) return;

      setIsTransitioning(true);
      setCurrentSection(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    },
    [currentSection, isTransitioning, totalSections, transitionDuration]
  );

  const canScrollUp = useCallback((sectionEl: HTMLDivElement | null): boolean => {
    if (!sectionEl) return false;
    return sectionEl.scrollTop > 5;
  }, []);

  const canScrollDown = useCallback((sectionEl: HTMLDivElement | null): boolean => {
    if (!sectionEl) return false;
    const { scrollTop, scrollHeight, clientHeight } = sectionEl;
    return scrollTop + clientHeight < scrollHeight - 5;
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 100) return;

      const currentSectionEl = sectionRefs.current[currentSection];
      const deltaY = e.deltaY;
      const threshold = 30;

      if (Math.abs(deltaY) < threshold) return;

      // Scrolling down
      if (deltaY > 0) {
        // If section has more content to scroll down, let it scroll
        if (canScrollDown(currentSectionEl)) {
          return; // Allow default vertical scroll
        }
        // Otherwise, move to next horizontal section
        if (currentSection < totalSections - 1) {
          e.preventDefault();
          lastScrollTime.current = now;
          navigateToSection(currentSection + 1);
        }
      }
      // Scrolling up
      else if (deltaY < 0) {
        // If section has content above to scroll up, let it scroll
        if (canScrollUp(currentSectionEl)) {
          return; // Allow default vertical scroll
        }
        // Otherwise, move to previous horizontal section
        if (currentSection > 0) {
          e.preventDefault();
          lastScrollTime.current = now;
          navigateToSection(currentSection - 1);
        }
      }
    },
    [currentSection, navigateToSection, totalSections, canScrollUp, canScrollDown]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTransitioning) return;

      const currentSectionEl = sectionRefs.current[currentSection];

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          if (currentSection < totalSections - 1) {
            navigateToSection(currentSection + 1);
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (currentSection > 0) {
            navigateToSection(currentSection - 1);
          }
          break;
        case "ArrowDown":
          if (!canScrollDown(currentSectionEl) && currentSection < totalSections - 1) {
            e.preventDefault();
            navigateToSection(currentSection + 1);
          }
          break;
        case "ArrowUp":
          if (!canScrollUp(currentSectionEl) && currentSection > 0) {
            e.preventDefault();
            navigateToSection(currentSection - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          navigateToSection(0);
          break;
        case "End":
          e.preventDefault();
          navigateToSection(totalSections - 1);
          break;
      }
    },
    [currentSection, isTransitioning, navigateToSection, totalSections, canScrollUp, canScrollDown]
  );

  // Touch handling for mobile
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const threshold = 50;

    // Horizontal swipe takes priority for section navigation
    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > threshold) {
      if (distanceX > 0 && currentSection < totalSections - 1) {
        navigateToSection(currentSection + 1);
      } else if (distanceX < 0 && currentSection > 0) {
        navigateToSection(currentSection - 1);
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  }, [currentSection, navigateToSection, totalSections]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive: false only for wheel to allow preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    currentSection,
    navigateToSection,
    isTransitioning,
    containerRef,
    setSectionRef,
  };
};
