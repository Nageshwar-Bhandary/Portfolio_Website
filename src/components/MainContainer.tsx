import { PropsWithChildren, useEffect, useState } from "react";
import { smoother } from "./Navbar";
import { gsap } from "gsap";
import About from "./About";
import Career from "./Career";
import Achievements from "./Achievements";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Contact from "./Contact";
import setSplitText from "./utils/splitText";
import TechStack from "./TechStack";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  useEffect(() => {
    const allSections = [
      "#landingDiv",
      "#about",
      "#experience",
      "#career",
      "#achievements",
      "#work",
      "#techstack",
      "#contact"
    ];

    let activeSections: string[] = [];
    let currentIdx = 0;
    let isScrolling = false;

    const updateActiveSections = () => {
      activeSections = allSections.filter(selector => document.querySelector(selector) !== null);
      const scrollY = window.scrollY;
      let minDiff = Infinity;
      let closestIdx = 0;
      activeSections.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const diff = Math.abs(top - scrollY);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = index;
          }
        }
      });
      currentIdx = closestIdx;
    };

    updateActiveSections();
    window.addEventListener("resize", updateActiveSections);

    const scrollToIdx = (idx: number) => {
      if (idx < 0 || idx >= activeSections.length) return;
      const target = document.querySelector(activeSections[idx]);
      if (target) {
        isScrolling = true;
        currentIdx = idx;
        const targetY = target.getBoundingClientRect().top + window.scrollY;

        const scrollObj = { y: window.scrollY };
        gsap.to(scrollObj, {
          y: targetY,
          duration: 0.8,
          ease: "power2.inOut",
          onUpdate: () => {
            window.scrollTo(0, scrollObj.y);
          },
          onComplete: () => {
            setTimeout(() => {
              isScrolling = false;
            }, 200);
          }
        });
      }
    };

    const scrollNext = () => {
      if (currentIdx < activeSections.length - 1) {
        scrollToIdx(currentIdx + 1);
      }
    };

    const scrollPrev = () => {
      if (currentIdx > 0) {
        scrollToIdx(currentIdx - 1);
      }
    };

    smoother.scrollTo = (targetSelector: string) => {
      updateActiveSections();
      const idx = activeSections.indexOf(targetSelector);
      if (idx !== -1) {
        scrollToIdx(idx);
      }
    };

    const isScrollable = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      return (
        el.closest(".admin-dashboard") !== null ||
        el.closest(".certificate-modal-overlay") !== null ||
        el.closest("textarea") !== null ||
        el.closest("input") !== null
      );
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrollable(e.target as HTMLElement)) return;
      e.preventDefault();
      if (isScrolling) return;
      if (Math.abs(e.deltaY) < 15) return;
      if (e.deltaY > 0) {
        scrollNext();
      } else {
        scrollPrev();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollable(e.target as HTMLElement)) return;
      if (isScrolling) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        scrollNext();
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "Space") {
        e.preventDefault();
        if (e.shiftKey) {
          scrollPrev();
        } else {
          scrollNext();
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIdx(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIdx(activeSections.length - 1);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollable(e.target as HTMLElement)) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollable(e.target as HTMLElement)) return;
      if (isScrolling) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
      }
    };

    let scrollTimeout: number | null = null;
    const handleScroll = () => {
      if (isScrolling) return;
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        updateActiveSections();
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSections);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Achievements />
            <Work />
            {isDesktopView && <TechStack />}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
