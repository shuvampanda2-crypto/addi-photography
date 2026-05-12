import PortfolioLib "../lib/portfolio";
import AdminLib "../lib/admin";
import Types "../types/portfolio";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

mixin (state : PortfolioLib.State, adminState : AdminLib.AdminState) {
  // --- PortfolioItem queries ---
  public query func listPortfolioItems() : async [Types.PortfolioItem] {
    PortfolioLib.listPortfolioItems(state);
  };

  public query func listPortfolioItemsByCategory(category : Text) : async [Types.PortfolioItem] {
    PortfolioLib.listPortfolioItemsByCategory(state, category);
  };

  public query func getPortfolioItem(id : Nat) : async ?Types.PortfolioItem {
    PortfolioLib.getPortfolioItem(state, id);
  };

  // --- PortfolioItem updates ---
  public shared ({ caller }) func addPortfolioItem(
    title : Text,
    category : Text,
    imageUrl : Text,
    description : Text,
    featured : Bool,
    order : Nat,
  ) : async Types.PortfolioItem {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.addPortfolioItem(state, title, category, imageUrl, description, featured, order);
  };

  public shared ({ caller }) func updatePortfolioItem(item : Types.PortfolioItem) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.updatePortfolioItem(state, item);
  };

  public shared ({ caller }) func toggleFeaturedPortfolioItem(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.toggleFeaturedPortfolioItem(state, id);
  };

  public shared ({ caller }) func deletePortfolioItem(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.deletePortfolioItem(state, id);
  };

  // --- GalleryImage queries ---
  public query func listGalleryImages() : async [Types.GalleryImage] {
    PortfolioLib.listGalleryImages(state);
  };

  // --- GalleryImage updates ---
  public shared ({ caller }) func addGalleryImage(
    imageUrl : Text,
    title : Text,
    order : Nat,
  ) : async Types.GalleryImage {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.addGalleryImage(state, imageUrl, title, order);
  };

  public shared ({ caller }) func updateGalleryImage(image : Types.GalleryImage) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.updateGalleryImage(state, image);
  };

  public shared ({ caller }) func deleteGalleryImage(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.deleteGalleryImage(state, id);
  };

  // --- BlogPost queries ---
  public query func listBlogPosts() : async [Types.BlogPost] {
    PortfolioLib.listBlogPosts(state);
  };

  public query func listPublishedBlogPosts() : async [Types.BlogPost] {
    PortfolioLib.listPublishedBlogPosts(state);
  };

  public query func listBlogPostsByCategory(category : Text) : async [Types.BlogPost] {
    PortfolioLib.listBlogPostsByCategory(state, category);
  };

  public query func getBlogPost(id : Nat) : async ?Types.BlogPost {
    PortfolioLib.getBlogPost(state, id);
  };

  // --- BlogPost updates ---
  public shared ({ caller }) func addBlogPost(
    title : Text,
    category : Text,
    excerpt : Text,
    imageUrl : Text,
    content : Text,
    date : Text,
    published : Bool,
  ) : async Types.BlogPost {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.addBlogPost(state, title, category, excerpt, imageUrl, content, date, published);
  };

  public shared ({ caller }) func updateBlogPost(post : Types.BlogPost) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.updateBlogPost(state, post);
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.deleteBlogPost(state, id);
  };

  // --- Testimonial queries ---
  public query func listTestimonials() : async [Types.Testimonial] {
    PortfolioLib.listTestimonials(state);
  };

  // --- Testimonial updates ---
  public shared ({ caller }) func addTestimonial(
    clientName : Text,
    clientImage : Text,
    review : Text,
    rating : Nat,
    order : Nat,
  ) : async Types.Testimonial {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.addTestimonial(state, clientName, clientImage, review, rating, order);
  };

  public shared ({ caller }) func updateTestimonial(t : Types.Testimonial) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.updateTestimonial(state, t);
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.deleteTestimonial(state, id);
  };

  // --- Service queries ---
  public query func listServices() : async [Types.Service] {
    PortfolioLib.listServices(state);
  };

  // --- Service updates ---
  public shared ({ caller }) func addService(
    title : Text,
    description : Text,
    icon : Text,
    order : Nat,
  ) : async Types.Service {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.addService(state, title, description, icon, order);
  };

  public shared ({ caller }) func updateService(svc : Types.Service) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.updateService(state, svc);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.deleteService(state, id);
  };

  // --- SiteSettings ---
  public query func getSettings() : async Types.SiteSettings {
    PortfolioLib.getSettings(state);
  };

  public shared ({ caller }) func updateSettings(s : Types.SiteSettings) : async () {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.updateSettings(state, s);
  };

  // --- ContactMessage ---
  public shared ({ caller }) func saveContactMessage(
    name : Text,
    email : Text,
    service : Text,
    budget : Text,
    message : Text,
  ) : async Types.ContactMessage {
    PortfolioLib.saveContactMessage(state, name, email, service, budget, message, Time.now());
  };

  public query ({ caller }) func listContactMessages() : async [Types.ContactMessage] {
    if (not AdminLib.isAdmin(adminState, caller)) Runtime.trap("Unauthorized");
    PortfolioLib.listContactMessages(state);
  };
};
