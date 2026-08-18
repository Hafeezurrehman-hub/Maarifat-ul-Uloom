import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS, SITE } from "../../constants/site";

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    // FIX: every page starts with a dark section — Hero on Home, the navy
    // PageBanner strip on every other page — so the same transparent-over-
    // dark navbar treatment applies everywhere, just based on scroll.
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const textColor = scrolled ? "text-navy-900 dark:text-cream" : "text-white";
  const logoSrc = scrolled
    ? theme === "dark"
      ? `${import.meta.env.BASE_URL}images/logo-dark.png`
      : `${import.meta.env.BASE_URL}images/logo-light.png`
    : `${import.meta.env.BASE_URL}images/logo-dark.png`;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-premium ${
          scrolled
            ? "bg-white/85 dark:bg-navy-900/85 backdrop-blur-md shadow-[0_1px_0_rgba(10,22,40,0.08)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Link to="/" className={`flex items-center gap-2.5 font-heading font-semibold text-lg sm:text-xl ${textColor}`}>
            <img
              src={logoSrc}
              alt="Maarifat-ul-Uloom Academy logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            {SITE.shortName}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-sm font-medium group ${textColor} ${isActive ? "font-semibold" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-1/2 right-1/2 h-[2px] bg-gold-500 transition-all duration-300 ease-premium group-hover:left-0 group-hover:right-0 ${
                        isActive ? "!left-0 !right-0" : ""
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <ThemeToggle />
            <Button to="/contact" variant="primary" showArrow={false}>
              Enroll Now
            </Button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              className={`flex items-center gap-1.5 ${textColor}`}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <span className="text-xs font-medium">Menu</span>
              <Menu size={26} />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[70] bg-navy-900 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                className="text-white"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="text-white font-heading text-2xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-8">
              <Button to="/contact" variant="primary" showArrow={false} className="w-full justify-center" onClick={() => setOpen(false)}>
                Enroll Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
