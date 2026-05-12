import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DDrqrKQT.js";
import { G as GALLERY_ITEMS, S as ScrollReveal, L as Lightbox } from "./galleryData-D099-s3X.js";
import { A as ArrowLeft } from "./arrow-left-Dy1ReDun.js";
import { C as Camera, o as motion } from "./proxy-BkfWjRIU.js";
function GalleryPage() {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [lightboxImages, setLightboxImages] = reactExports.useState([]);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(0);
  const filteredItems = activeTab === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeTab);
  const filteredImageItems = filteredItems.filter(
    (item) => item.type === "image"
  );
  const openLightbox = (item) => {
    if (item.type !== "image") return;
    const idx = filteredImageItems.findIndex((img) => img.id === item.id);
    setLightboxImages(
      filteredImageItems.map((img) => ({ url: img.src, title: img.title }))
    );
    setLightboxIndex(idx);
  };
  const cols = [0, 1, 2, 3].map(
    (c) => filteredItems.map((item, i) => ({ item, i })).filter(({ i }) => i % 4 === c)
  );
  const tabs = [
    { key: "all", label: "All" },
    { key: "wedding", label: "Wedding" },
    { key: "brand-promotions", label: "Brand Promotions" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "#0B0B0B" },
      "data-ocid": "gallery.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              "data-ocid": "gallery.back_link",
              className: "flex items-center gap-2 text-white/50 hover:text-[#C7A46C] transition-colors duration-300 text-sm tracking-widest uppercase",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold tracking-[0.15em] text-white uppercase", children: "Addi Photography" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[9px] font-medium tracking-[0.2em] text-[#C7A46C]/80 uppercase", children: "& Bj Events" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 15 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tracking-widest uppercase", children: [
              filteredItems.length,
              " Items"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 pb-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4", children: "Addi Photography & Bj Events" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6", children: "Gallery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40 tracking-[0.2em] uppercase max-w-sm mx-auto", children: "A cinematic collection of moments and brand stories" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex items-center justify-center gap-4 mt-8",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4, duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-px bg-white/10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-[#C7A46C] rotate-45" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-px bg-white/10" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-center gap-8 border-b border-white/[0.08] pb-0",
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3, duration: 0.5 },
            children: [
              tabs.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `gallery.filter.${key}`,
                  onClick: () => setActiveTab(key),
                  className: `relative pb-3 text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${activeTab === key ? "text-[#C7A46C] font-semibold" : "text-white/40 hover:text-white"}`,
                  children: [
                    label,
                    activeTab === key && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        layoutId: "gallery-tab-indicator",
                        className: "absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A46C]"
                      }
                    )
                  ]
                },
                key
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-white/25 tracking-widest uppercase", children: [
                filteredItems.length,
                " ",
                filteredItems.length === 1 ? "item" : "items"
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pb-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3", children: cols.map((col, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex flex-col gap-2 md:gap-3${ci === 3 ? " hidden lg:flex" : ""}${ci === 2 ? " hidden md:flex" : ""}${ci % 2 === 1 ? " mt-10" : ""}`,
              children: col.map(({ item, i }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: i * 0.04, children: item.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative overflow-hidden group w-full",
                  style: { aspectRatio: "9/16" },
                  "data-ocid": `gallery.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "video",
                      {
                        src: item.src,
                        autoPlay: true,
                        muted: true,
                        loop: true,
                        playsInline: true,
                        controls: true,
                        className: "w-full h-full object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-black/60 border border-white/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        viewBox: "0 0 24 24",
                        role: "img",
                        "aria-label": "Play video",
                        className: "w-6 h-6 fill-white ml-1",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" })
                      }
                    ) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 px-2 py-0.5 bg-[#C7A46C]/90 text-[#0B0B0B] text-[9px] tracking-widest uppercase font-semibold", children: "Brand Film" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-[10px] tracking-widest uppercase font-medium drop-shadow-lg truncate", children: item.title }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  "data-ocid": `gallery.item.${i + 1}`,
                  "aria-label": item.title,
                  className: "relative overflow-hidden group w-full block cursor-pointer",
                  style: {
                    aspectRatio: i % 5 === 0 ? "3/4" : i % 5 === 1 ? "4/5" : i % 5 === 2 ? "2/3" : i % 5 === 3 ? "4/3" : "3/4"
                  },
                  whileHover: { scale: 1.01 },
                  transition: { duration: 0.4 },
                  onClick: () => openLightbox(item),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.src,
                        alt: item.title,
                        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#0B0B0B]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 border border-[#C7A46C]/60 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#C7A46C] text-lg", children: "+" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-[10px] tracking-widest uppercase font-medium px-3 text-center", children: item.title })
                    ] })
                  ]
                }
              ) }, item.id))
            },
            ci
          )) }),
          filteredItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-32 text-center",
              "data-ocid": "gallery.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 32, className: "text-white/20 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm tracking-widest uppercase", children: "No items in this category" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/[0.06] py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/20 tracking-widest uppercase", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Addi Photography & Bj Events"
        ] }) }),
        lightboxImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Lightbox,
          {
            images: lightboxImages,
            currentIndex: lightboxIndex,
            onClose: () => setLightboxImages([]),
            onPrev: () => setLightboxIndex(
              (idx) => (idx - 1 + lightboxImages.length) % lightboxImages.length
            ),
            onNext: () => setLightboxIndex((idx) => (idx + 1) % lightboxImages.length)
          }
        )
      ]
    }
  );
}
export {
  GalleryPage
};
