"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/providers/ModalProvider";
import { ChevronDown, Sparkles } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const MotionLink = motion.create(Link);

type NavItem = {
  label: string;
  href: string;
  isDropdown?: boolean;
  dropdownItems?: { label: string; href: string; description: string }[];
};

export default function Header() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const user = null; // Auth removed for frontend-only deployment
  const { t } = useI18n();

  const NAV_ITEMS: NavItem[] = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/apropre" },
    { label: t("nav.products"), href: "/products" },
    { label: t("nav.blog"), href: "/blog" },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Scroll tracking for navbar animation
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  // Track which in-page section is active on the homepage
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(
    null
  );

  const sectionIds = React.useMemo(
    () =>
      NAV_ITEMS.filter((i) => i.href.startsWith("/#")).map(
        (i) => i.href.split("#")[1] || ""
      ),
    []
  );

  React.useEffect(() => {
    // Only observe sections on the homepage
    if (pathname !== "/") {
      setActiveSectionId(null);
      return;
    }

    const elements = sectionIds
      .map((id) =>
        typeof document !== "undefined" ? document.getElementById(id) : null
      )
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );
          setActiveSectionId(intersecting[0].target.id);
        } else {
          // If no observed section is in view, keep homepage highlighted
          setActiveSectionId(null);
        }
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));

    // Initialize from current hash if present (defer to avoid hydration mismatch)
    setTimeout(() => {
      if (typeof window !== "undefined" && window.location.hash) {
        setActiveSectionId(window.location.hash.replace("#", ""));
      }
    }, 0);

    return () => observer.disconnect();
  }, [pathname, sectionIds]);

  // Scroll event handler for navbar hide/show
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  React.useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Ensure header is anchored to the top and remove any leftover top padding added by other scripts
  React.useEffect(() => {
    const headerEl = document.querySelector("header");
    try {
      if (headerEl) {
        headerEl.style.top = "0px";
      }
      if (typeof document !== "undefined" && document.body) {
        // Clear any stray top padding that might push content down
        document.body.style.paddingTop = "0px";
      }
    } catch {
      // ignore DOM manipulation errors in non-browser environments
    }
    // Intentionally not reverting changes on unmount to keep header at top
  }, []);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      // On home, highlight Home only when no section is active
      return pathname === "/" && !activeSectionId;
    }
    if (href.startsWith("/#")) {
      if (pathname !== "/") return false;
      const id = href.split("#")[1] || "";
      return activeSectionId === id;
    }
    // For exact page matches (About, Products, Blog, etc.)
    return pathname === href;
  };

  return (
    <>
      <motion.header
        className="fixed top-0 z-50 w-full backdrop-blur border-b"
        style={{
          backgroundColor: "#fffef7",
          borderColor: "var(--color-border)"
        }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {/* Main navigation row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="h-24 flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Logo - Left */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo.png"
                  alt="Fruit Exotic International inc Logo"
                  width={428}
                  height={428}
                  className="h-20 w-auto transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Centered nav - Desktop only */}
            <nav className="hidden md:flex flex-1 items-center justify-center mx-8">
              <ul className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} className="relative nav-item">
                    {item.isDropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setServicesDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          dropdownTimeoutRef.current = setTimeout(() => {
                            setServicesDropdownOpen(false);
                          }, 200);
                        }}
                      >
                        <motion.button
                          className={[
                            "text-base rounded-md px-3 py-2 transition-all duration-300 flex items-center gap-1 font-semibold relative overflow-hidden",
                            isActive(item.href) ? "font-bold" : "",
                          ].join(" ")}
                          style={{
                            color: isActive(item.href)
                              ? "var(--color-brand)"
                              : "var(--color-brand)",
                            backgroundColor: servicesDropdownOpen
                              ? "var(--color-cta)"
                              : "transparent",
                          }}
                          whileHover={{
                            y: -2,
                            color: "white",
                            backgroundColor: "var(--color-cta)",
                            scale: 1.05,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              servicesDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                          {/* Animated background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0"
                            animate={{
                              opacity: servicesDropdownOpen ? 0.1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </div>
                    ) : (
                      <MotionLink
                        href={item.href}
                        className={[
                          "nav-link text-base px-12 py-6 transition-all duration-200 relative overflow-hidden block",
                          isActive(item.href) ? "font-semibold" : "",
                        ].join(" ")}
                        style={{
                          color: isActive(item.href)
                            ? "#FAB12F"
                            : "var(--color-muted)",
                          backgroundColor: "transparent",
                          borderRadius: "50px",
                          minWidth: "120px",
                          textAlign: "center",
                        }}
                        onClick={() => {
                          if (item.href === "/") {
                            setActiveSectionId(null);
                          } else if (item.href.startsWith("/#")) {
                            const id = item.href.split("#")[1] || "";
                            setActiveSectionId(id);
                          }
                        }}
                        whileHover={{
                          scale: 1.0005,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                        }}
                      >
                        {/* Oval border */}
                        <svg
                          className="nav-border absolute inset-0 w-full h-full"
                          style={{
                            transform: isActive(item.href) ? "scale(1)" : "scale(0)",
                            opacity: isActive(item.href) ? 1 : 0,
                          }}
                        >
                          <ellipse
                            cx="50%"
                            cy="50%"
                            rx="42%"
                            ry="35%"
                            fill="none"
                            stroke="#FAB12F"
                            strokeWidth="2"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                            pathLength="300"
                            transform="rotate(-90 50 50)"
                            style={{
                              transition: "all 0.2s ease-out",
                            }}
                          />
                        </svg>

                        <span
                          className="nav-text relative z-10 transition-colors duration-200"
                          style={{
                            color: isActive(item.href) ? "#FAB12F" : undefined,
                          }}
                        >
                          {item.label}
                        </span>
                      </MotionLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact button - Right (Desktop) */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="relative inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-bold overflow-hidden group transition-all duration-300 hover:shadow-2xl border border-orange-200/30"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    letterSpacing: "0.5px",
                  }}
                >
                  {/* Glass morphism overlay */}
                  <div
                    className="absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                    }}
                  />

                  {/* Luxury shimmer effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)",
                    }}
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                  />

                  {/* Golden glow on hover */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)",
                    }}
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span
                    className="relative z-10 transition-all duration-300 group-hover:text-yellow-100 drop-shadow-sm"
                    style={{
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    {t("nav.contact")}
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu toggle - Right (Mobile only) */}
            <div className="flex md:hidden ml-auto">
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-md ring-1 ring-black/5 bg-white/70 backdrop-blur"
              >
                {mobileOpen ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed top-24 inset-x-0 z-50 border-b backdrop-blur"
            style={{
              backgroundColor: "#fffef7",
              borderColor: "var(--color-border)"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-3">
              <ul className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    {item.isDropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileServicesOpen(!mobileServicesOpen)
                          }
                          className="w-full flex items-center justify-between rounded-md px-3 py-2 text-base font-semibold"
                          style={{
                            color: isActive(item.href)
                              ? "var(--color-brand)"
                              : "var(--color-brand)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {item.label}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {item.dropdownItems?.map((dropdownItem, index) => (
                              <motion.div
                                key={dropdownItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Link
                                  href={dropdownItem.href}
                                  className="block rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
                                  style={{ color: "var(--color-brand)" }}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileServicesOpen(false);
                                    if (dropdownItem.href.startsWith("/#")) {
                                      const id =
                                        dropdownItem.href.split("#")[1] || "";
                                      setActiveSectionId(id);
                                    }
                                  }}
                                >
                                  <div className="font-medium">
                                    {dropdownItem.label}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {dropdownItem.description}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <MotionLink
                        href={item.href}
                        className={[
                          "relative block rounded-full px-12 py-4 text-base overflow-hidden text-center",
                          isActive(item.href) ? "font-semibold" : "",
                        ].join(" ")}
                        style={{
                          color: isActive(item.href) ? "#FAB12F" : "var(--color-muted)",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          setMobileOpen(false);
                          if (item.href === "/") {
                            setActiveSectionId(null);
                          } else if (item.href.startsWith("/#")) {
                            const id = item.href.split("#")[1] || "";
                            setActiveSectionId(id);
                          }
                        }}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      >
                        {/* Oval border to match desktop active indicator */}
                        <svg
                          className="absolute inset-0 w-full h-full"
                          style={{
                            transform: isActive(item.href) ? "scale(1)" : "scale(0)",
                            opacity: isActive(item.href) ? 1 : 0,
                          }}
                        >
                          <ellipse
                            cx="50%"
                            cy="50%"
                            rx="45%"
                            ry="40%"
                            fill="none"
                            stroke="#FAB12F"
                            strokeWidth="2"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                            pathLength="300"
                            transform="rotate(-90 50 50)"
                            style={{ transition: "all 0.2s ease-out" }}
                          />
                        </svg>

                        <span className="relative z-10">{item.label}</span>
                      </MotionLink>
                    )}
                  </li>
                ))}
                <li className="pt-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="relative w-full inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-bold overflow-hidden group transition-all duration-300 hover:shadow-2xl border border-orange-200/30"
                      style={{
                        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
                        backdropFilter: "blur(8px)",
                        color: "white",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(20px)",
                        }}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: "linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)",
                        }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                      />

                      <motion.div
                        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)",
                        }}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <span className="relative z-10">{t("nav.contact")}</span>
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </motion.header>


      <div aria-hidden className="h-24 w-full" />
    </>
  );
}



