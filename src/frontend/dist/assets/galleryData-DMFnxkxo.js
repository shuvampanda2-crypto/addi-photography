import { j as jsxRuntimeExports, r as reactExports } from "./index-BuRRn5fK.js";
import { c as createLucideIcon, o as motion, A as AnimatePresence, X } from "./proxy-CbCgzUOk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true
}) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial,
      whileInView: { opacity: 1, y: 0, x: 0 },
      viewport: { once, margin: "-60px" },
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
      className,
      children
    }
  );
}
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) {
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );
  reactExports.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);
  const current = images[currentIndex];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "lightbox.dialog",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      className: "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "lightbox.close_button",
            onClick: onClose,
            className: "absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 z-10",
            "aria-label": "Close lightbox",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "lightbox.prev_button",
            onClick: (e) => {
              e.stopPropagation();
              onPrev();
            },
            className: "absolute left-4 lg:left-8 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 z-10",
            "aria-label": "Previous image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
            className: "relative max-w-[90vw] max-h-[85vh] flex flex-col items-center",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: current.url,
                  alt: current.title ?? "Gallery image",
                  className: "max-w-full max-h-[80vh] object-contain",
                  loading: "lazy"
                }
              ),
              current.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-white/50 tracking-widest uppercase", children: current.title })
            ]
          },
          currentIndex
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "lightbox.next_button",
            onClick: (e) => {
              e.stopPropagation();
              onNext();
            },
            className: "absolute right-4 lg:right-8 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 z-10",
            "aria-label": "Next image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest", children: [
          currentIndex + 1,
          " / ",
          images.length
        ] })
      ]
    }
  ) });
}
const GALLERY_ITEMS = [
  {
    id: "g1",
    type: "image",
    src: "/assets/10.jpg_1-019e1c7d-c5f9-73a0-8d11-789da4d6e05c.jpeg",
    title: "Wedding Rings",
    category: "wedding"
  },
  {
    id: "g2",
    type: "image",
    src: "/assets/dsc_4270-019e1c7d-c68e-745e-b867-3d047b0a584f.jpg",
    title: "Bridal Portrait",
    category: "wedding"
  },
  {
    id: "g3",
    type: "image",
    src: "/assets/07.jpg_1-019e1c7d-c6ac-77ed-9c26-c66151d6f24c.jpeg",
    title: "Couple Silhouette",
    category: "wedding"
  },
  {
    id: "g4",
    type: "image",
    src: "/assets/lastpage-019e1c7d-cacc-7248-9f74-ef29d74ac1e5.jpg",
    title: "Wedding Story",
    category: "wedding"
  },
  {
    id: "g5",
    type: "image",
    src: "/assets/rpy_3636-019e1c7d-d505-724f-be5b-b5e91f4ad20e.jpg",
    title: "Bridal Jewelry",
    category: "wedding"
  },
  {
    id: "g6",
    type: "image",
    src: "/assets/rpy_3625-019e1c7d-d61d-72b5-bba4-34311c9540f8.jpg",
    title: "Bride Portrait",
    category: "wedding"
  },
  {
    id: "g7",
    type: "image",
    src: "/assets/rpy_3874-019e1c7d-d98d-7750-ab41-1bdad5c0163b.jpg",
    title: "Bridal Mehndi",
    category: "wedding"
  },
  {
    id: "g8",
    type: "image",
    src: "/assets/rpy_3632_1-019e1c7d-db05-722c-a89c-136607f71fe9.jpg",
    title: "Bridal Close-up",
    category: "wedding"
  },
  {
    id: "g9",
    type: "image",
    src: "/assets/dsc_3284-019e1c7d-db18-7279-bc1a-6e80d137500f.jpg",
    title: "Henna Hands",
    category: "wedding"
  },
  {
    id: "g10",
    type: "image",
    src: "/assets/dsc_5213_1_1-019e1c7d-dc65-726b-a8a0-2f0b803c3250.jpg",
    title: "Groom Portrait",
    category: "wedding"
  },
  {
    id: "g11",
    type: "image",
    src: "/assets/dsc_5336-019e1c7d-de6b-71a9-bf69-21fef032ee19.jpg",
    title: "Royal Couple",
    category: "wedding"
  },
  {
    id: "g12",
    type: "image",
    src: "/assets/dsc_3325-019e1c7d-e103-733a-94ed-60a308c46b75.jpg",
    title: "Mehndi Ceremony",
    category: "wedding"
  },
  {
    id: "g13",
    type: "image",
    src: "/assets/rpy_3660-019e1c7d-e1cd-7693-9c6b-8533aee2aafc.jpg",
    title: "Pink Dupatta Bride",
    category: "wedding"
  },
  {
    id: "g14",
    type: "image",
    src: "/assets/01.jpg_1-019e1c7d-e469-725d-9615-42e11de2c284.jpeg",
    title: "Couple on Road",
    category: "wedding"
  },
  {
    id: "v1",
    type: "video",
    src: "/assets/gallery-video-1.mp4",
    title: "Brand Film 1",
    category: "brand-promotions"
  },
  {
    id: "v2",
    type: "video",
    src: "/assets/gallery-video-2.mp4",
    title: "Brand Film 2",
    category: "brand-promotions"
  },
  {
    id: "v3",
    type: "video",
    src: "/assets/gallery-video-3.mp4",
    title: "Brand Film 3",
    category: "brand-promotions"
  }
];
export {
  GALLERY_ITEMS as G,
  Lightbox as L,
  ScrollReveal as S
};
