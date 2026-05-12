import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PANELS = [
  {
    id: "wedding",
    category: "Wedding Photography",
    title: "Forever",
    subtitle: "Begins Here",
    description:
      "Every love story deserves a cinematic witness. We capture the raw emotion, quiet tenderness, and joyful chaos of your most sacred day.",
    image: "/assets/images/photo-01.jpeg",
    ctaLabel: "View Weddings",
  },
  {
    id: "videography",
    category: "Cinematic Videography",
    title: "Stories",
    subtitle: "That Move You",
    description:
      "Breathtaking wedding films and brand videos crafted with a director's eye — every frame flows with emotion and cinematic grace.",
    image: "/assets/images/photo-07.jpeg",
    ctaLabel: "View Films",
  },
  {
    id: "brand",
    category: "Brand Promotions",
    title: "Elevate",
    subtitle: "Your Brand",
    description:
      "Strategic brand imagery that amplifies your identity, commands attention online, and makes your audience stop scrolling.",
    image: "/assets/images/photo-13.jpeg",
    ctaLabel: "View Branding",
  },
];

function ShowcasePanel({
  panel,
  isActive,
}: {
  panel: (typeof PANELS)[0];
  isActive: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: isActive ? 1 : 1.05 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={panel.image}
          alt={panel.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/85 via-[#0B0B0B]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="max-w-xl"
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-accent mb-6 font-semibold">
              {panel.category}
            </p>
            <h2
              className="font-display leading-[0.95] text-white mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 700,
              }}
            >
              {panel.title}
              <br />
              <span className="text-accent">{panel.subtitle}</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-10 max-w-sm">
              {panel.description}
            </p>
            <LuxuryButton
              variant="secondary"
              data-ocid={`showcase.cta.${panel.id}`}
              onClick={() =>
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {panel.ctaLabel}
            </LuxuryButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scrollYProgress 0→1 to panel indices
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        PANELS.length - 1,
        Math.floor(v * PANELS.length * 0.98),
      );
      setActivePanel(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Parallax on background Y for each panel
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      data-ocid="showcase.section"
      style={{ height: `${PANELS.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: yOffset }} className="absolute inset-0">
          <AnimatePresence mode="sync">
            {PANELS.map((panel, i) => (
              <motion.div
                key={panel.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: i === activePanel ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <ShowcasePanel panel={panel} isActive={i === activePanel} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Panel dots navigation */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {PANELS.map((panel, i) => (
            <button
              key={panel.id}
              type="button"
              aria-label={`Go to panel ${i + 1}`}
              data-ocid={`showcase.dot.${i + 1}`}
              onClick={() => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const top =
                  window.scrollY + rect.top + (i / PANELS.length) * rect.height;
                window.scrollTo({ top, behavior: "smooth" });
              }}
              className={`w-1.5 rounded-full transition-all duration-400 ${
                i === activePanel
                  ? "h-8 bg-accent"
                  : "h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-accent/60 z-20"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
