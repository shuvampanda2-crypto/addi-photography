import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/") && !href.startsWith("/#")) {
      navigate({ to: href });
    } else if (href.startsWith("/#")) {
      const id = href.slice(2);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <>
      <header
        data-ocid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_2px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("/#home")}
            className="flex items-center gap-2 group"
            data-ocid="navbar.logo"
          >
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-[0.15em] text-white group-hover:text-accent transition-colors duration-300 uppercase">
                Addi Photography
              </span>
              <span className="font-display text-[10px] font-medium tracking-[0.2em] text-accent/80 group-hover:text-accent transition-colors duration-300 uppercase">
                &amp; Bj Events
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-ocid={`navbar.link.${link.label.toLowerCase()}`}
                  className="relative text-sm font-body tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              </li>
            ))}
          </ul>

          {/* Book Button (desktop) */}
          <button
            type="button"
            data-ocid="navbar.book_button"
            onClick={() => handleNavClick("/#contact")}
            className="hidden lg:flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium border border-accent/60 text-accent px-6 py-2.5 hover:bg-accent hover:text-[#0B0B0B] transition-all duration-300"
          >
            Book Session
          </button>

          {/* Hamburger */}
          <button
            type="button"
            data-ocid="navbar.menu_toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-accent transition-colors duration-300"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-ocid="navbar.mobile_menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0B0B0B] flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="font-display text-4xl text-white/80 hover:text-accent transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-xs tracking-widest uppercase text-white/30"
            >
              Addi Photography & Bj Events
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
