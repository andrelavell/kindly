// Auto-generated file - DO NOT EDIT
import { Store } from '../types';

export const categories = [
  "Major Retailers",
  "Fashion & Apparel",
  "Electronics & Tech",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Toys & Games",
  "Pet Supplies",
  "Food & Beverage",
  "Books & Media",
  "Jewelry & Accessories",
  "Art & Crafts",
  "Office Supplies",
  "Travel",
  "Auto & Parts",
  "Baby & Kids"
];

// Helper function to get store logo URL
export const getStoreLogo = async (store: Store): Promise<string | null> => {
  if (store.cloudinaryLogo) {
    return store.cloudinaryLogo;
  }

  // Fallback to first letter if no logo
  return null;
};

// Helper function to search stores
export const searchStores = (query: string, category?: string): Store[] => {
  let filtered = stores;

  if (category) {
    filtered = filtered.filter(store => store.category === category);
  }

  if (query) {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter(store => 
      store.name.toLowerCase().includes(searchQuery) ||
      store.category.toLowerCase().includes(searchQuery)
    );
  }

  return filtered;
};

export const stores: Store[] = [
  {
    "name": "Amazon",
    "category": "Major Retailers",
    "popular": true,
    "domain": "amazon.com",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736048698/kindly/store-logos/stores/amazon.ico"
  },
  {
    "name": "Walmart",
    "category": "Major Retailers",
    "popular": true,
    "domain": "walmart.com",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736048697/kindly/store-logos/stores/walmart.ico"
  },
  {
    "name": "Target",
    "category": "Major Retailers",
    "popular": true,
    "domain": "target.com",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736048697/kindly/store-logos/stores/target.png"
  },
  {
    "name": "Costco",
    "category": "Major Retailers",
    "popular": true,
    "domain": "costco.com"
  },
  {
    "name": "eBay",
    "category": "Major Retailers",
    "popular": true,
    "domain": "ebay.com",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736048697/kindly/store-logos/stores/ebay.ico"
  },
  {
    "name": "Sam's Club",
    "category": "Major Retailers",
    "popular": true,
    "domain": "samsclub.com"
  },
  {
    "name": "Kohl's",
    "category": "Major Retailers",
    "popular": true
  },
  {
    "name": "BJ's Wholesale Club",
    "category": "Major Retailers",
    "domain": "bjs.com",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736048950/kindly/store-logos/stores/bj-s-wholesale-club.ico"
  },
  {
    "name": "Big Lots",
    "category": "Major Retailers"
  },
  {
    "name": "Dollar General",
    "category": "Major Retailers"
  },
  {
    "name": "Family Dollar",
    "category": "Major Retailers"
  },
  {
    "name": "Five Below",
    "category": "Major Retailers"
  },
  {
    "name": "Dollar Tree",
    "category": "Major Retailers"
  },
  {
    "name": "JCPenney",
    "category": "Major Retailers"
  },
  {
    "name": "Marshalls",
    "category": "Major Retailers",
    "popular": true
  },
  {
    "name": "TJ Maxx",
    "category": "Major Retailers",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736048985/kindly/store-logos/stores/tj-maxx.ico"
  },
  {
    "name": "HomeGoods",
    "category": "Major Retailers",
    "popular": true
  },
  {
    "name": "Ross",
    "category": "Major Retailers"
  },
  {
    "name": "Burlington",
    "category": "Major Retailers",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049020/kindly/store-logos/stores/burlington.ico"
  },
  {
    "name": "Tuesday Morning",
    "category": "Major Retailers"
  },
  {
    "name": "Nike",
    "category": "Fashion & Apparel",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049023/kindly/store-logos/stores/nike.ico"
  },
  {
    "name": "Adidas",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "H&M",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Zara",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Uniqlo",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "ASOS",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "The North Face",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Levi's",
    "category": "Fashion & Apparel",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049060/kindly/store-logos/stores/levi-s.ico"
  },
  {
    "name": "Urban Outfitters",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Patagonia",
    "category": "Fashion & Apparel"
  },
  {
    "name": "Gap",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Old Navy",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Banana Republic",
    "category": "Fashion & Apparel"
  },
  {
    "name": "Forever 21",
    "category": "Fashion & Apparel"
  },
  {
    "name": "Macy's",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Nordstrom",
    "category": "Fashion & Apparel",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049102/kindly/store-logos/stores/nordstrom.ico"
  },
  {
    "name": "J.Crew",
    "category": "Fashion & Apparel"
  },
  {
    "name": "Anthropologie",
    "category": "Fashion & Apparel",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049106/kindly/store-logos/stores/anthropologie.ico"
  },
  {
    "name": "Puma",
    "category": "Fashion & Apparel"
  },
  {
    "name": "Under Armour",
    "category": "Fashion & Apparel",
    "popular": true
  },
  {
    "name": "Best Buy",
    "category": "Electronics & Tech",
    "popular": true
  },
  {
    "name": "Apple",
    "category": "Electronics & Tech",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049117/kindly/store-logos/stores/apple.ico"
  },
  {
    "name": "Samsung",
    "category": "Electronics & Tech",
    "popular": true
  },
  {
    "name": "Microsoft",
    "category": "Electronics & Tech",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049134/kindly/store-logos/stores/microsoft.ico"
  },
  {
    "name": "Dell",
    "category": "Electronics & Tech",
    "popular": true
  },
  {
    "name": "HP",
    "category": "Electronics & Tech",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049137/kindly/store-logos/stores/hp.ico"
  },
  {
    "name": "Lenovo",
    "category": "Electronics & Tech",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049141/kindly/store-logos/stores/lenovo.gif"
  },
  {
    "name": "Newegg",
    "category": "Electronics & Tech",
    "popular": true
  },
  {
    "name": "B&H Photo",
    "category": "Electronics & Tech"
  },
  {
    "name": "GameStop",
    "category": "Electronics & Tech",
    "popular": true
  },
  {
    "name": "Bose",
    "category": "Electronics & Tech",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049159/kindly/store-logos/stores/bose.ico"
  },
  {
    "name": "Sony",
    "category": "Electronics & Tech",
    "popular": true
  },
  {
    "name": "LG",
    "category": "Electronics & Tech",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049164/kindly/store-logos/stores/lg.ico"
  },
  {
    "name": "Razer",
    "category": "Electronics & Tech",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049163/kindly/store-logos/stores/razer.ico"
  },
  {
    "name": "Logitech",
    "category": "Electronics & Tech",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049167/kindly/store-logos/stores/logitech.ico"
  },
  {
    "name": "Wayfair",
    "category": "Home & Garden",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049167/kindly/store-logos/stores/wayfair.ico"
  },
  {
    "name": "IKEA",
    "category": "Home & Garden",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049171/kindly/store-logos/stores/ikea.ico"
  },
  {
    "name": "Home Depot",
    "category": "Home & Garden",
    "popular": true
  },
  {
    "name": "Lowe's",
    "category": "Home & Garden",
    "popular": true
  },
  {
    "name": "Bed Bath & Beyond",
    "category": "Home & Garden",
    "popular": true
  },
  {
    "name": "Crate & Barrel",
    "category": "Home & Garden",
    "popular": true
  },
  {
    "name": "West Elm",
    "category": "Home & Garden"
  },
  {
    "name": "Pottery Barn",
    "category": "Home & Garden",
    "popular": true
  },
  {
    "name": "Williams Sonoma",
    "category": "Home & Garden",
    "popular": true
  },
  {
    "name": "Restoration Hardware",
    "category": "Home & Garden"
  },
  {
    "name": "The Container Store",
    "category": "Home & Garden"
  },
  {
    "name": "Five Star",
    "category": "Home & Garden"
  },
  {
    "name": "Poppin",
    "category": "Home & Garden"
  },
  {
    "name": "Quill",
    "category": "Home & Garden",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049217/kindly/store-logos/stores/quill.ico"
  },
  {
    "name": "School Specialty",
    "category": "Home & Garden"
  },
  {
    "name": "Mead",
    "category": "Home & Garden"
  },
  {
    "name": "Post-it",
    "category": "Home & Garden"
  },
  {
    "name": "Moleskine",
    "category": "Home & Garden",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049235/kindly/store-logos/stores/moleskine.ico"
  },
  {
    "name": "Sephora",
    "category": "Health & Beauty",
    "popular": true
  },
  {
    "name": "Ulta Beauty",
    "category": "Health & Beauty",
    "popular": true
  },
  {
    "name": "MAC Cosmetics",
    "category": "Health & Beauty"
  },
  {
    "name": "Bath & Body Works",
    "category": "Health & Beauty"
  },
  {
    "name": "The Body Shop",
    "category": "Health & Beauty"
  },
  {
    "name": "Dermstore",
    "category": "Health & Beauty"
  },
  {
    "name": "Glossier",
    "category": "Health & Beauty"
  },
  {
    "name": "Fenty Beauty",
    "category": "Health & Beauty"
  },
  {
    "name": "Charlotte Tilbury",
    "category": "Health & Beauty"
  },
  {
    "name": "Kiehl's",
    "category": "Health & Beauty"
  },
  {
    "name": "Origins",
    "category": "Health & Beauty",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049265/kindly/store-logos/stores/origins.ico"
  },
  {
    "name": "Clinique",
    "category": "Health & Beauty",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049268/kindly/store-logos/stores/clinique.ico"
  },
  {
    "name": "Estée Lauder",
    "category": "Health & Beauty"
  },
  {
    "name": "NYX Cosmetics",
    "category": "Health & Beauty"
  },
  {
    "name": "Morphe",
    "category": "Health & Beauty"
  },
  {
    "name": "Expedia",
    "category": "Travel & Leisure",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049275/kindly/store-logos/stores/expedia.ico"
  },
  {
    "name": "Booking.com",
    "category": "Travel & Leisure",
    "popular": true
  },
  {
    "name": "Hotels.com",
    "category": "Travel & Leisure"
  },
  {
    "name": "Airbnb",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049281/kindly/store-logos/stores/airbnb.ico"
  },
  {
    "name": "Vrbo",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049284/kindly/store-logos/stores/vrbo.ico"
  },
  {
    "name": "Kayak",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049284/kindly/store-logos/stores/kayak.ico"
  },
  {
    "name": "Priceline",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049288/kindly/store-logos/stores/priceline.ico"
  },
  {
    "name": "Travelocity",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049287/kindly/store-logos/stores/travelocity.ico"
  },
  {
    "name": "Hotwire",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049294/kindly/store-logos/stores/hotwire.ico"
  },
  {
    "name": "Orbitz",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049291/kindly/store-logos/stores/orbitz.ico"
  },
  {
    "name": "TripAdvisor",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049297/kindly/store-logos/stores/tripadvisor.ico"
  },
  {
    "name": "Agoda",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049298/kindly/store-logos/stores/agoda.png"
  },
  {
    "name": "Hopper",
    "category": "Travel & Leisure",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049301/kindly/store-logos/stores/hopper.ico"
  },
  {
    "name": "CheapOair",
    "category": "Travel & Leisure"
  },
  {
    "name": "Southwest Airlines",
    "category": "Travel & Leisure"
  },
  {
    "name": "Gucci",
    "category": "Luxury",
    "popular": true
  },
  {
    "name": "Louis Vuitton",
    "category": "Luxury",
    "popular": true
  },
  {
    "name": "Burberry",
    "category": "Luxury"
  },
  {
    "name": "Prada",
    "category": "Luxury",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049332/kindly/store-logos/stores/prada.ico"
  },
  {
    "name": "Chanel",
    "category": "Luxury"
  },
  {
    "name": "Hermès",
    "category": "Luxury"
  },
  {
    "name": "Cartier",
    "category": "Luxury"
  },
  {
    "name": "Tiffany & Co",
    "category": "Luxury"
  },
  {
    "name": "Rolex",
    "category": "Luxury"
  },
  {
    "name": "Omega",
    "category": "Luxury",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049376/kindly/store-logos/stores/omega.ico"
  },
  {
    "name": "Tag Heuer",
    "category": "Luxury"
  },
  {
    "name": "Bulgari",
    "category": "Luxury"
  },
  {
    "name": "Saint Laurent",
    "category": "Luxury"
  },
  {
    "name": "Balenciaga",
    "category": "Luxury",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049393/kindly/store-logos/stores/balenciaga.ico"
  },
  {
    "name": "Fendi",
    "category": "Luxury",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049393/kindly/store-logos/stores/fendi.ico"
  },
  {
    "name": "Chewy",
    "category": "Pet Supplies",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049396/kindly/store-logos/stores/chewy.ico"
  },
  {
    "name": "PetSmart",
    "category": "Pet Supplies",
    "popular": true
  },
  {
    "name": "Petco",
    "category": "Pet Supplies"
  },
  {
    "name": "BarkBox",
    "category": "Pet Supplies"
  },
  {
    "name": "Rover",
    "category": "Pet Supplies"
  },
  {
    "name": "Wag",
    "category": "Pet Supplies"
  },
  {
    "name": "Pet Supplies Plus",
    "category": "Pet Supplies"
  },
  {
    "name": "1800PetMeds",
    "category": "Pet Supplies",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049415/kindly/store-logos/stores/1800petmeds.ico"
  },
  {
    "name": "PetFlow",
    "category": "Pet Supplies",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049419/kindly/store-logos/stores/petflow.png"
  },
  {
    "name": "PetPlate",
    "category": "Pet Supplies",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049419/kindly/store-logos/stores/petplate.ico"
  },
  {
    "name": "AutoZone",
    "category": "Automotive",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049422/kindly/store-logos/stores/autozone.ico"
  },
  {
    "name": "O'Reilly Auto Parts",
    "category": "Automotive"
  },
  {
    "name": "Advance Auto Parts",
    "category": "Automotive"
  },
  {
    "name": "NAPA Auto Parts",
    "category": "Automotive"
  },
  {
    "name": "CarParts.com",
    "category": "Automotive"
  },
  {
    "name": "TireRack",
    "category": "Automotive"
  },
  {
    "name": "Pep Boys",
    "category": "Automotive"
  },
  {
    "name": "JC Whitney",
    "category": "Automotive"
  },
  {
    "name": "RockAuto",
    "category": "Automotive",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049468/kindly/store-logos/stores/rockauto.ico"
  },
  {
    "name": "4 Wheel Parts",
    "category": "Automotive"
  },
  {
    "name": "Staples",
    "category": "Office & School",
    "popular": true
  },
  {
    "name": "Office Depot",
    "category": "Office & School",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049472/kindly/store-logos/stores/office-depot.gif"
  },
  {
    "name": "The Container Store",
    "category": "Office & School"
  },
  {
    "name": "Five Star",
    "category": "Office & School"
  },
  {
    "name": "Poppin",
    "category": "Office & School"
  },
  {
    "name": "Quill",
    "category": "Office & School",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049217/kindly/store-logos/stores/quill.ico"
  },
  {
    "name": "School Specialty",
    "category": "Office & School"
  },
  {
    "name": "Mead",
    "category": "Office & School"
  },
  {
    "name": "Post-it",
    "category": "Office & School"
  },
  {
    "name": "Moleskine",
    "category": "Office & School",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049235/kindly/store-logos/stores/moleskine.ico"
  },
  {
    "name": "Buy Buy Baby",
    "category": "Baby & Kids",
    "popular": true
  },
  {
    "name": "Carter's",
    "category": "Baby & Kids",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049500/kindly/store-logos/stores/carter-s.ico"
  },
  {
    "name": "The Children's Place",
    "category": "Baby & Kids"
  },
  {
    "name": "Gymboree",
    "category": "Baby & Kids",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049504/kindly/store-logos/stores/gymboree.png"
  },
  {
    "name": "OshKosh B'gosh",
    "category": "Baby & Kids"
  },
  {
    "name": "Pottery Barn Kids",
    "category": "Baby & Kids"
  },
  {
    "name": "Melissa & Doug",
    "category": "Baby & Kids"
  },
  {
    "name": "Hanna Andersson",
    "category": "Baby & Kids"
  },
  {
    "name": "Primary",
    "category": "Baby & Kids"
  },
  {
    "name": "Janie and Jack",
    "category": "Baby & Kids"
  },
  {
    "name": "Pandora",
    "category": "Jewelry & Accessories",
    "popular": true,
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049539/kindly/store-logos/stores/pandora.ico"
  },
  {
    "name": "Kay Jewelers",
    "category": "Jewelry & Accessories",
    "popular": true
  },
  {
    "name": "Swarovski",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "Alex and Ani",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "Blue Nile",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "James Allen",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "Brilliant Earth",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "David Yurman",
    "category": "Jewelry & Accessories",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049563/kindly/store-logos/stores/david-yurman.ico"
  },
  {
    "name": "Mejuri",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "Monica Vinader",
    "category": "Jewelry & Accessories"
  },
  {
    "name": "Barnes & Noble",
    "category": "Books & Media",
    "popular": true
  },
  {
    "name": "Books A Million",
    "category": "Books & Media"
  },
  {
    "name": "AbeBooks",
    "category": "Books & Media",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049574/kindly/store-logos/stores/abebooks.ico"
  },
  {
    "name": "ThriftBooks",
    "category": "Books & Media"
  },
  {
    "name": "Book Depository",
    "category": "Books & Media"
  },
  {
    "name": "Audible",
    "category": "Books & Media",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049578/kindly/store-logos/stores/audible.ico"
  },
  {
    "name": "Scribd",
    "category": "Books & Media"
  },
  {
    "name": "Half Price Books",
    "category": "Books & Media"
  },
  {
    "name": "Better World Books",
    "category": "Books & Media"
  },
  {
    "name": "Bookshop.org",
    "category": "Books & Media"
  },
  {
    "name": "Whole Foods",
    "category": "Food & Drink",
    "popular": true
  },
  {
    "name": "Wine.com",
    "category": "Food & Drink",
    "popular": true
  },
  {
    "name": "Blue Apron",
    "category": "Food & Drink"
  },
  {
    "name": "HelloFresh",
    "category": "Food & Drink",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049600/kindly/store-logos/stores/hellofresh.ico"
  },
  {
    "name": "Home Chef",
    "category": "Food & Drink"
  },
  {
    "name": "Drizly",
    "category": "Food & Drink"
  },
  {
    "name": "Total Wine",
    "category": "Food & Drink"
  },
  {
    "name": "Instacart",
    "category": "Food & Drink",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049625/kindly/store-logos/stores/instacart.png"
  },
  {
    "name": "FreshDirect",
    "category": "Food & Drink"
  },
  {
    "name": "Goldbelly",
    "category": "Food & Drink",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049628/kindly/store-logos/stores/goldbelly.ico"
  },
  {
    "name": "LEGO",
    "category": "Toys & Games",
    "popular": true
  },
  {
    "name": "Toys R Us",
    "category": "Toys & Games",
    "popular": true
  },
  {
    "name": "Build-A-Bear Workshop",
    "category": "Toys & Games"
  },
  {
    "name": "American Girl",
    "category": "Toys & Games"
  },
  {
    "name": "Hasbro",
    "category": "Toys & Games"
  },
  {
    "name": "Mattel",
    "category": "Toys & Games",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049670/kindly/store-logos/stores/mattel.ico"
  },
  {
    "name": "Nintendo",
    "category": "Toys & Games",
    "cloudinaryLogo": "https://res.cloudinary.com/dvgf0xsjq/image/upload/v1736049674/kindly/store-logos/stores/nintendo.ico"
  },
  {
    "name": "Pokemon Center",
    "category": "Toys & Games"
  },
  {
    "name": "Hot Topic",
    "category": "Toys & Games"
  },
  {
    "name": "ThinkGeek",
    "category": "Toys & Games"
  },
  {
    "name": "REI",
    "category": "Sports & Outdoors",
    "popular": true
  },
  {
    "name": "Dick's Sporting Goods",
    "category": "Sports & Outdoors",
    "popular": true
  },
  {
    "name": "Bass Pro Shops",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Cabela's",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Academy Sports",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Backcountry",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Moosejaw",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Steep & Cheap",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Sierra Trading Post",
    "category": "Sports & Outdoors"
  },
  {
    "name": "Eastern Mountain Sports",
    "category": "Sports & Outdoors"
  }
];
