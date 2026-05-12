import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteSettings } from "@/lib/types";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const SERVICES = [
  { value: "wedding-photography", label: "Wedding Photography" },
  { value: "cinematic-videography", label: "Cinematic Videography" },
  { value: "brand-promotions", label: "Brand Promotions" },
];

const BUDGETS = [
  { value: "bride-35000", label: "Bride - \u20b935,000" },
  { value: "groom-50000", label: "Groom - \u20b950,000" },
  {
    value: "premium-69999-99999",
    label: "Premium Package - \u20b969,999 to \u20b999,999",
  },
];

interface ContactSectionProps {
  settings: SiteSettings | null | undefined;
  onSubmit: (data: {
    name: string;
    email: string;
    service: string;
    budget: string;
    message: string;
  }) => Promise<unknown>;
}

export function ContactSection({ settings, onSubmit }: ContactSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await onSubmit(form);
      // Build WhatsApp message with all form details
      const serviceLabel =
        SERVICES.find((s) => s.value === form.service)?.label ?? form.service;
      const budgetLabel =
        BUDGETS.find((b) => b.value === form.budget)?.label ?? form.budget;
      const msg = encodeURIComponent(
        `New Inquiry from ${form.name}\nEmail: ${form.email}\nService: ${serviceLabel}\nBudget: ${budgetLabel}\nMessage: ${form.message}`,
      );
      window.open(`https://wa.me/918249723248?text=${msg}`, "_blank");
      setStatus("sent");
      setForm({ name: "", email: "", service: "", budget: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-transparent border border-white/[0.08] text-white text-sm px-4 py-3.5 focus:outline-none focus:border-accent/60 transition-colors duration-300 placeholder:text-white/20";

  const details = [
    {
      Icon: MapPin,
      label: "Address",
      value: settings?.address || "CDA Sector 13 Cuttack Odisha",
    },
    {
      Icon: Mail,
      label: "Email",
      value: settings?.email || "addiphotographybjevents@gmail.com",
    },
    {
      Icon: Phone,
      label: "Phone",
      value: settings?.phone || "+91 8249723248",
      href: "tel:+918249723248",
    },
  ];

  const socials = [
    {
      Icon: Instagram,
      href:
        settings?.instagram ||
        "https://www.instagram.com/addiphotography9?igsh=MTNpdnNxbWw0N2ZjNA==",
      label: "Instagram",
    },
    { Icon: Facebook, href: settings?.facebook || "#", label: "Facebook" },
    { Icon: Twitter, href: settings?.twitter || "#", label: "Twitter" },
    { Icon: Youtube, href: settings?.youtube || "#", label: "YouTube" },
  ];

  return (
    <section id="contact" className="py-32 lg:py-40 bg-[#0B0B0B]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Info */}
          <ScrollReveal direction="left">
            <div>
              <SectionHeading
                label="Get in Touch"
                title="Let's Work Together"
              />
              <p className="text-white/55 leading-relaxed text-base max-w-sm mb-12">
                Ready to create something extraordinary? Let's discuss your
                vision and bring it to life with cinematic artistry.
              </p>

              <div className="space-y-7 mb-12">
                {details.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-accent/60 mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-white/65 text-sm hover:text-accent transition-colors duration-300"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white/65 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/[0.05]">
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-5">
                  Follow the Journey
                </p>
                <div className="flex gap-3">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      data-ocid={`contact.social.${label.toLowerCase()}`}
                      className="w-10 h-10 border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-accent hover:border-accent/40 transition-all duration-300"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="c-name"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/35 block mb-2"
                  >
                    Name *
                  </label>
                  <input
                    id="c-name"
                    data-ocid="contact.name_input"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-email"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/35 block mb-2"
                  >
                    Email *
                  </label>
                  <input
                    id="c-email"
                    data-ocid="contact.email_input"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={inputCls}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="c-service"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/35 block mb-2"
                  >
                    Service
                  </label>
                  <select
                    id="c-service"
                    data-ocid="contact.service_select"
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                    className={`${inputCls} bg-[#0B0B0B]`}
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="c-budget"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/35 block mb-2"
                  >
                    Budget
                  </label>
                  <select
                    id="c-budget"
                    data-ocid="contact.budget_select"
                    value={form.budget}
                    onChange={(e) =>
                      setForm({ ...form, budget: e.target.value })
                    }
                    className={`${inputCls} bg-[#0B0B0B]`}
                  >
                    <option value="" disabled>
                      Select Budget Range
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="c-message"
                  className="text-[10px] tracking-[0.2em] uppercase text-white/35 block mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="c-message"
                  data-ocid="contact.message_textarea"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputCls} resize-none`}
                  placeholder="Tell me about your vision..."
                />
              </div>

              {status === "sent" && (
                <p
                  data-ocid="contact.success_state"
                  className="text-sm text-accent"
                >
                  Thank you — your message has been sent. I'll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p
                  data-ocid="contact.error_state"
                  className="text-sm text-red-400"
                >
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <LuxuryButton
                  type="submit"
                  variant="primary"
                  disabled={status === "sending"}
                  data-ocid="contact.submit_button"
                >
                  {status === "sending" ? "Sending..." : "Send Inquiry"}
                </LuxuryButton>
                <LuxuryButton
                  type="button"
                  variant="secondary"
                  data-ocid="contact.call_button"
                  onClick={() => {
                    window.location.href = "tel:+918249723248";
                  }}
                >
                  Call Now
                </LuxuryButton>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
