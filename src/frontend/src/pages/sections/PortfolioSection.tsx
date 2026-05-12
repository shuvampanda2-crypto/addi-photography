import { Lightbox } from "@/components/ui/Lightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PortfolioItem } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = ["All", "Weddings", "Fashion", "Portraits"];

interface PortfolioSectionProps {
  items: PortfolioItem[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function PortfolioSection({
  items,
  activeCategory,
  onCategoryChange,
}: PortfolioSectionProps) {
  const [lightboxImages, setLightboxImages] = useState<
    { url: string; title?: string }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (
    imgs: { url: string; title?: string }[],
    idx: number,
  ) => {
    setLightboxImages(imgs);
    setLightboxIndex(idx);
  };
  const closeLightbox = () => setLightboxImages([]);

  // Split items into columns for masonry
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);
  const allImgs = items.map((p) => ({ url: p.imageUrl, title: p.title }));

  function renderCard(item: PortfolioItem, globalIdx: number) {
    return (
      <motion.button
        key={String(item.id)}
        type="button"
        data-ocid={`portfolio.item.${globalIdx + 1}`}
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, delay: (globalIdx % 6) * 0.06 }}
        className="relative overflow-hidden group cursor-pointer w-full block mb-3 text-left"
        aria-label={item.title}
        onClick={() => openLightbox(allImgs, globalIdx)}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full"
            style={{
              aspectRatio: globalIdx % 2 === 0 ? "3/4" : "4/3",
              background: "linear-gradient(135deg, #1a1407 0%, #0d0d0d 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-1">
              {item.category}
            </p>
            <p
              className="text-white font-display text-xl leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </p>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <section id="portfolio" className="py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label="Selected Work"
          title="Portfolio"
          subtitle="Curated moments captured with intention, artistry, and a director's eye."
        />

        {/* Category filters */}
        <ScrollReveal delay={0.1}>
          <div
            className="flex flex-wrap gap-2 mb-16"
            data-ocid="portfolio.filter.tab"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`portfolio.filter.${cat.toLowerCase()}`}
                onClick={() => onCategoryChange(cat)}
                className={`text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 relative ${
                  activeCategory === cat
                    ? "text-[#0B0B0B] bg-accent font-semibold"
                    : "border border-white/10 text-white/40 hover:border-accent/40 hover:text-white/80"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="portfolio-filter-indicator"
                    className="absolute inset-0 bg-accent -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            <div className="flex flex-col gap-3">
              {col1.map((item) => renderCard(item, items.indexOf(item)))}
            </div>
            <div className="flex flex-col gap-3 sm:mt-8">
              {col2.map((item) => renderCard(item, items.indexOf(item)))}
            </div>
            <div className="flex flex-col gap-3 hidden lg:flex">
              {col3.map((item) => renderCard(item, items.indexOf(item)))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={() =>
            setLightboxIndex(
              (i) => (i - 1 + lightboxImages.length) % lightboxImages.length,
            )
          }
          onNext={() =>
            setLightboxIndex((i) => (i + 1) % lightboxImages.length)
          }
        />
      )}
    </section>
  );
}
