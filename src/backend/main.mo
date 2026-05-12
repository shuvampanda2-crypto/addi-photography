import List "mo:core/List";
import Set "mo:core/Set";
import PortfolioLib "lib/portfolio";
import AdminLib "lib/admin";
import PortfolioApi "mixins/portfolio-api";
import AdminApi "mixins/admin-api";
import Types "types/portfolio";
import Common "types/common";

actor {
  // Admin state
  let admins = Set.empty<Common.UserId>();
  let adminState : AdminLib.AdminState = { admins };

  // Portfolio state
  let portfolioItems = List.empty<Types.PortfolioItem>();
  let galleryImages = List.empty<Types.GalleryImage>();
  let blogPosts = List.empty<Types.BlogPost>();
  let testimonials = List.empty<Types.Testimonial>();
  let services = List.empty<Types.Service>();
  let contactMessages = List.empty<Types.ContactMessage>();
  let state : PortfolioLib.State = {
    portfolioItems;
    galleryImages;
    blogPosts;
    testimonials;
    services;
    contactMessages;
    var settings = {
      businessName = "Addi Photography";
      tagline = "Capturing timeless stories through cinematic photography";
      email = "addiphotographybjevents@gmail.com";
      phone = "+91 8249723248";
      address = "CDA Sector 13 Cuttack Odisha";
      instagram = "";
      facebook = "";
      twitter = "";
      youtube = "";
      heroHeading = "Capturing Moments, Creating Memories";
      heroSubheading = "Award-winning cinematic photography for weddings, portraits & more";
      aboutText = "I am a passionate photographer dedicated to telling authentic stories through the lens. With years of experience in cinematic and editorial photography, I bring artistry and precision to every shoot.";
      aboutImage = "";
      yearsExp = 10;
      happyClients = 100;
      projectsCompleted = 800;
      awards = 24;
    };
    var nextId = 1;
    var initialized = false;
  };

  // Populate sample data on first load
  PortfolioLib.initSampleData(state);

  include PortfolioApi(state, adminState);
  include AdminApi(adminState);
};
