"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education" },
  { label: "Resume",     href: "#resume" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState("Home");
  const [menuOpen, setMenuOpen]   = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* ── entrance animation ── */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  /* ── scroll: bg change + active section detection ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(navLinks[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (label: string, href: string) => {
    setActive(label);
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-wider">
              Md. Rubel
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleClick(link.label, link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  active === link.label
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {/* active / hover pill */}
                {active === link.label && (
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30" />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Hire Me button */}
          <div className="hidden md:block">
            <a
              href="mailto:rk1769950@gmail.com"
              className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleClick(link.label, link.href)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === link.label
                  ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white border border-purple-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:rk1769950@gmail.com"
            className="mt-2 px-4 py-3 text-sm font-semibold text-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
