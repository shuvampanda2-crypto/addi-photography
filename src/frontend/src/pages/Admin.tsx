import { createActor } from "@/backend";
import {
  useBlogPosts,
  useContactMessages,
  useGalleryImages,
  useIsAdmin,
  usePortfolioItems,
  useServices,
  useSiteSettings,
  useTestimonials,
} from "@/lib/queries";
import type {
  BlogPost,
  ContactMessage,
  GalleryImage,
  PortfolioItem,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  ChartBar,
  Image,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Settings,
  Shield,
  Star,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Sidebar nav ─────────────────────────────────────────────────────────────
const NAV = [
  { key: "dashboard", icon: ChartBar, label: "Dashboard" },
  { key: "portfolio", icon: Camera, label: "Portfolio" },
  { key: "gallery", icon: Image, label: "Gallery" },
  { key: "blog", icon: BookOpen, label: "Blog" },
  { key: "testimonials", icon: Star, label: "Testimonials" },
  { key: "services", icon: Wrench, label: "Services" },
  { key: "settings", icon: Settings, label: "Settings" },
  { key: "messages", icon: Mail, label: "Messages" },
] as const;

type NavKey = (typeof NAV)[number]["key"];

// ─── Tiny utility: dark input className ──────────────────────────────────────
const inp =
  "w-full bg-transparent border border-white/[0.08] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C7A46C]/60 transition-colors placeholder:text-white/20";
const lbl =
  "text-[10px] tracking-[0.18em] uppercase text-white/40 block mb-1.5";

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* backdrop */}
        <button
          type="button"
          aria-label="Close modal"
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          ref={ref}
          className="relative z-10 bg-[#111111] border border-white/[0.08] w-full max-w-xl max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          data-ocid="admin.modal"
        >
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm tracking-[0.15em] uppercase text-white">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              data-ocid="admin.modal.close_button"
              className="text-white/30 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-7 py-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Confirm delete modal ─────────────────────────────────────────────────────
