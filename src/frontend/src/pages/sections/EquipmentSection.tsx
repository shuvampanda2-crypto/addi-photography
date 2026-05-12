import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "motion/react";

export function EquipmentSection() {
  return (
    <section
      id="equipment"
      className="py-28 lg:py-36 bg-[#0B0B0B] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        {/* Camera icon */}
        <ScrollReveal>
          <div className="flex justify-center mb-8">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="14"
                width="40"
                height="26"
                rx="3"
                stroke="#C7A46C"
                strokeWidth="2"
              />
              <circle cx="24" cy="27" r="8" stroke="#C7A46C" strokeWidth="2" />
              <circle
                cx="24"
                cy="27"
                r="4"
                stroke="#C7A46C"
                strokeWidth="1.5"
              />
              <path
                d="M16 14V11C16 10.4477 16.4477 10 17 10H22L24 7H24H24L26 10H31C31.5523 10 32 10.4477 32 11V14"
                stroke="#C7A46C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="39" cy="19" r="2" fill="#C7A46C" />
            </svg>
          </div>
        </ScrollReveal>

        {/* Label line */}
        <ScrollReveal delay={0.08}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-white/20" />
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-white/55 font-medium"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We Use Professional
            </span>
            <div className="h-px w-16 bg-white/20" />
          </div>
        </ScrollReveal>

        {/* Row 1 — Nikon & SONY */}
        <ScrollReveal delay={0.14}>
          <div className="flex items-baseline justify-center gap-4 md:gap-6 flex-wrap mb-2">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white font-bold italic leading-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 9vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Nikon
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="font-bold leading-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                color: "#C7A46C",
              }}
            >
              &
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.32,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-black tracking-tight leading-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 9vw, 7rem)",
                color: "#C7A46C",
                letterSpacing: "0.04em",
              }}
            >
              SONY
            </motion.span>
          </div>
        </ScrollReveal>

        {/* Row 2 — DJI DRONE */}
        <ScrollReveal delay={0.22}>
          <div className="flex items-baseline justify-center gap-4 md:gap-6 flex-wrap">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.42,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-black tracking-widest leading-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 9vw, 7rem)",
                color: "transparent",
                WebkitTextStroke: "2px #C7A46C",
                letterSpacing: "0.12em",
              }}
            >
              DJI
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.52,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white font-black tracking-widest uppercase leading-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 9vw, 7rem)",
                letterSpacing: "0.12em",
              }}
            >
              DRONE
            </motion.span>
          </div>
        </ScrollReveal>

        {/* Subtle bottom rule */}
        <ScrollReveal delay={0.32}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent/30" />
            <div className="w-1.5 h-1.5 bg-accent/40 rotate-45" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent/30" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
