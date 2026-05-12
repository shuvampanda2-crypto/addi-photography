import { Lightbox } from "@/components/ui/Lightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Camera } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { GALLERY_ITEMS } from "../data/galleryData";
import type { GalleryItem } from "../data/galleryData";

type TabKey = "all" | "wedding" | "brand-promotions";

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [lightboxImages, setLightboxImages] = useState<
    { url: string; title?: string }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeTab === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  // Images only in the current filtered set for lightbox navigation
  const filteredImageItems = filteredItems.filter(
    (item) => item.type === "image",
  );

  const openLightbox = (item: GalleryItem) => {
    if (item.type !== "image") return;
    const idx = filteredImageItems.findIndex((img) => img.id === item.id);
    setLightboxImages(
      filteredImageItems.map((img) => ({ url: img.src, title: img.title })),
    );
    setLightboxIndex(idx);
  };

  // Build 4 masonry columns from filtered items
  const cols = [0, 1, 2, 3].map((c) =>
    filteredItems
      .map((item, i) => ({ item, i }))
      .filter(({ i }) => i % 4 === c),
  );

  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "wedding", label: "Wedding" },
    { key: "brand-promotions", label: "Brand Promotions" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0B0B0B" }}
      data-ocid="gallery.page"
    >
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link
            to="/"
            data-ocid="gallery.back_link"
            className="flex items-center gap-2 text-white/50 hover:text-[#C7A46C] transition-colors duration-300 text-sm tracking-widest uppercase"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>

          <div className="flex flex-col items-center">
            <span className="font-display text-base font-bold tracking-[0.15em] text-white uppercase">
              Addi Photography
            </span>
            <span className="font-display text-[9px] font-medium tracking-[0.2em] text-[#C7A46C]/80 uppercase">
              &amp; Bj Events
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/30">
            <Camera size={15} />
            <span className="text-xs tracking-widest uppercase">
              {filteredItems.length} Items
            </span>
          </div>
        </div>
      </header>

      {/* Page hero */}
      <div className="pt-16 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
            Addi Photography &amp; Bj Events
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
            Gallery
          </h1>
          <p className="text-sm text-white/40 tracking-[0.2em] uppercase max-w-sm mx-auto">
            A cinematic collection of moments and brand stories
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="w-16 h-px bg-white/10" />
          <div className="w-1.5 h-1.5 bg-[#C7A46C] rotate-45" />
          <div className="w-16 h-px bg-white/10" />
        </motion.div>
      </div>

      {/* Tab filters */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-10">
        <motion.div
          className="flex items-center gap-8 border-b border-white/[0.08] pb-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              data-ocid={`gallery.filter.${key}`}
              onClick={() => setActiveTab(key)}
              className={`relative pb-3 text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                activeTab === key
                  ? "text-[#C7A46C] font-semibold"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {label}
              {activeTab === key && (
                <motion.span
                  layoutId="gallery-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A46C]"
                />
              )}
            </button>
          ))}

          <span className="ml-auto text-[10px] text-white/25 tracking-widest uppercase">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </span>
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {cols.map((col, ci) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed 4 masonry columns
              key={ci}
              className={`flex flex-col gap-2 md:gap-3${
                ci === 3 ? " hidden lg:flex" : ""
              }${ci === 2 ? " hidden md:flex" : ""}${
                ci % 2 === 1 ? " mt-10" : ""
              }`}
            >
              {col.map(({ item, i }) => (
                <ScrollReveal key={item.id} delay={i * 0.04}>
                  {item.type === "video" ? (
                    <div
                      className="relative overflow-hidden group w-full"
                      style={{ aspectRatio: "9/16" }}
                      data-ocid={`gallery.item.${i + 1}`}
                    >
                      <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el =
                            e.currentTarget.closest<HTMLDivElement>(
                              "[data-ocid]",
                            );
                          if (el) el.style.display = "none";
                        }}
                      />
                      {/* Play icon overlay — hides on hover */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-black/60 border border-white/30 flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            role="img"
                            aria-label="Play video"
                            className="w-6 h-6 fill-white ml-1"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#C7A46C]/90 text-[#0B0B0B] text-[9px] tracking-widest uppercase font-semibold">
                        Brand Film
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-[10px] tracking-widest uppercase font-medium drop-shadow-lg truncate">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      type="button"
                      data-ocid={`gallery.item.${i + 1}`}
                      aria-label={item.title}
                      className="relative overflow-hidden group w-full block cursor-pointer"
                      style={{
                        aspectRatio:
                          i % 5 === 0
                            ? "3/4"
                            : i % 5 === 1
                              ? "4/5"
                              : i % 5 === 2
                                ? "2/3"
                                : i % 5 === 3
                                  ? "4/3"
                                  : "3/4",
                      }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => openLightbox(item)}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#0B0B0B]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        <div className="w-12 h-12 border border-[#C7A46C]/60 flex items-center justify-center mb-2">
                          <span className="text-[#C7A46C] text-lg">+</span>
                        </div>
                        <p className="text-white text-[10px] tracking-widest uppercase font-medium px-3 text-center">
                          {item.title}
                        </p>
                      </div>
                    </motion.button>
                  )}
                </ScrollReveal>
              ))}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="gallery.empty_state"
          >
            <Camera size={32} className="text-white/20 mb-4" />
            <p className="text-white/30 text-sm tracking-widest uppercase">
              No items in this category
            </p>
          </div>
        )}
      </div>

      {/* Footer credit */}
      <div className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-xs text-white/20 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Addi Photography &amp; Bj Events
        </p>
      </div>

      {lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxImages([])}
          onPrev={() =>
            setLightboxIndex(
              (idx) =>
                (idx - 1 + lightboxImages.length) % lightboxImages.length,
            )
          }
          onNext={() =>
            setLightboxIndex((idx) => (idx + 1) % lightboxImages.length)
          }
        />
      )}
    </div>
  );
}
