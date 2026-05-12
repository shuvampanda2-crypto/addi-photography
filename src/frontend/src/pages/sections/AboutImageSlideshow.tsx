import { useEffect, useRef, useState } from "react";

interface AboutImageSlideshowProps {
  images: string[];
}

/**
 * Crossfade slideshow with Ken Burns zoom-OUT effect.
 * Each image is visible for 5 s, then crossfades over 0.8 s to the next.
 * Ken Burns: scale 1.08 → 1.0 across the full slot duration.
 */
export function AboutImageSlideshow({ images }: AboutImageSlideshowProps) {
  const total = images.length;
  const [current, setCurrent] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (total < 2) return;

    // After 5 s hold, begin crossfade
    holdTimer.current = setTimeout(() => {
      const upcoming = (current + 1) % total;
      setNextIdx(upcoming);
      setFading(true);

      // After 0.8 s fade, commit to next image
      fadeTimer.current = setTimeout(() => {
        setCurrent(upcoming);
        setNextIdx(null);
        setFading(false);
      }, 800);
    }, 5000);

    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [current, total]);

  return (
    <div className="relative w-full h-[550px] lg:h-[680px] overflow-hidden">
      {/* Current image — slow Ken Burns zoom-out, fades out on transition */}
      <div
        key={`cur-${current}`}
        className="absolute inset-0"
        style={{
          opacity: fading ? 0 : 1,
          transition: fading ? "opacity 0.8s ease-in-out" : "none",
          animation: "aboutKenBurnsOut 5.8s ease-out forwards",
        }}
      >
        <img
          src={images[current]}
          alt={`About photographer ${current + 1}`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Next image — fades in while current fades out */}
      {nextIdx !== null && (
        <div
          key={`nxt-${nextIdx}`}
          className="absolute inset-0"
          style={{
            opacity: fading ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            animation: "aboutKenBurnsOut 5.8s ease-out forwards",
          }}
        >
          <img
            src={images[nextIdx]}
            alt={`About photographer ${nextIdx + 1}`}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      )}

      {/* Cinematic gradient overlay — always on top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
}
