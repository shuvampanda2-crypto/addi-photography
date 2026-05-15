import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rinki Sahoo",
    stars: 5,
    text: "Budget friendly photography and quality is super",
  },
  {
    id: 2,
    name: "Guruprasad Behera",
    stars: 5,
    text: "Best capturing of moments by their professional team",
  },
  {
    id: 3,
    name: "Trilochan Pradhan",
    stars: 5,
    text: "Excellent service by the photography team and the owner Kiran is best as he gave full effort",
  },
  {
    id: 4,
    name: "Lucky Pradhan",
    stars: 5,
    text: "Good service with best budget and quality is also best",
  },
  {
    id: 5,
    name: "dasventures",
    stars: 5,
    text: "The quality of work was truly outstanding. From pre-wedding moments to the final wedding rituals, everything was captured beautifully. The cinematic wedding film looked like a movie. We are extremely satisfied with the photos, album design, and overall experience.",
  },
  {
    id: 6,
    name: "Kalpana Sahoo",
    stars: 5,
    text: "You are a true artist! I can't believe how amazing this turned out. You really caught the perfect moment. I'm so impressed with this. Wow, these photos and the video are just beautiful! Thank you so much for your hard work.",
  },
  {
    id: 7,
    name: "Bhabani",
    stars: 5,
    text: "Amazing experience from start to finish. The team handled our wedding coverage perfectly and delivered beautiful memories that we will cherish forever. Excellent photography skills, cinematic videography, and great customer service. Highly recommended!",
  },
  {
    id: 8,
    name: "Tiki Sahoo",
    stars: 5,
    text: "Choosing this photography team was one of the best decisions for our wedding. They captured every emotion, smile, and special moment beautifully. The entire team was friendly, cooperative, and hardworking. We truly loved the final photos and cinematic wedding film.",
  },
  {
    id: 9,
    name: "Rosemary Spa",
    stars: 5,
    text: "Excellent wedding photography service! Beautiful candid shots, cinematic video, and very professional behavior. Thank you for capturing our special day so perfectly. Highly recommended!",
  },
  {
    id: 10,
    name: "Gautam Isharani",
    stars: 5,
    text: "Best Photography and videography at our marriage professional person with good camera knowledge",
  },
];

const MARQUEE_ITEMS = [
  ...TESTIMONIALS.map((t) => ({ ...t, uid: `a-${t.id}` })),
  ...TESTIMONIALS.map((t) => ({ ...t, uid: `b-${t.id}` })),
  ...TESTIMONIALS.map((t) => ({ ...t, uid: `c-${t.id}` })),
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-32 lg:py-40 bg-[#0D0D0D] overflow-hidden"
    >
      <style>{`
        @keyframes testimonial-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .testimonial-marquee-track {
          animation: testimonial-marquee 38s linear infinite;
        }
        .testimonial-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-14">
        <SectionHeading
          label="Client Stories"
          title="Testimonials"
          centered
          subtitle="Words from the people who trusted us with their most important moments."
        />
      </div>

      {/* Horizontal scrolling marquee */}
      <div className="relative flex overflow-hidden select-none">
        <div className="testimonial-marquee-track flex shrink-0 items-stretch gap-0">
          {MARQUEE_ITEMS.map((t) => (
            <div
              key={t.uid}
              data-ocid="testimonials.card"
              className="flex-shrink-0 w-[340px] mx-4 p-8 rounded-xl border border-accent/20 bg-[#111111]/80 backdrop-blur-sm flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }, (_, j) => (
                  <Star
                    key={`star-${t.uid}-${j}`}
                    size={13}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="text-sm italic text-white/75 leading-relaxed mb-7 line-clamp-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Client info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-accent">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                    Verified Client
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
