import { motion } from "motion/react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      {label && (
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {label}
        </p>
      )}
      <h2
        className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] ${
          light ? "text-white" : "text-white"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-base md:text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } text-white/50`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