function ConfirmDelete({
  label,
  onConfirm,
  onCancel,
  loading,
}: {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <Modal title="Confirm Delete" onClose={onCancel}>
      <p className="text-white/60 text-sm mb-6">
        Delete <span className="text-white">{label}</span>? This cannot be
        undone.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          data-ocid="admin.modal.confirm_button"
          className="flex-1 bg-red-500/10 border border-red-500/40 text-red-400 text-xs tracking-widest uppercase py-3 hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          data-ocid="admin.modal.cancel_button"
          className="flex-1 border border-white/[0.08] text-white/50 text-xs tracking-widest uppercase py-3 hover:text-white hover:border-white/20 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

// ─── Action row buttons ───────────────────────────────────────────────────────
function ActionBtns({
  onEdit,
  onDelete,
  idx,
}: {
  onEdit: () => void;
  onDelete: () => void;
  idx: number;
}) {
  return (
    <div className="flex gap-2 shrink-0">
      <button
        type="button"
        onClick={onEdit}
        data-ocid={`admin.edit_button.${idx}`}
        className="p-2 text-white/30 hover:text-[#C7A46C] transition-colors"
        aria-label="Edit"
      >
        <Pencil size={14} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        data-ocid={`admin.delete_button.${idx}`}
        className="p-2 text-white/30 hover:text-red-400 transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ─── Section header row ───────────────────────────────────────────────────────
function SectionHeader({
  title,
  count,
  onAdd,
}: {
  title: string;
  count: number;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-white/30 mt-0.5">
          {count} item{count !== 1 ? "s" : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        data-ocid={`admin.${title.toLowerCase()}.add_button`}
        className="flex items-center gap-2 border border-[#C7A46C]/50 text-[#C7A46C] text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-[#C7A46C]/10 transition-all duration-200"
      >
        <Plus size={14} /> Add New
      </button>
    </div>
  );
}

// ─── Portfolio Tab ────────────────────────────────────────────────────────────
const PORTFOLIO_CATS = [
  "Weddings",
  "Fashion",
  "Portraits",
  "Commercial",
  "Travel",
  "Lifestyle",
];

type PortfolioFormState = Omit<PortfolioItem, "id" | "order" | "featured"> & {
  featured: boolean;
  order: number;
};

function PortfolioTab() {
  const { data: items = [] } = usePortfolioItems();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [delTarget, setDelTarget] = useState<PortfolioItem | null>(null);
  const [saving, setSaving] = useState(false);

  const blank: PortfolioFormState = {
    title: "",
    category: "Portraits",
    imageUrl: "",
    description: "",
    featured: false,
    order: items.length + 1,
  };
  const [form, setForm] = useState<PortfolioFormState>(blank);

  const openAdd = () => {
    setForm(blank);
    setEditItem(null);
    setModalMode("add");
  };

  const openEdit = (item: PortfolioItem) => {
    setForm({ ...item, order: Number(item.order) });
    setEditItem(item);
    setModalMode("edit");
  };

  const inv = () => {
    qc.invalidateQueries({ queryKey: ["portfolioItems"] });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      if (modalMode === "add") {
        await actor.addPortfolioItem(
          form.title,
          form.category,
          form.imageUrl,
          form.description,
          form.featured,
          BigInt(form.order),
        );
      } else if (modalMode === "edit" && editItem) {
        await actor.updatePortfolioItem({
          ...editItem,
          title: form.title,
          category: form.category,
          imageUrl: form.imageUrl,
          description: form.description,
          featured: form.featured,
          order: BigInt(form.order),
        });
      }
      inv();
      setModalMode(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || !delTarget) return;
    setSaving(true);
    try {
      await actor.deletePortfolioItem(delTarget.id);
      inv();
      setDelTarget(null);
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (item: PortfolioItem) => {
    if (!actor) return;
    await actor.toggleFeaturedPortfolioItem(item.id);
    inv();
  };

  return (
    <div data-ocid="admin.portfolio.section">
      <SectionHeader title="Portfolio" count={items.length} onAdd={openAdd} />
      {items.length === 0 ? (
        <EmptyState
          label="portfolio items"
          data-ocid="admin.portfolio.empty_state"
        />
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={String(item.id)}
              data-ocid={`admin.portfolio.item.${i + 1}`}
              className="flex items-center gap-4 p-4 bg-[#0B0B0B] border border-white/[0.06] hover:border-white/10 transition-colors group"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-14 h-10 object-cover shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{item.title}</p>
                <p className="text-xs text-white/30">{item.category}</p>
              </div>
              {item.featured && (
                <span className="text-[10px] tracking-widest uppercase text-[#C7A46C] border border-[#C7A46C]/30 px-2 py-0.5 shrink-0">
                  Featured
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleFeatured(item)}
                data-ocid={`admin.portfolio.toggle.${i + 1}`}
                className="p-2 text-white/20 hover:text-[#C7A46C] transition-colors shrink-0"
                aria-label="Toggle featured"
              >
                <Star
                  size={14}
                  fill={item.featured ? "currentColor" : "none"}
                />
              </button>
              <ActionBtns
                onEdit={() => openEdit(item)}
                onDelete={() => setDelTarget(item)}
                idx={i + 1}
              />
            </div>
          ))}
        </div>
      )}

      {modalMode !== null && (
        <Modal
          title={
            modalMode === "add" ? "Add Portfolio Item" : "Edit Portfolio Item"
          }
          onClose={() => setModalMode(null)}
        >
          <PortfolioForm
            form={form}
            setForm={setForm}
            onSave={handleSave}
            saving={saving}
          />
        </Modal>
      )}
      {delTarget && (
        <ConfirmDelete
          label={delTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

function PortfolioForm({
  form,
  setForm,
  onSave,
  saving,
}: {
  form: PortfolioFormState;
  setForm: React.Dispatch<React.SetStateAction<PortfolioFormState>>;
  onSave: (e: React.FormEvent) => Promise<void>;
  saving: boolean;
}) {
  return (
    <form onSubmit={onSave} className="space-y-4">
      <div>
        <label htmlFor="pf-title" className={lbl}>
          Title
        </label>
        <input
          id="pf-title"
          data-ocid="admin.portfolio.title_input"
          required
          className={inp}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="pf-category" className={lbl}>
          Category
        </label>
        <select
          id="pf-category"
          data-ocid="admin.portfolio.category_select"
          className={inp}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {PORTFOLIO_CATS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pf-imageUrl" className={lbl}>
          Image URL
        </label>
        <input
          id="pf-imageUrl"
          data-ocid="admin.portfolio.imageUrl_input"
          className={inp}
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="pf-desc" className={lbl}>
          Description
        </label>
        <textarea
          id="pf-desc"
          data-ocid="admin.portfolio.description_input"
          rows={3}
          className={inp}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <label htmlFor="pf-order" className={lbl}>
            Order
          </label>
          <input
            id="pf-order"
            data-ocid="admin.portfolio.order_input"
            type="number"
            className={inp}
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex items-end gap-3 pb-3">
          <input
            id="portfolio-featured"
            type="checkbox"
            data-ocid="admin.portfolio.featured_checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-[#C7A46C] w-4 h-4"
          />
          <label htmlFor="portfolio-featured" className="text-xs text-white/50">
            Featured
          </label>
        </div>
      </div>
      <FormActions saving={saving} onCancel={() => {}} />
    </form>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────
type GalleryFormState = Omit<GalleryImage, "id" | "order"> & { order: number };

function GalleryTab() {
  const { data: images = [] } = useGalleryImages();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | "add" | GalleryImage>(null);
  const [delTarget, setDelTarget] = useState<GalleryImage | null>(null);
  const [saving, setSaving] = useState(false);
  const blank: GalleryFormState = {
    imageUrl: "",
    title: "",
    order: images.length + 1,
  };
  const [form, setForm] = useState<GalleryFormState>(blank);

  const inv = () => qc.invalidateQueries({ queryKey: ["galleryImages"] });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      if (modal === "add") {
        await actor.addGalleryImage(
          form.imageUrl,
          form.title,
          BigInt(form.order),
        );
      } else if (modal && typeof modal !== "string") {
        await actor.updateGalleryImage({
          ...modal,
          imageUrl: form.imageUrl,
          title: form.title,
          order: BigInt(form.order),
        });
      }
      inv();
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || !delTarget) return;
    setSaving(true);
    try {
      await actor.deleteGalleryImage(delTarget.id);
      inv();
      setDelTarget(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="admin.gallery.section">
      <SectionHeader
        title="Gallery"
        count={images.length}
        onAdd={() => {
          setForm(blank);
          setModal("add");
        }}
      />
      {images.length === 0 ? (
        <EmptyState
          label="gallery images"
          data-ocid="admin.gallery.empty_state"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={String(img.id)}
              data-ocid={`admin.gallery.item.${i + 1}`}
              className="relative group"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full aspect-square object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      imageUrl: img.imageUrl,
                      title: img.title,
                      order: Number(img.order),
                    });
                    setModal(img);
                  }}
                  data-ocid={`admin.gallery.edit_button.${i + 1}`}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setDelTarget(img)}
                  data-ocid={`admin.gallery.delete_button.${i + 1}`}
                  className="p-2 bg-white/10 hover:bg-red-500/30 text-white hover:text-red-400 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-[11px] text-white/40 truncate mt-1 px-1">
                {img.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <Modal
          title={modal === "add" ? "Add Gallery Image" : "Edit Gallery Image"}
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="gal-imageUrl" className={lbl}>
                Image URL
              </label>
              <input
                id="gal-imageUrl"
                data-ocid="admin.gallery.imageUrl_input"
                required
                className={inp}
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="gal-title" className={lbl}>
                Title
              </label>
              <input
                id="gal-title"
                data-ocid="admin.gallery.title_input"
                className={inp}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="gal-order" className={lbl}>
                Order
              </label>
              <input
                id="gal-order"
                data-ocid="admin.gallery.order_input"
                type="number"
                className={inp}
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
              />
            </div>
            <FormActions saving={saving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      )}
      {delTarget && (
        <ConfirmDelete
          label={delTarget.title || "this image"}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

// ─── Blog Tab ─────────────────────────────────────────────────────────────────
type BlogFormState = Omit<BlogPost, "id">;

function BlogTab() {
  const { data: posts = [] } = useBlogPosts(false);
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | "add" | BlogPost>(null);
  const [delTarget, setDelTarget] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const blank: BlogFormState = {
    title: "",
    category: "",
    excerpt: "",
    imageUrl: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
    published: false,
  };
  const [form, setForm] = useState<BlogFormState>(blank);

  const inv = () => qc.invalidateQueries({ queryKey: ["blogPosts"] });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      if (modal === "add") {
        await actor.addBlogPost(
          form.title,
          form.category,
          form.excerpt,
          form.imageUrl,
          form.content,
          form.date,
          form.published,
        );
      } else if (modal && typeof modal !== "string") {
        await actor.updateBlogPost({ ...modal, ...form });
      }
      inv();
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || !delTarget) return;
    setSaving(true);
    try {
      await actor.deleteBlogPost(delTarget.id);
      inv();
      setDelTarget(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="admin.blog.section">
      <SectionHeader
        title="Blog"
        count={posts.length}
        onAdd={() => {
          setForm(blank);
          setModal("add");
        }}
      />
      {posts.length === 0 ? (
        <EmptyState label="blog posts" data-ocid="admin.blog.empty_state" />
      ) : (
        <div className="space-y-2">
          {posts.map((post, i) => (
            <div
              key={String(post.id)}
              data-ocid={`admin.blog.item.${i + 1}`}
              className="flex items-center gap-4 p-4 bg-[#0B0B0B] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-16 h-11 object-cover shrink-0 opacity-80"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{post.title}</p>
                <p className="text-xs text-white/30">
                  {post.category} · {post.date}
                </p>
              </div>
              <span
                className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border shrink-0 ${post.published ? "text-emerald-400 border-emerald-400/30" : "text-white/30 border-white/10"}`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
              <ActionBtns
                onEdit={() => {
                  setForm({ ...post });
                  setModal(post);
                }}
                onDelete={() => setDelTarget(post)}
                idx={i + 1}
              />
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <Modal
          title={modal === "add" ? "Add Blog Post" : "Edit Blog Post"}
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="blog-title" className={lbl}>
                Title
              </label>
              <input
                id="blog-title"
                data-ocid="admin.blog.title_input"
                required
                className={inp}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="blog-category" className={lbl}>
                Category
              </label>
              <input
                id="blog-category"
                data-ocid="admin.blog.category_input"
                className={inp}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="blog-date" className={lbl}>
                Date (YYYY-MM-DD)
              </label>
              <input
                id="blog-date"
                data-ocid="admin.blog.date_input"
                className={inp}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="blog-imageUrl" className={lbl}>
                Image URL
              </label>
              <input
                id="blog-imageUrl"
                data-ocid="admin.blog.imageUrl_input"
                className={inp}
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="blog-excerpt" className={lbl}>
                Excerpt
              </label>
              <textarea
                id="blog-excerpt"
                data-ocid="admin.blog.excerpt_input"
                rows={2}
                className={inp}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="blog-content" className={lbl}>
                Content
              </label>
              <textarea
                id="blog-content"
                data-ocid="admin.blog.content_input"
                rows={5}
                className={inp}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                id="blog-published"
                type="checkbox"
                data-ocid="admin.blog.published_checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="accent-[#C7A46C] w-4 h-4"
              />
              <label htmlFor="blog-published" className="text-xs text-white/50">
                Published
              </label>
            </div>
            <FormActions saving={saving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      )}
      {delTarget && (
        <ConfirmDelete
          label={delTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

// ─── Testimonials Tab ─────────────────────────────────────────────────────────
type TestimonialFormState = Omit<Testimonial, "id" | "order" | "rating"> & {
  order: number;
  rating: number;
};

function TestimonialsTab() {
  const { data: items = [] } = useTestimonials();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | "add" | Testimonial>(null);
  const [delTarget, setDelTarget] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const blank: TestimonialFormState = {
    clientName: "",
    clientImage: "",
    review: "",
    rating: 5,
    order: items.length + 1,
  };
  const [form, setForm] = useState<TestimonialFormState>(blank);

  const inv = () => qc.invalidateQueries({ queryKey: ["testimonials"] });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      if (modal === "add") {
        await actor.addTestimonial(
          form.clientName,
          form.clientImage,
          form.review,
          BigInt(form.rating),
          BigInt(form.order),
        );
      } else if (modal && typeof modal !== "string") {
        await actor.updateTestimonial({
          ...modal,
          clientName: form.clientName,
          clientImage: form.clientImage,
          review: form.review,
          rating: BigInt(form.rating),
          order: BigInt(form.order),
        });
      }
      inv();
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || !delTarget) return;
    setSaving(true);
    try {
      await actor.deleteTestimonial(delTarget.id);
      inv();
      setDelTarget(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="admin.testimonials.section">
      <SectionHeader
        title="Testimonials"
        count={items.length}
        onAdd={() => {
          setForm(blank);
          setModal("add");
        }}
      />
      {items.length === 0 ? (
        <EmptyState
          label="testimonials"
          data-ocid="admin.testimonials.empty_state"
        />
      ) : (
        <div className="space-y-2">
          {items.map((t, i) => (
            <div
              key={String(t.id)}
              data-ocid={`admin.testimonials.item.${i + 1}`}
              className="flex items-center gap-4 p-4 bg-[#0B0B0B] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              {t.clientImage && (
                <img
                  src={t.clientImage}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 opacity-80"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{t.clientName}</p>
                <p className="text-xs text-white/30 truncate">{t.review}</p>
              </div>
              <div className="flex shrink-0">
                {[1, 2, 3, 4, 5].map((si) => (
                  <Star
                    key={`star-${si}`}
                    size={12}
                    className={
                      si < Number(t.rating) ? "text-[#C7A46C]" : "text-white/20"
                    }
                    fill={si < Number(t.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <ActionBtns
                onEdit={() => {
                  setForm({
                    ...t,
                    order: Number(t.order),
                    rating: Number(t.rating),
                  });
                  setModal(t);
                }}
                onDelete={() => setDelTarget(t)}
                idx={i + 1}
              />
            </div>
          ))}
        </div>
      )}
      {modal !== null && (
        <Modal
          title={modal === "add" ? "Add Testimonial" : "Edit Testimonial"}
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="t-clientName" className={lbl}>
                Client Name
              </label>
              <input
                id="t-clientName"
                data-ocid="admin.testimonials.clientName_input"
                required
                className={inp}
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="t-clientImage" className={lbl}>
                Client Image URL
              </label>
              <input
                id="t-clientImage"
                data-ocid="admin.testimonials.clientImage_input"
                className={inp}
                value={form.clientImage}
                onChange={(e) =>
                  setForm({ ...form, clientImage: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="t-review" className={lbl}>
                Review
              </label>
              <textarea
                id="t-review"
                data-ocid="admin.testimonials.review_input"
                rows={3}
                required
                className={inp}
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
              />
            </div>
            <div>
              <p className={`${lbl} block`}>Rating</p>
              <div className="flex gap-2 py-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    data-ocid={`admin.testimonials.rating.${n}`}
                    onClick={() => setForm({ ...form, rating: n })}
                    className="p-1"
                    aria-label={`${n} star`}
                  >
                    <Star
                      size={20}
                      className={
                        n <= form.rating ? "text-[#C7A46C]" : "text-white/20"
                      }
                      fill={n <= form.rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="t-order" className={lbl}>
                Order
              </label>
              <input
                id="t-order"
                data-ocid="admin.testimonials.order_input"
                type="number"
                className={inp}
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
              />
            </div>
            <FormActions saving={saving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      )}
      {delTarget && (
        <ConfirmDelete
          label={delTarget.clientName}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

// ─── Services Tab ─────────────────────────────────────────────────────────────
type ServiceFormState = Omit<Service, "id" | "order"> & { order: number };

function ServicesTab() {
  const { data: items = [] } = useServices();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [modal, setModal] = useState<null | "add" | Service>(null);
  const [delTarget, setDelTarget] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const blank: ServiceFormState = {
    title: "",
    description: "",
    icon: "",
    order: items.length + 1,
  };
  const [form, setForm] = useState<ServiceFormState>(blank);

  const inv = () => qc.invalidateQueries({ queryKey: ["services"] });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      if (modal === "add") {
        await actor.addService(
          form.title,
          form.description,
          form.icon,
          BigInt(form.order),
        );
      } else if (modal && typeof modal !== "string") {
        await actor.updateService({
          ...modal,
          title: form.title,
          description: form.description,
          icon: form.icon,
          order: BigInt(form.order),
        });
      }
      inv();
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || !delTarget) return;
    setSaving(true);
    try {
      await actor.deleteService(delTarget.id);
      inv();
      setDelTarget(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="admin.services.section">
      <SectionHeader
        title="Services"
        count={items.length}
        onAdd={() => {
          setForm(blank);
          setModal("add");
        }}
      />
      {items.length === 0 ? (
        <EmptyState label="services" data-ocid="admin.services.empty_state" />
      ) : (
        <div className="space-y-2">
          {items.map((svc, i) => (
            <div
              key={String(svc.id)}
              data-ocid={`admin.services.item.${i + 1}`}
              className="flex items-center gap-4 p-4 bg-[#0B0B0B] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <span className="w-10 h-10 flex items-center justify-center text-2xl shrink-0">
                {svc.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{svc.title}</p>
                <p className="text-xs text-white/30 truncate">
                  {svc.description}
                </p>
              </div>
              <ActionBtns
                onEdit={() => {
                  setForm({ ...svc, order: Number(svc.order) });
                  setModal(svc);
                }}
                onDelete={() => setDelTarget(svc)}
                idx={i + 1}
              />
            </div>
          ))}
        </div>
      )}
      {modal !== null && (
        <Modal
          title={modal === "add" ? "Add Service" : "Edit Service"}
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="svc-title" className={lbl}>
                Title
              </label>
              <input
                id="svc-title"
                data-ocid="admin.services.title_input"
                required
                className={inp}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="svc-icon" className={lbl}>
                Icon (emoji or name)
              </label>
              <input
                id="svc-icon"
                data-ocid="admin.services.icon_input"
                className={inp}
                value={form.icon}
                placeholder="📷"
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="svc-desc" className={lbl}>
                Description
              </label>
              <textarea
                id="svc-desc"
                data-ocid="admin.services.description_input"
                rows={3}
                required
                className={inp}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="svc-order" className={lbl}>
                Order
              </label>
              <input
                id="svc-order"
                data-ocid="admin.services.order_input"
                type="number"
                className={inp}
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
              />
            </div>
            <FormActions saving={saving} onCancel={() => setModal(null)} />
          </form>
        </Modal>
      )}
      {delTarget && (
        <ConfirmDelete
          label={delTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────
function SettingsTab({ settings }: { settings: SiteSettings }) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [form, setForm] = useState({
    ...settings,
    yearsExp: Number(settings.yearsExp),
    happyClients: Number(settings.happyClients),
    projectsCompleted: Number(settings.projectsCompleted),
    awards: Number(settings.awards),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      await actor.updateSettings({
        ...form,
        yearsExp: BigInt(form.yearsExp),
        happyClients: BigInt(form.happyClients),
        projectsCompleted: BigInt(form.projectsCompleted),
        awards: BigInt(form.awards),
      });
      qc.invalidateQueries({ queryKey: ["siteSettings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  type FormKey = keyof typeof form;
  const fields: Array<{
    key: FormKey;
    label: string;
    type?: string;
    span?: boolean;
  }> = [
    { key: "businessName", label: "Business Name" },
    { key: "tagline", label: "Tagline" },
    { key: "heroHeading", label: "Hero Heading", span: true },
    { key: "heroSubheading", label: "Hero Subheading", span: true },
    { key: "aboutText", label: "About Text", span: true },
    { key: "aboutImage", label: "About Image URL", span: true },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address", span: true },
    { key: "instagram", label: "Instagram URL" },
    { key: "facebook", label: "Facebook URL" },
    { key: "twitter", label: "Twitter / X URL" },
    { key: "youtube", label: "YouTube URL" },
    { key: "yearsExp", label: "Years Experience", type: "number" },
    { key: "happyClients", label: "Happy Clients", type: "number" },
    { key: "projectsCompleted", label: "Projects Completed", type: "number" },
    { key: "awards", label: "Awards Won", type: "number" },
  ];

  return (
    <div data-ocid="admin.settings.section">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Settings
        </h2>
        <p className="text-xs text-white/30 mt-0.5">Site-wide configuration</p>
      </div>
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map(({ key, label, type = "text", span }) => (
            <div key={key} className={span ? "sm:col-span-2" : ""}>
              <label htmlFor={`settings-${key}`} className={lbl}>
                {label}
              </label>
              {key === "aboutText" || key === "heroSubheading" ? (
                <textarea
                  id={`settings-${key}`}
                  data-ocid={`admin.settings.${key}_input`}
                  rows={3}
                  value={String(form[key])}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={inp}
                />
              ) : (
                <input
                  id={`settings-${key}`}
                  data-ocid={`admin.settings.${key}_input`}
                  type={type}
                  value={String(form[key])}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]:
                        type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    })
                  }
                  className={inp}
                />
              )}
            </div>
          ))}
        </div>
        {saved && (
          <p
            data-ocid="admin.settings.success_state"
            className="text-sm text-[#C7A46C]"
          >
            ✓ Settings saved successfully.
          </p>
        )}
        <button
          type="submit"
          data-ocid="admin.settings.save_button"
          disabled={saving}
          className="border border-[#C7A46C]/60 text-[#C7A46C] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#C7A46C]/10 transition-all duration-300 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────
function MessagesTab() {
  const { data: messages = [] } = useContactMessages();

  return (
    <div data-ocid="admin.messages.section">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Messages
        </h2>
        <p className="text-xs text-white/30 mt-0.5">
          {messages.length} message{messages.length !== 1 ? "s" : ""} received
        </p>
      </div>
      {messages.length === 0 ? (
        <EmptyState label="messages" data-ocid="admin.messages.empty_state" />
      ) : (
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={String(msg.id)}
              data-ocid={`admin.messages.item.${i + 1}`}
              className="p-6 bg-[#0B0B0B] border border-white/[0.06]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-medium text-white">{msg.name}</p>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-[#C7A46C]/80 hover:text-[#C7A46C] transition-colors"
                  >
                    {msg.email}
                  </a>
                </div>
                <div className="text-right">
                  {msg.service && (
                    <p className="text-xs text-white/40">{msg.service}</p>
                  )}
                  {msg.budget && (
                    <p className="text-xs text-white/30">{msg.budget}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {msg.message}
              </p>
              <p className="text-[11px] text-white/20 mt-3">
                {new Date(Number(msg.createdAt) / 1_000_000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab() {
  const { data: portfolio = [] } = usePortfolioItems();
  const { data: gallery = [] } = useGalleryImages();
  const { data: blogs = [] } = useBlogPosts(false);
  const { data: testimonials = [] } = useTestimonials();
  const { data: messages = [] } = useContactMessages();

  const stats = [
    {
      label: "Portfolio Items",
      value: portfolio.length,
      icon: Camera,
      key: "portfolio",
    },
    {
      label: "Gallery Images",
      value: gallery.length,
      icon: Image,
      key: "gallery",
    },
    { label: "Blog Posts", value: blogs.length, icon: BookOpen, key: "blog" },
    {
      label: "Testimonials",
      value: testimonials.length,
      icon: Star,
      key: "testimonials",
    },
  ];

  return (
    <div data-ocid="admin.dashboard.section">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Dashboard
        </h2>
        <p className="text-xs text-white/30 mt-0.5">Overview of your content</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="p-5 bg-[#0B0B0B] border border-white/[0.06] hover:border-[#C7A46C]/20 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon
                size={16}
                className="text-white/20 group-hover:text-[#C7A46C]/60 transition-colors"
              />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/30 mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-white/30 mb-4">
          Recent Messages
        </h3>
        {messages.length === 0 ? (
          <p className="text-sm text-white/20">No messages yet.</p>
        ) : (
          <div className="space-y-2">
            {messages.slice(0, 5).map((msg, i) => (
              <div
                key={String(msg.id)}
                data-ocid={`admin.dashboard.message.${i + 1}`}
                className="flex items-center justify-between p-4 bg-[#0B0B0B] border border-white/[0.06]"
              >
                <div>
                  <p className="text-sm text-white">{msg.name}</p>
                  <p className="text-xs text-white/30">{msg.email}</p>
                </div>
                <p className="text-xs text-white/20">{msg.service}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
function EmptyState({
  label,
  "data-ocid": ocid,
}: { label: string; "data-ocid": string }) {
  return (
    <div data-ocid={ocid} className="text-center py-20 text-white/20">
      <p className="text-sm">No {label} yet. Add your first one.</p>
    </div>
  );
}

function FormActions({
  saving,
  onCancel,
}: { saving: boolean; onCancel: () => void }) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={saving}
        data-ocid="admin.modal.submit_button"
        className="flex-1 border border-[#C7A46C]/50 text-[#C7A46C] text-xs tracking-[0.15em] uppercase py-3.5 hover:bg-[#C7A46C]/10 transition-all duration-200 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        data-ocid="admin.modal.cancel_button"
        className="flex-1 border border-white/[0.06] text-white/40 text-xs tracking-[0.15em] uppercase py-3.5 hover:text-white hover:border-white/20 transition-all duration-200"
      >
        Cancel
      </button>
    </div>
  );
}

// ─── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen() {
  const { login, isInitializing: isInit, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
      <motion.div
        className="text-center max-w-sm px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 border border-[#C7A46C]/20 flex items-center justify-center mx-auto mb-8">
          <Shield size={32} className="text-[#C7A46C]" />
        </div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C7A46C]/60 mb-4">
          Addi Photography
        </p>
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          Admin Access
        </h1>
        <p className="text-white/40 text-sm mb-10 leading-relaxed">
          Sign in with Internet Identity to manage your photography portfolio.
        </p>
        <button
          type="button"
          data-ocid="admin.login_button"
          onClick={() => login()}
          disabled={isInit || isLoggingIn}
          className="w-full border border-[#C7A46C] text-[#C7A46C] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#C7A46C] hover:text-[#0B0B0B] transition-all duration-300 disabled:opacity-50"
        >
          {isInit
            ? "Initializing..."
            : isLoggingIn
              ? "Connecting..."
              : "Login with Internet Identity"}
        </button>
        <div className="mt-8">
          <Link
            to="/"
            className="text-xs text-white/20 hover:text-white/50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={12} /> Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main AdminPage export ────────────────────────────────────────────────────
export function AdminPage() {
  const { isAuthenticated, isInitializing, clear } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: settings } = useSiteSettings();
  const [activeSection, setActiveSection] = useState<NavKey>("dashboard");
  const [firstAdminDone, setFirstAdminDone] = useState(false);
  const qc = useQueryClient();

  // First admin setup
  useEffect(() => {
    if (!actor || !isAuthenticated || firstAdminDone) return;
    if (isAdmin === false) {
      actor.setFirstAdmin().then(() => {
        setFirstAdminDone(true);
        qc.invalidateQueries({ queryKey: ["isAdmin"] });
      });
    }
  }, [actor, isAuthenticated, isAdmin, firstAdminDone, qc]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C7A46C]/40 border-t-[#C7A46C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-white/30 tracking-widest uppercase">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C7A46C]/40 border-t-[#C7A46C] rounded-full animate-spin" />
      </div>
    );
  }

  if (isAdmin === false && firstAdminDone) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-center">
          <Shield size={40} className="text-red-400/60 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
          <p className="text-white/40 text-sm mb-8">
            You don't have admin privileges.
          </p>
          <button
            type="button"
            onClick={() => clear()}
            className="text-xs text-[#C7A46C] hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-[#111111] border-r border-white/[0.06] flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-[0.18em] text-white">
              ADDI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A46C]" />
          </div>
          <p className="text-[10px] text-white/30 mt-1 tracking-widest uppercase">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              data-ocid={`admin.nav.${key}`}
              onClick={() => setActiveSection(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 text-left ${
                activeSection === key
                  ? "bg-[#C7A46C]/10 text-[#C7A46C] border-l-2 border-[#C7A46C]"
                  : "text-white/40 hover:text-white hover:bg-white/[0.04] border-l-2 border-transparent"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-white/25 hover:text-white/60 transition-colors py-1"
          >
            <ArrowLeft size={12} /> View Portfolio
          </Link>
          <button
            type="button"
            data-ocid="admin.logout_button"
            onClick={() => clear()}
            className="flex items-center gap-2 text-xs text-red-400/50 hover:text-red-400 transition-colors py-1"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#111111] border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-base tracking-[0.2em] text-white">
          ADDI <span className="text-[#C7A46C]">·</span>
        </span>
        <select
          data-ocid="admin.mobile_nav"
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value as NavKey)}
          className="bg-transparent text-white/60 text-xs border border-white/[0.08] px-3 py-1.5 focus:outline-none"
        >
          {NAV.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Main content */}
      <main className="flex-1 md:p-8 p-4 pt-16 md:pt-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === "dashboard" && <DashboardTab />}
              {activeSection === "portfolio" && <PortfolioTab />}
              {activeSection === "gallery" && <GalleryTab />}
              {activeSection === "blog" && <BlogTab />}
              {activeSection === "testimonials" && <TestimonialsTab />}
              {activeSection === "services" && <ServicesTab />}
              {activeSection === "settings" && settings && (
                <SettingsTab settings={settings} />
              )}
              {activeSection === "settings" && !settings && (
                <div className="flex items-center justify-center py-20">
                  <div className="w-6 h-6 border-2 border-[#C7A46C]/40 border-t-[#C7A46C] rounded-full animate-spin" />
                </div>
              )}
              {activeSection === "messages" && <MessagesTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
