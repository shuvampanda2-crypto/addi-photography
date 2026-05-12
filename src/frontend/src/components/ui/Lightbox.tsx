import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";

interface LightboxProps {
  images: { url: string; title?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="lightbox.dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          type="button"
          data-ocid="lightbox.close_button"
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 z-10"
          aria-label="Close lightbox"
        >
          <X size={20} />
        </button>

        {/* Prev */}
        <button
          type="button"
          data-ocid="lightbox.prev_button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 lg:left-8 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current.url}
            alt={current.title ?? "Gallery image"}
            className="max-w-full max-h-[80vh] object-contain"
            loading="lazy"
          />
          {current.title && (
            <p className="mt-4 text-sm text-white/50 tracking-widest uppercase">
              {current.title}
            </p>
          )}
        </motion.div>

        {/* Next */}
        <button
          type="button"
          data-ocid="lightbox.next_button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 lg:right-8 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
