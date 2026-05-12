import { Link, useNavigate } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

const serviceLinks = [
  "Wedding Photography",
  "Cinematic Videography",
  "Brand Promotions",
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/addiphotography9?igsh=MTNpdnNxbWw0N2ZjNA==",
    label: "Instagram",
  },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/") && !href.startsWith("/#")) {
      navigate({ to: href });
    } else if (href.startsWith("/#")) {
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0B] border-t border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="font-display text-xl font-bold tracking-[0.15em] text-white uppercase">
                Addi Photography
              </span>
              <span className="font-display text-[11px] font-medium tracking-[0.2em] text-accent/80 uppercase mt-0.5">
                &amp; Bj Events
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-[240px]">
              Capturing Moments, Creating Memories — cinematic photography based
              in Cuttack, Odisha.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(href);
                    }}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-accent group-hover:w-6 transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => handleNavClick("/#services")}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-accent group-hover:w-6 transition-all duration-300" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={15} className="mt-0.5 text-accent/70 shrink-0" />
                <span>Cuttack, Odisha</span>
              </li>
              <li>
                <a
                  href="mailto:addiphotographybjevents@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Mail size={15} className="text-accent/70 shrink-0" />
                  addiphotographybjevents@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918249723248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Phone size={15} className="text-accent/70 shrink-0" />
                  +91 82497 23248
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {year} Addi Photography & Bj Events. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Built with{" "}
            <a
              href="https://www.shuvamcreates.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/60 hover:underline cursor-pointer"
            >
              Shuvam Creates
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
