import { PropsWithChildren, useEffect, useState } from "react";
import { smoother } from "./Navbar";
import { gsap } from "gsap";
import About from "./About";
import Career from "./Career";
import Achievements from "./Achievements";
import Landing from "./Landing";
import Navbar from "./Navbar";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Contact from "./Contact";
import setSplitText from "./utils/splitText";
import TechStack from "./TechStack";
import Resume from "./Resume";

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
      "#resume",
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

    smoother.scrollTo = (targetSelector: string) => {
      updateActiveSections();
      const idx = activeSections.indexOf(targetSelector);
      if (idx !== -1) {
        scrollToIdx(idx);
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

    return () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSections);
    };
  }, []);
  return (
    <div className="container-main">
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
            <Resume />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
