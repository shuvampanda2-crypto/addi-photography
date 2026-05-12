module {
  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    service : Text;
    budget : Text;
    message : Text;
    createdAt : Int;
  };

  public type PortfolioItem = {
    id : Nat;
    title : Text;
    category : Text;
    imageUrl : Text;
    description : Text;
    featured : Bool;
    order : Nat;
  };

  public type GalleryImage = {
    id : Nat;
    imageUrl : Text;
    title : Text;
    order : Nat;
  };

  public type BlogPost = {
    id : Nat;
    title : Text;
    category : Text;
    excerpt : Text;
    imageUrl : Text;
    content : Text;
    date : Text;
    published : Bool;
  };

  public type Testimonial = {
    id : Nat;
    clientName : Text;
    clientImage : Text;
    review : Text;
    rating : Nat;
    order : Nat;
  };

  public type Service = {
    id : Nat;
    title : Text;
    description : Text;
    icon : Text;
    order : Nat;
  };

  public type SiteSettings = {
    businessName : Text;
    tagline : Text;
    email : Text;
    phone : Text;
    address : Text;
    instagram : Text;
    facebook : Text;
    twitter : Text;
    youtube : Text;
    heroHeading : Text;
    heroSubheading : Text;
    aboutText : Text;
    aboutImage : Text;
    yearsExp : Nat;
    happyClients : Nat;
    projectsCompleted : Nat;
    awards : Nat;
  };
};
