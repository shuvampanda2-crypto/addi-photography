import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface BlogSectionProps {
  posts: BlogPost[];
}

const DEFAULT_IMAGES = [
  "/assets/generated/blog-golden-hour.dim_900x600.jpg",
  "/assets/generated/showcase-wedding.dim_1920x1080.jpg",
  "/assets/generated/showcase-fashion.dim_1920x1080.jpg",
];

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="py-32 lg:py-40 bg-[#0B0B0B]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label="Journal"
          title="Latest Stories"
          subtitle="Insights, techniques, and stories from behind the lens."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, i) => (
            <ScrollReveal key={String(post.id)} delay={i * 0.1}>
              <article
                data-ocid={`blog.item.${i + 1}`}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden mb-6">
                  <motion.img
                    src={
                      post.imageUrl || DEFAULT_IMAGES[i] || DEFAULT_IMAGES[0]
                    }
                    alt={post.title}
                    className="w-full h-60 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-accent bg-[#0B0B0B]/85 backdrop-blur-sm px-3 py-1.5 border border-accent/20">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-[#0B0B0B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Date */}
                <p className="text-[10px] text-white/25 tracking-[0.2em] uppercase mb-3">
                  {post.date}
                </p>

                {/* Title */}
                <h3
                  className="font-display text-2xl text-white mb-3 leading-snug group-hover:text-accent transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-white/45 leading-relaxed mb-5 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-accent/60 group-hover:text-accent transition-colors duration-300">
                  Read More
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
