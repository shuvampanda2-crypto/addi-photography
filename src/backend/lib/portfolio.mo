import List "mo:core/List";
import Types "../types/portfolio";

module {
  public type State = {
    portfolioItems : List.List<Types.PortfolioItem>;
    galleryImages : List.List<Types.GalleryImage>;
    blogPosts : List.List<Types.BlogPost>;
    testimonials : List.List<Types.Testimonial>;
    services : List.List<Types.Service>;
    contactMessages : List.List<Types.ContactMessage>;
    var settings : Types.SiteSettings;
    var nextId : Nat;
    var initialized : Bool;
  };

  // --- Helpers ---
  func nextId(state : State) : Nat {
    let id = state.nextId;
    state.nextId += 1;
    id;
  };

  // --- Sample data init ---
  public func initSampleData(state : State) {
    if (state.initialized) return;
    state.initialized := true;

    // 6 portfolio items (one per category)
    let portfolioSamples : [(Text, Text, Text, Text, Bool)] = [
      ("Golden Hour Wedding", "Weddings", "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", "A breathtaking golden hour wedding ceremony captured in stunning cinematic detail.", true),
      ("Editorial Fashion", "Fashion", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", "High-fashion editorial shoot exploring texture, light, and silhouette.", true),
      ("Intimate Portrait", "Portraits", "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800", "A soul-revealing portrait session that captures authentic emotion.", false),
      ("Brand Campaign", "Commercial", "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800", "Full-scale commercial brand campaign with cinematic product storytelling.", true),
      ("Santorini Escape", "Travel", "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800", "Travel photography capturing the azure beauty of the Greek islands.", false),
      ("Urban Lifestyle", "Lifestyle", "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800", "Authentic lifestyle photography in the heart of the city.", false),
    ];
    var pOrder = 1;
    for ((title, cat, url, desc, feat) in portfolioSamples.values()) {
      let id = nextId(state);
      state.portfolioItems.add({ id; title; category = cat; imageUrl = url; description = desc; featured = feat; order = pOrder });
      pOrder += 1;
    };

    // 3 services
    let serviceSamples : [(Text, Text, Text)] = [
      ("Wedding Photography", "Full-day cinematic wedding coverage with a narrative editorial approach.", "camera"),
      ("Cinematic Videography", "Breathtaking wedding films and brand videos that tell your story.", "film"),
      ("Brand Promotions", "Strategic brand promotions to elevate your identity and digital presence.", "image"),
    ];
    var sOrder = 1;
    for ((title, desc, icon) in serviceSamples.values()) {
      let id = nextId(state);
      state.services.add({ id; title; description = desc; icon; order = sOrder });
      sOrder += 1;
    };

    // 4 testimonials
    let testimonialSamples : [(Text, Text, Text, Nat)] = [
      ("Emma & James", "Working with Addi was the most magical experience. Every photo captures a feeling, not just a moment.", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", 5),
      ("Sarah Mitchell", "Addi has an incredible eye for light and emotion. Our brand campaign exceeded every expectation.", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", 5),
      ("Michael Torres", "Professional, talented, and an absolute joy to work with. The portraits are stunning.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", 5),
      ("Priya & Aryan", "Our wedding album is a cinematic masterpiece. Every guest asks who our photographer was.", "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200", 5),
    ];
    var tOrder = 1;
    for ((name, review, img, rating) in testimonialSamples.values()) {
      let id = nextId(state);
      state.testimonials.add({ id; clientName = name; clientImage = img; review; rating; order = tOrder });
      tOrder += 1;
    };

    // 3 blog posts
    let blogSamples : [(Text, Text, Text, Text, Text, Text)] = [
      ("The Art of Golden Hour", "Tips & Guides", "Discover how to harness the magical light of golden hour for breathtaking portraits.", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", "Golden hour — the hour after sunrise and the hour before sunset — produces a warm, diffused light that flatters every subject. Here are our top techniques for mastering this magical window.", "May 2, 2026"),
      ("Wedding Day Timeline Tips", "Weddings", "How to structure your wedding day for the best photography results.", "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", "A well-planned timeline is the secret to stress-free wedding photography. Learn how to allocate time for portraits, family formals, and candid moments.", "Apr 15, 2026"),
      ("Building a Brand Through Imagery", "Commercial", "Why consistent, high-quality photography is the backbone of a powerful brand.", "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800", "In the digital age, your brand imagery is your first impression. Explore how intentional photography can transform your brand identity and drive customer trust.", "Mar 28, 2026"),
    ];
    for ((title, cat, excerpt, img, content, date) in blogSamples.values()) {
      let id = nextId(state);
      state.blogPosts.add({ id; title; category = cat; excerpt; imageUrl = img; content; date; published = true });
    };

    // 8 gallery images
    let gallerySamples : [(Text, Text)] = [
      ("https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800", "Summer Portrait"),
      ("https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800", "Studio Elegance"),
      ("https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800", "Bridal Beauty"),
      ("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", "Mountain Dawn"),
      ("https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800", "Urban Story"),
      ("https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800", "Fashion Week"),
      ("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", "Timeless Love"),
      ("https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800", "City Vibes"),
    ];
    var gOrder = 1;
    for ((url, title) in gallerySamples.values()) {
      let id = nextId(state);
      state.galleryImages.add({ id; imageUrl = url; title; order = gOrder });
      gOrder += 1;
    };
  };

  // --- PortfolioItem ---
  public func listPortfolioItems(state : State) : [Types.PortfolioItem] {
    state.portfolioItems.toArray();
  };

  public func listPortfolioItemsByCategory(state : State, category : Text) : [Types.PortfolioItem] {
    state.portfolioItems.filter(func(item) { item.category == category }).toArray();
  };

  public func getPortfolioItem(state : State, id : Nat) : ?Types.PortfolioItem {
    state.portfolioItems.find(func(item) { item.id == id });
  };

  public func addPortfolioItem(
    state : State,
    title : Text,
    category : Text,
    imageUrl : Text,
    description : Text,
    featured : Bool,
    order : Nat,
  ) : Types.PortfolioItem {
    let id = nextId(state);
    let item : Types.PortfolioItem = { id; title; category; imageUrl; description; featured; order };
    state.portfolioItems.add(item);
    item;
  };

  public func updatePortfolioItem(state : State, item : Types.PortfolioItem) : Bool {
    switch (state.portfolioItems.findIndex(func(p) { p.id == item.id })) {
      case (?idx) { state.portfolioItems.put(idx, item); true };
      case null false;
    };
  };

  public func toggleFeaturedPortfolioItem(state : State, id : Nat) : Bool {
    switch (state.portfolioItems.findIndex(func(p) { p.id == id })) {
      case (?idx) {
        let item = state.portfolioItems.at(idx);
        state.portfolioItems.put(idx, { item with featured = not item.featured });
        true;
      };
      case null false;
    };
  };

  public func deletePortfolioItem(state : State, id : Nat) : Bool {
    let before = state.portfolioItems.size();
    let filtered = state.portfolioItems.filter(func(item) { item.id != id });
    if (filtered.size() < before) {
      state.portfolioItems.clear();
      state.portfolioItems.append(filtered);
      true;
    } else false;
  };

  // --- GalleryImage ---
  public func listGalleryImages(state : State) : [Types.GalleryImage] {
    state.galleryImages.toArray();
  };

  public func addGalleryImage(
    state : State,
    imageUrl : Text,
    title : Text,
    order : Nat,
  ) : Types.GalleryImage {
    let id = nextId(state);
    let image : Types.GalleryImage = { id; imageUrl; title; order };
    state.galleryImages.add(image);
    image;
  };

  public func updateGalleryImage(state : State, image : Types.GalleryImage) : Bool {
    switch (state.galleryImages.findIndex(func(g) { g.id == image.id })) {
      case (?idx) { state.galleryImages.put(idx, image); true };
      case null false;
    };
  };

  public func deleteGalleryImage(state : State, id : Nat) : Bool {
    let before = state.galleryImages.size();
    let filtered = state.galleryImages.filter(func(g) { g.id != id });
    if (filtered.size() < before) {
      state.galleryImages.clear();
      state.galleryImages.append(filtered);
      true;
    } else false;
  };

  // --- BlogPost ---
  public func listBlogPosts(state : State) : [Types.BlogPost] {
    state.blogPosts.toArray();
  };

  public func listPublishedBlogPosts(state : State) : [Types.BlogPost] {
    state.blogPosts.filter(func(p) { p.published }).toArray();
  };

  public func listBlogPostsByCategory(state : State, category : Text) : [Types.BlogPost] {
    state.blogPosts.filter(func(p) { p.category == category }).toArray();
  };

  public func getBlogPost(state : State, id : Nat) : ?Types.BlogPost {
    state.blogPosts.find(func(p) { p.id == id });
  };

  public func addBlogPost(
    state : State,
    title : Text,
    category : Text,
    excerpt : Text,
    imageUrl : Text,
    content : Text,
    date : Text,
    published : Bool,
  ) : Types.BlogPost {
    let id = nextId(state);
    let post : Types.BlogPost = { id; title; category; excerpt; imageUrl; content; date; published };
    state.blogPosts.add(post);
    post;
  };

  public func updateBlogPost(state : State, post : Types.BlogPost) : Bool {
    switch (state.blogPosts.findIndex(func(p) { p.id == post.id })) {
      case (?idx) { state.blogPosts.put(idx, post); true };
      case null false;
    };
  };

  public func deleteBlogPost(state : State, id : Nat) : Bool {
    let before = state.blogPosts.size();
    let filtered = state.blogPosts.filter(func(p) { p.id != id });
    if (filtered.size() < before) {
      state.blogPosts.clear();
      state.blogPosts.append(filtered);
      true;
    } else false;
  };

  // --- Testimonial ---
  public func listTestimonials(state : State) : [Types.Testimonial] {
    state.testimonials.toArray();
  };

  public func addTestimonial(
    state : State,
    clientName : Text,
    clientImage : Text,
    review : Text,
    rating : Nat,
    order : Nat,
  ) : Types.Testimonial {
    let id = nextId(state);
    let t : Types.Testimonial = { id; clientName; clientImage; review; rating; order };
    state.testimonials.add(t);
    t;
  };

  public func updateTestimonial(state : State, t : Types.Testimonial) : Bool {
    switch (state.testimonials.findIndex(func(x) { x.id == t.id })) {
      case (?idx) { state.testimonials.put(idx, t); true };
      case null false;
    };
  };

  public func deleteTestimonial(state : State, id : Nat) : Bool {
    let before = state.testimonials.size();
    let filtered = state.testimonials.filter(func(t) { t.id != id });
    if (filtered.size() < before) {
      state.testimonials.clear();
      state.testimonials.append(filtered);
      true;
    } else false;
  };

  // --- Service ---
  public func listServices(state : State) : [Types.Service] {
    state.services.toArray();
  };

  public func addService(
    state : State,
    title : Text,
    description : Text,
    icon : Text,
    order : Nat,
  ) : Types.Service {
    let id = nextId(state);
    let svc : Types.Service = { id; title; description; icon; order };
    state.services.add(svc);
    svc;
  };

  public func updateService(state : State, svc : Types.Service) : Bool {
    switch (state.services.findIndex(func(s) { s.id == svc.id })) {
      case (?idx) { state.services.put(idx, svc); true };
      case null false;
    };
  };

  public func deleteService(state : State, id : Nat) : Bool {
    let before = state.services.size();
    let filtered = state.services.filter(func(s) { s.id != id });
    if (filtered.size() < before) {
      state.services.clear();
      state.services.append(filtered);
      true;
    } else false;
  };

  // --- SiteSettings ---
  public func getSettings(state : State) : Types.SiteSettings {
    state.settings;
  };

  public func updateSettings(state : State, s : Types.SiteSettings) {
    state.settings := s;
  };

  // --- ContactMessage ---
  public func saveContactMessage(
    state : State,
    name : Text,
    email : Text,
    service : Text,
    budget : Text,
    message : Text,
    createdAt : Int,
  ) : Types.ContactMessage {
    let id = nextId(state);
    let msg : Types.ContactMessage = { id; name; email; service; budget; message; createdAt };
    state.contactMessages.add(msg);
    msg;
  };

  public func listContactMessages(state : State) : [Types.ContactMessage] {
    state.contactMessages.toArray();
  };
};
