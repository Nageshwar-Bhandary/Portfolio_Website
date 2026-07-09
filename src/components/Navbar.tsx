import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import AdminDashboard from "./Admin/AdminDashboard";
import {
  TbUser,
  TbBriefcase,
  TbSchool,
  TbTrophy,
  TbLayoutGrid,
  TbCpu,
  TbMail,
  TbShieldLock,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);
export let smoother: any = {
  paused: () => {},
  scrollTop: () => 0,
  scrollTo: (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
  refresh: () => {}
};

const NAV_SECTIONS = [
  { href: "#about",        label: "ABOUT",        icon: TbUser },
  { href: "#experience",   label: "EXPERIENCE",   icon: TbBriefcase },
  { href: "#career",       label: "EDUCATION",    icon: TbSchool },
  { href: "#achievements", label: "ACHIEVEMENTS", icon: TbTrophy },
  { href: "#work",         label: "PROJECTS",     icon: TbLayoutGrid },
  { href: "#techstack",    label: "TECHSTACK",    icon: TbCpu },
  { href: "#contact",      label: "CONTACT",      icon: TbMail },
];

const Navbar = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Smooth scroll on nav link click
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const href = element.getAttribute("href") || element.getAttribute("data-href");
      if (href && href.startsWith("#") && href !== "#") {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          smoother.scrollTo(href);
        });
      }
    });

    // IntersectionObserver to highlight active nav link
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_SECTIONS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <div className="header">
        <div className="navbar-title" style={{ paddingLeft: "15px" }}>Nageshwar</div>
        <ul>
          {NAV_SECTIONS.map(({ href, label, icon: Icon }) => (
            <li key={href} data-active={activeSection === href ? "true" : undefined}>
              <a data-href={href} href={href} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Icon size={14} className="nav-icon" style={{ transition: "color 0.3s ease" }} />
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
          <li className="navbar-admin-btn">
            <a onClick={() => setShowAdmin(true)} href="#" data-cursor="disable" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <TbShieldLock size={14} className="nav-icon" style={{ transition: "color 0.3s ease" }} />
              <HoverLinks text="ADMIN" />
            </a>
          </li>
        </ul>
      </div>

      <AdminDashboard show={showAdmin} onClose={() => setShowAdmin(false)} />

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
