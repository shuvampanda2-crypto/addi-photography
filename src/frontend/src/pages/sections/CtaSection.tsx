import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "motion/react";

export function CtaSection() {
  const _scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative py-40 lg:py-56 overflow-hidden"
      data-ocid="cta.section"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/showcase-wedding.dim_1920x1080.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0B0B0B]/60 to-[#0B0B0B]" />
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(199,164,108,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-accent/15 pointer-events-none" />
      <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-accent/15 pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-accent/15 pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-accent/15 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <ScrollReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.5em] uppercase text-accent mb-8 font-semibold"
          >
            Start Your Story
          </motion.p>

          <h2
            className="font-display text-white leading-[0.95] mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 700,
            }}
          >
            Let&apos;s Create
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #C7A46C 0%, #e8c98a 50%, #C7A46C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Something
            </span>
            <br />
            Unforgettable.
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <LuxuryButton
              variant="primary"
              data-ocid="cta.enquiry_button"
              onClick={() =>
                window.open("https://wa.me/918249723248", "_blank")
              }
            >
              Enquiry Now
            </LuxuryButton>
            <LuxuryButton
              variant="secondary"
              data-ocid="cta.call_button"
              onClick={() => {
                window.location.href = "tel:+918249723248";
              }}
            >
              Call Now
            </LuxuryButton>
          </div>

          {/* Maps embed */}
          <div
            className="mt-12 rounded-xl overflow-hidden"
            style={{ maxWidth: "420px", margin: "3rem auto 0" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=20.4625,85.8830&z=14&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Our Location - Cuttack, Odisha"
              className="rounded-xl w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
