import { Lightbox } from "@/components/ui/Lightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { GALLERY_ITEMS } from "../../data/galleryData";
import type { GalleryItem } from "../../data/galleryData";

export function GallerySection() {
  const navigate = useNavigate();
  const [lightboxImages, setLightboxImages] = useState<
    { url: string; title?: string }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Images only for lightbox (videos handled inline)
  const imageItems = GALLERY_ITEMS.filter((item) => item.type === "image");

  const openLightbox = (item: GalleryItem) => {
    if (item.type !== "image") return;
    const imageIndex = imageItems.findIndex((img) => img.id === item.id);
    setLightboxImages(
      imageItems.map((img) => ({ url: img.src, title: img.title })),
    );
    setLightboxIndex(imageIndex);
  };

  // Build 4 masonry columns
  const cols = [0, 1, 2, 3].map((c) =>
    GALLERY_ITEMS.map((item, i) => ({ item, i })).filter(
      ({ i }) => i % 4 === c,
    ),
  );

  return (
    <section id="gallery" className="py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label="Moments Captured"
          title="Our Gallery"
          subtitle="A curated collection of cinematic imagery and brand stories — every frame a window into another world."
        />

        {/* 4-col masonry desktop / 2-col mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cols.map((col, ci) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed 4 masonry columns
              key={ci}
              className={`flex flex-col gap-3 ${
                ci >= 2 ? "hidden lg:flex" : ""
              } ${ci % 2 === 1 ? "mt-10" : ""}`}
            >
              {col.map(({ item, i }) => (
                <ScrollReveal key={item.id} delay={i * 0.03}>
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Play icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-black/50 border border-white/40 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                          <svg
                            viewBox="0 0 24 24"
                            role="img"
                            aria-label="Play video"
                            className="w-5 h-5 fill-white ml-0.5"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Category badge */}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#C7A46C]/90 text-[#0B0B0B] text-[9px] tracking-widest uppercase font-semibold">
                        Brand Film
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
                          i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/3" : "2/3",
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
                      <div className="absolute inset-0 bg-[#0B0B0B]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        <div className="w-10 h-10 border border-white/40 flex items-center justify-center">
                          <span className="text-white text-xs">+</span>
                        </div>
                      </div>
                    </motion.button>
                  )}
                </ScrollReveal>
              ))}
            </div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div className="flex justify-center mt-14">
          <button
            type="button"
            data-ocid="gallery.show_more_button"
            onClick={() => navigate({ to: "/gallery" })}
            className="group flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-medium border border-[#C7A46C]/60 text-[#C7A46C] px-10 py-4 hover:bg-[#C7A46C] hover:text-[#0B0B0B] transition-all duration-300"
          >
            <span>View Full Gallery</span>
            <span className="w-4 h-px bg-[#C7A46C] group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>

      {lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxImages([])}
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
