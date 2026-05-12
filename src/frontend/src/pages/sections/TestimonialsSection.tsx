import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function TestimonialCard({
  t,
  isActive,
}: { t: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      data-ocid="testimonials.card"
      animate={{
        scale: isActive ? 1 : 0.97,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.5 }}
      className="relative flex-shrink-0 w-full md:w-[380px] lg:w-[440px] p-8 border border-white/[0.07] backdrop-blur-sm bg-[#111111]/70 hover:border-accent/20 transition-colors duration-400"
    >
      {/* Quote mark */}
      <div
        className="font-display text-7xl text-accent/15 leading-none absolute top-4 right-6"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        &#8220;
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: Number(t.rating) }, (_, j) => (
          <Star
            // biome-ignore lint/suspicious/noArrayIndexKey: static star rating display
            key={j}
            size={12}
            className="fill-accent text-accent"
          />
        ))}
      </div>

      <p
        className="font-display text-lg italic text-white/75 leading-relaxed mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;{t.review}&rdquo;
      </p>

      {/* Client */}
      <div className="flex items-center gap-4">
        {t.clientImage ? (
          <img
            src={t.clientImage}
            alt={t.clientName}
            className="w-11 h-11 rounded-full object-cover border border-accent/20"
            loading="lazy"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-accent">
              {t.clientName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-white">{t.clientName}</p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
            Client
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-advance
  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  return (
    <section
      id="testimonials"
      className="py-32 lg:py-40 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label="Client Stories"
          title="Testimonials"
          centered
          subtitle="Words from the people who trusted us with their most important moments."
        />

        {/* Carousel */}
        <ScrollReveal delay={0.1}>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={String(t.id)}
                  className="snap-center flex-shrink-0"
                  style={{ width: "min(440px, 85vw)" }}
                >
                  <TestimonialCard t={t} isActive={i === active} />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((t, i) => (
                <button
                  key={String(t.id)}
                  type="button"
                  aria-label={`Testimonial ${i + 1}`}
                  data-ocid={`testimonials.dot.${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === active
                      ? "w-8 h-1.5 bg-accent"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
