const LOGOS = [
  { id: "nikon", src: "/assets/images/logo-nikon.png", alt: "Nikon" },
  { id: "sony", src: "/assets/images/logo-sony.png", alt: "Sony" },
  { id: "canvera", src: "/assets/images/logo-canvera.png", alt: "Canvera" },
  { id: "dji", src: "/assets/images/logo-dji.png", alt: "DJI" },
];

const MARQUEE_ITEMS = [
  ...LOGOS.map((l) => ({ ...l, uid: `a-${l.id}` })),
  ...LOGOS.map((l) => ({ ...l, uid: `b-${l.id}` })),
  ...LOGOS.map((l) => ({ ...l, uid: `c-${l.id}` })),
];

export function EquipmentSection() {
  return (
    <section id="equipment" className="py-16 bg-[#0B0B0B] overflow-hidden">
      <style>{`
        @keyframes logo-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .logo-marquee-track {
          animation: logo-marquee 22s linear infinite;
        }
        .logo-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section heading */}
      <div className="text-center mb-10">
        <h2
          className="text-xs tracking-[0.35em] uppercase text-white/40 font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Our Equipment&apos;s
        </h2>
      </div>

      {/* Marquee strip */}
      <div className="relative flex overflow-hidden select-none">
        <div className="logo-marquee-track flex shrink-0 items-center gap-0">
          {MARQUEE_ITEMS.map((logo) => (
            <span key={logo.uid} className="flex items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-[110px] w-auto object-contain mx-10"
                loading="lazy"
                draggable={false}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.18)",
                  padding: "0 0.2rem",
                  fontSize: "0.5rem",
                }}
              >
                ●
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Printing partner */}
      <div className="text-center mt-12">
        <p
          className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
          style={{ color: "#C7A46C", fontFamily: "var(--font-display)" }}
        >
          Our Printing Partner
        </p>
        <img
          src="/assets/images/logo-printing-partner.png"
          alt="Printing Partner"
          className="h-[90px] w-auto object-contain mx-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}
