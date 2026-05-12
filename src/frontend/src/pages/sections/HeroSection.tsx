import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  heading: string;
  subheading: string;
}

export function HeroSection({ heading, subheading }: HeroSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const words = heading
    ? heading.split(" ")
    : ["Capturing", "Moments,", "Creating", "Memories"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/75 to-[#0B0B0B]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-36 pb-28">
        <div className="max-w-3xl">
          {/* Label with lines */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-accent/60" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-accent font-semibold">
              Fine Art Photography
            </p>
            <div className="w-12 h-px bg-accent/60" />
          </motion.div>

          {/* Heading — each word staggered */}
          <div className="overflow-hidden">
            {words.map((word, i) => (
              <motion.h1
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.6 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="font-display block leading-[0.95] text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 700,
                }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 text-base md:text-lg text-white/55 leading-relaxed max-w-md"
          >
            {subheading}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <LuxuryButton
              variant="primary"
              data-ocid="hero.view_gallery_button"
              onClick={() => {
                const el = document.getElementById("gallery");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else window.location.href = "/gallery";
              }}
            >
              View Gallery
            </LuxuryButton>
            <LuxuryButton
              variant="secondary"
              data-ocid="hero.book_session_button"
              onClick={() => scrollTo("contact")}
            >
              Book Session
            </LuxuryButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={16} className="text-accent/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
