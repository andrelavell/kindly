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

// Helper function to get store logo URL using Clearbit
export const getStoreLogo = async (store: Store): Promise<string | null> => {
  if (store.domain) {
    return `https://logo.clearbit.com/${store.domain}`;
  }

  // Format domain from store name
  const domain = store.name.toLowerCase()
    .replace(/[&']/g, '') // Remove & and '
    .replace(/[\s.-]+/g, '-') // Replace spaces, dots, and hyphens with a single hyphen
    .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
    + '.com';

  return `https://logo.clearbit.com/${domain}`;
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
    "domain": "amazon.com"
  },
  {
    "name": "Walmart",
    "category": "Major Retailers",
    "popular": true,
    "domain": "walmart.com"
  },
  {
    "name": "Target",
    "category": "Major Retailers",
    "popular": true,
    "domain": "target.com"
  },
  {
    "name": "Best Buy",
    "category": "Electronics & Tech",
    "popular": true,
    "domain": "bestbuy.com"
  },
  {
    "name": "Apple",
    "category": "Electronics & Tech",
    "popular": true,
    "domain": "apple.com"
  },
  {
    "name": "Nike",
    "category": "Fashion & Apparel",
    "popular": true,
    "domain": "nike.com"
  },
  {
    "name": "Adidas",
    "category": "Fashion & Apparel",
    "popular": true,
    "domain": "adidas.com"
  },
  {
    "name": "H&M",
    "category": "Fashion & Apparel",
    "popular": true,
    "domain": "hm.com"
  },
  {
    "name": "Wayfair",
    "category": "Home & Garden",
    "popular": true,
    "domain": "wayfair.com"
  },
  {
    "name": "Home Depot",
    "category": "Home & Garden",
    "popular": true,
    "domain": "homedepot.com"
  },
  {
    "name": "Lowe's",
    "category": "Home & Garden",
    "popular": true,
    "domain": "lowes.com"
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
    "domain": "ebay.com"
  },
  {
    "name": "Etsy",
    "category": "Major Retailers",
    "popular": true,
    "domain": "etsy.com"
  },
  {
    "name": "Sephora",
    "category": "Health & Beauty",
    "popular": true,
    "domain": "sephora.com"
  },
  {
    "name": "Ulta Beauty",
    "category": "Health & Beauty",
    "popular": true,
    "domain": "ulta.com"
  },
  {
    "name": "Chewy",
    "category": "Pet Supplies",
    "popular": true,
    "domain": "chewy.com"
  },
  {
    "name": "GameStop",
    "category": "Toys & Games",
    "popular": true,
    "domain": "gamestop.com"
  },
  {
    "name": "Expedia",
    "category": "Travel",
    "popular": true,
    "domain": "expedia.com"
  },
  {
    "name": "Booking.com",
    "category": "Travel",
    "popular": true,
    "domain": "booking.com"
  },
  {
    "name": "Airbnb",
    "category": "Travel",
    "popular": true,
    "domain": "airbnb.com"
  },
  {
    "name": "Dell",
    "category": "Electronics & Tech",
    "popular": true,
    "domain": "dell.com"
  },
  {
    "name": "Samsung",
    "category": "Electronics & Tech",
    "popular": true,
    "domain": "samsung.com"
  },
  {
    "name": "Nordstrom",
    "category": "Fashion & Apparel",
    "popular": true,
    "domain": "nordstrom.com"
  },
  {
    "name": "Macy's",
    "category": "Fashion & Apparel",
    "popular": true,
    "domain": "macys.com"
  },
  {
    "name": "Sam's Club",
    "category": "Major Retailers",
    "domain": "samsclub.com"
  },
  {
    "name": "Kohl's",
    "category": "Major Retailers",
    "domain": "kohls.com"
  },
  {
    "name": "BJ's Wholesale Club",
    "category": "Major Retailers",
    "domain": "bjs.com"
  },
  {
    "name": "Big Lots",
    "category": "Major Retailers",
    "domain": "biglots.com"
  },
  {
    "name": "Dollar General",
    "category": "Major Retailers",
    "domain": "dollargeneral.com"
  },
  {
    "name": "Family Dollar",
    "category": "Major Retailers",
    "domain": "familydollar.com"
  },
  {
    "name": "Five Below",
    "category": "Major Retailers",
    "domain": "fivebelow.com"
  },
  {
    "name": "Dollar Tree",
    "category": "Major Retailers",
    "domain": "dollartree.com"
  },
  {
    "name": "JCPenney",
    "category": "Major Retailers",
    "domain": "jcpenney.com"
  },
  {
    "name": "Marshalls",
    "category": "Major Retailers",
    "domain": "marshalls.com"
  },
  {
    "name": "TJ Maxx",
    "category": "Major Retailers",
    "domain": "tjmaxx.com"
  },
  {
    "name": "HomeGoods",
    "category": "Major Retailers",
    "domain": "homegoods.com"
  },
  {
    "name": "Ross",
    "category": "Major Retailers",
    "domain": "ross.com"
  },
  {
    "name": "Burlington",
    "category": "Major Retailers",
    "domain": "burlington.com"
  },
  {
    "name": "Tuesday Morning",
    "category": "Major Retailers",
    "domain": "tuesdaymorning.com"
  },
  {
    "name": "Uniqlo",
    "category": "Fashion & Apparel",
    "domain": "uniqlo.com"
  },
  {
    "name": "ASOS",
    "category": "Fashion & Apparel",
    "domain": "asos.com"
  },
  {
    "name": "The North Face",
    "category": "Fashion & Apparel",
    "domain": "thenorthface.com"
  },
  {
    "name": "Levi's",
    "category": "Fashion & Apparel",
    "domain": "levis.com"
  },
  {
    "name": "Urban Outfitters",
    "category": "Fashion & Apparel",
    "domain": "urbanoutfitters.com"
  },
  {
    "name": "Patagonia",
    "category": "Fashion & Apparel",
    "domain": "patagonia.com"
  },
  {
    "name": "Gap",
    "category": "Fashion & Apparel",
    "domain": "gap.com"
  },
  {
    "name": "Old Navy",
    "category": "Fashion & Apparel",
    "domain": "oldnavy.com"
  },
  {
    "name": "Banana Republic",
    "category": "Fashion & Apparel",
    "domain": "bananarepublic.com"
  },
  {
    "name": "Forever 21",
    "category": "Fashion & Apparel",
    "domain": "forever21.com"
  },
  {
    "name": "Microsoft",
    "category": "Electronics & Tech",
    "domain": "microsoft.com"
  },
  {
    "name": "HP",
    "category": "Electronics & Tech",
    "domain": "hp.com"
  },
  {
    "name": "Lenovo",
    "category": "Electronics & Tech",
    "domain": "lenovo.com"
  },
  {
    "name": "Sony",
    "category": "Electronics & Tech",
    "domain": "sony.com"
  },
  {
    "name": "LG",
    "category": "Electronics & Tech",
    "domain": "lg.com"
  },
  {
    "name": "Bose",
    "category": "Electronics & Tech",
    "domain": "bose.com"
  },
  {
    "name": "Newegg",
    "category": "Electronics & Tech",
    "domain": "newegg.com"
  },
  {
    "name": "IKEA",
    "category": "Home & Garden",
    "domain": "ikea.com"
  },
  {
    "name": "Bed Bath & Beyond",
    "category": "Home & Garden",
    "domain": "bedbathandbeyond.com"
  },
  {
    "name": "Crate & Barrel",
    "category": "Home & Garden",
    "domain": "crateandbarrel.com"
  },
  {
    "name": "West Elm",
    "category": "Home & Garden",
    "domain": "westelm.com"
  },
  {
    "name": "Pottery Barn",
    "category": "Home & Garden",
    "domain": "potterybarn.com"
  },
  {
    "name": "Williams Sonoma",
    "category": "Home & Garden",
    "domain": "williams-sonoma.com"
  },
  {
    "name": "Restoration Hardware",
    "category": "Home & Garden",
    "domain": "restorationhardware.com"
  },
  {
    "name": "The Container Store",
    "category": "Home & Garden",
    "domain": "containerstore.com"
  },
  {
    "name": "Five Star",
    "category": "Home & Garden",
    "domain": "fivestars.com"
  },
  {
    "name": "Poppin",
    "category": "Home & Garden",
    "domain": "poppin.com"
  },
  {
    "name": "Quill",
    "category": "Home & Garden",
    "domain": "quill.com"
  },
  {
    "name": "School Specialty",
    "category": "Home & Garden",
    "domain": "schoolspecialty.com"
  },
  {
    "name": "Mead",
    "category": "Home & Garden",
    "domain": "mead.com"
  },
  {
    "name": "Post-it",
    "category": "Home & Garden",
    "domain": "post-it.com"
  },
  {
    "name": "Moleskine",
    "category": "Home & Garden",
    "domain": "moleskine.com"
  },
  {
    "name": "Overstock",
    "category": "Home & Garden",
    "domain": "overstock.com"
  },
  {
    "name": "Sur La Table",
    "category": "Home & Garden",
    "domain": "surlatable.com"
  },
  {
    "name": "Dyson",
    "category": "Home & Garden",
    "domain": "dyson.com"
  },
  {
    "name": "iRobot",
    "category": "Home & Garden",
    "domain": "irobot.com"
  },
  {
    "name": "Shark",
    "category": "Home & Garden",
    "domain": "sharkclean.com"
  },
  {
    "name": "Ninja Kitchen",
    "category": "Home & Garden",
    "domain": "ninjakitchen.com"
  },
  {
    "name": "KitchenAid",
    "category": "Home & Garden",
    "domain": "kitchenaid.com"
  },
  {
    "name": "Instant Pot",
    "category": "Home & Garden",
    "domain": "instantbrands.com"
  },
  {
    "name": "Vitamix",
    "category": "Home & Garden",
    "domain": "vitamix.com"
  },
  {
    "name": "Nutribullet",
    "category": "Home & Garden",
    "domain": "nutribullet.com"
  },
  {
    "name": "Breville",
    "category": "Home & Garden",
    "domain": "breville.com"
  },
  {
    "name": "Keurig",
    "category": "Home & Garden",
    "domain": "keurig.com"
  },
  {
    "name": "MAC Cosmetics",
    "category": "Health & Beauty",
    "domain": "maccosmetics.com"
  },
  {
    "name": "Bath & Body Works",
    "category": "Health & Beauty",
    "domain": "bathandbodyworks.com"
  },
  {
    "name": "The Body Shop",
    "category": "Health & Beauty",
    "domain": "thebodyshop.com"
  },
  {
    "name": "Dermstore",
    "category": "Health & Beauty",
    "domain": "dermstore.com"
  },
  {
    "name": "Glossier",
    "category": "Health & Beauty",
    "domain": "glossier.com"
  },
  {
    "name": "Fenty Beauty",
    "category": "Health & Beauty",
    "domain": "fentybeauty.com"
  },
  {
    "name": "Charlotte Tilbury",
    "category": "Health & Beauty",
    "domain": "charlottetilbury.com"
  },
  {
    "name": "Kiehl's",
    "category": "Health & Beauty",
    "domain": "kiehls.com"
  },
  {
    "name": "Origins",
    "category": "Health & Beauty",
    "domain": "origins.com"
  },
  {
    "name": "Clinique",
    "category": "Health & Beauty",
    "domain": "clinique.com"
  },
  {
    "name": "Estée Lauder",
    "category": "Health & Beauty",
    "domain": "esteelauder.com"
  },
  {
    "name": "NYX Cosmetics",
    "category": "Health & Beauty",
    "domain": "nyxcosmetics.com"
  },
  {
    "name": "Morphe",
    "category": "Health & Beauty",
    "domain": "morphe.com"
  },
  {
    "name": "Benefit Cosmetics",
    "category": "Health & Beauty",
    "domain": "benefitcosmetics.com"
  },
  {
    "name": "Urban Decay",
    "category": "Health & Beauty",
    "domain": "urbandecay.com"
  },
  {
    "name": "Too Faced",
    "category": "Health & Beauty",
    "domain": "toofaced.com"
  },
  {
    "name": "NARS",
    "category": "Health & Beauty",
    "domain": "narscosmetics.com"
  },
  {
    "name": "Hotels.com",
    "category": "Travel",
    "domain": "hotels.com"
  },
  {
    "name": "Vrbo",
    "category": "Travel",
    "domain": "vrbo.com"
  },
  {
    "name": "Kayak",
    "category": "Travel",
    "domain": "kayak.com"
  },
  {
    "name": "Priceline",
    "category": "Travel",
    "domain": "priceline.com"
  },
  {
    "name": "Travelocity",
    "category": "Travel",
    "domain": "travelocity.com"
  },
  {
    "name": "Hotwire",
    "category": "Travel",
    "domain": "hotwire.com"
  },
  {
    "name": "Orbitz",
    "category": "Travel",
    "domain": "orbitz.com"
  },
  {
    "name": "TripAdvisor",
    "category": "Travel",
    "domain": "tripadvisor.com"
  },
  {
    "name": "Agoda",
    "category": "Travel",
    "domain": "agoda.com"
  },
  {
    "name": "Hopper",
    "category": "Travel",
    "domain": "hopper.com"
  },
  {
    "name": "CheapOair",
    "category": "Travel",
    "domain": "cheapoair.com"
  },
  {
    "name": "Southwest Airlines",
    "category": "Travel",
    "domain": "southwest.com"
  },
  {
    "name": "Gucci",
    "category": "Luxury",
    "domain": "gucci.com"
  },
  {
    "name": "Louis Vuitton",
    "category": "Luxury",
    "domain": "louisvuitton.com"
  },
  {
    "name": "Burberry",
    "category": "Luxury",
    "domain": "burberry.com"
  },
  {
    "name": "Prada",
    "category": "Luxury",
    "domain": "prada.com"
  },
  {
    "name": "Chanel",
    "category": "Luxury",
    "domain": "chanel.com"
  },
  {
    "name": "Hermès",
    "category": "Luxury",
    "domain": "hermes.com"
  },
  {
    "name": "Cartier",
    "category": "Luxury",
    "domain": "cartier.com"
  },
  {
    "name": "Tiffany & Co",
    "category": "Luxury",
    "domain": "tiffany.com"
  },
  {
    "name": "Rolex",
    "category": "Luxury",
    "domain": "rolex.com"
  },
  {
    "name": "Omega",
    "category": "Luxury",
    "domain": "omegawatches.com"
  },
  {
    "name": "Tag Heuer",
    "category": "Luxury",
    "domain": "tagheuer.com"
  },
  {
    "name": "Bulgari",
    "category": "Luxury",
    "domain": "bulgari.com"
  },
  {
    "name": "Saint Laurent",
    "category": "Luxury",
    "domain": "ysl.com"
  },
  {
    "name": "Balenciaga",
    "category": "Luxury",
    "domain": "balenciaga.com"
  },
  {
    "name": "Fendi",
    "category": "Luxury",
    "domain": "fendi.com"
  },
  {
    "name": "PetSmart",
    "category": "Pet Supplies",
    "domain": "petsmart.com"
  },
  {
    "name": "Petco",
    "category": "Pet Supplies",
    "domain": "petco.com"
  },
  {
    "name": "BarkBox",
    "category": "Pet Supplies",
    "domain": "barkbox.com"
  },
  {
    "name": "Rover",
    "category": "Pet Supplies",
    "domain": "rover.com"
  },
  {
    "name": "Wag",
    "category": "Pet Supplies",
    "domain": "wag.com"
  },
  {
    "name": "Pet Supplies Plus",
    "category": "Pet Supplies",
    "domain": "petsuppliesplus.com"
  },
  {
    "name": "1800PetMeds",
    "category": "Pet Supplies",
    "domain": "1800petmeds.com"
  },
  {
    "name": "PetFlow",
    "category": "Pet Supplies",
    "domain": "petflow.com"
  },
  {
    "name": "PetPlate",
    "category": "Pet Supplies",
    "domain": "petplate.com"
  },
  {
    "name": "AutoZone",
    "category": "Auto & Parts",
    "domain": "autozone.com"
  },
  {
    "name": "O'Reilly Auto Parts",
    "category": "Auto & Parts",
    "domain": "oreillyauto.com"
  },
  {
    "name": "Advance Auto Parts",
    "category": "Auto & Parts",
    "domain": "advanceautoparts.com"
  },
  {
    "name": "NAPA Auto Parts",
    "category": "Auto & Parts",
    "domain": "napaonline.com"
  },
  {
    "name": "CarParts.com",
    "category": "Auto & Parts",
    "domain": "carparts.com"
  },
  {
    "name": "TireRack",
    "category": "Auto & Parts",
    "domain": "tirerack.com"
  },
  {
    "name": "Pep Boys",
    "category": "Auto & Parts",
    "domain": "pepboys.com"
  },
  {
    "name": "JC Whitney",
    "category": "Auto & Parts",
    "domain": "jcwhitney.com"
  },
  {
    "name": "RockAuto",
    "category": "Auto & Parts",
    "domain": "rockauto.com"
  },
  {
    "name": "4 Wheel Parts",
    "category": "Auto & Parts",
    "domain": "4wheelparts.com"
  },
  {
    "name": "Staples",
    "category": "Office Supplies",
    "domain": "staples.com"
  },
  {
    "name": "Office Depot",
    "category": "Office Supplies",
    "domain": "officedepot.com"
  },
  {
    "name": "The Container Store",
    "category": "Office Supplies",
    "domain": "containerstore.com"
  },
  {
    "name": "Five Star",
    "category": "Office Supplies",
    "domain": "fivestars.com"
  },
  {
    "name": "Poppin",
    "category": "Office Supplies",
    "domain": "poppin.com"
  },
  {
    "name": "Quill",
    "category": "Office Supplies",
    "domain": "quill.com"
  },
  {
    "name": "School Specialty",
    "category": "Office Supplies",
    "domain": "schoolspecialty.com"
  },
  {
    "name": "Mead",
    "category": "Office Supplies",
    "domain": "mead.com"
  },
  {
    "name": "Post-it",
    "category": "Office Supplies",
    "domain": "post-it.com"
  },
  {
    "name": "Moleskine",
    "category": "Office Supplies",
    "domain": "moleskine.com"
  },
  {
    "name": "Discount School Supply",
    "category": "Office Supplies",
    "domain": "discountschoolsupply.com"
  },
  {
    "name": "VistaPrint",
    "category": "Office Supplies",
    "domain": "vistaprint.com"
  },
  {
    "name": "Buy Buy Baby",
    "category": "Baby & Kids",
    "domain": "buybuybaby.com"
  },
  {
    "name": "Carter's",
    "category": "Baby & Kids",
    "domain": "carters.com"
  },
  {
    "name": "The Children's Place",
    "category": "Baby & Kids",
    "domain": "childrensplace.com"
  },
  {
    "name": "Gymboree",
    "category": "Baby & Kids",
    "domain": "gymboree.com"
  },
  {
    "name": "OshKosh B'gosh",
    "category": "Baby & Kids",
    "domain": "oshkosh.com"
  },
  {
    "name": "Pottery Barn Kids",
    "category": "Baby & Kids",
    "domain": "potterybarnkids.com"
  },
  {
    "name": "Melissa & Doug",
    "category": "Baby & Kids",
    "domain": "melissaanddoug.com"
  },
  {
    "name": "Hanna Andersson",
    "category": "Baby & Kids",
    "domain": "hannaandersson.com"
  },
  {
    "name": "Primary",
    "category": "Baby & Kids",
    "domain": "primary.com"
  },
  {
    "name": "Janie and Jack",
    "category": "Baby & Kids",
    "domain": "janieandjack.com"
  },
  {
    "name": "Pandora",
    "category": "Jewelry & Accessories",
    "domain": "pandora.net"
  },
  {
    "name": "Kay Jewelers",
    "category": "Jewelry & Accessories",
    "domain": "kay.com"
  },
  {
    "name": "Swarovski",
    "category": "Jewelry & Accessories",
    "domain": "swarovski.com"
  },
  {
    "name": "Alex and Ani",
    "category": "Jewelry & Accessories",
    "domain": "alexandani.com"
  },
  {
    "name": "Blue Nile",
    "category": "Jewelry & Accessories",
    "domain": "bluenile.com"
  },
  {
    "name": "James Allen",
    "category": "Jewelry & Accessories",
    "domain": "jamesallen.com"
  },
  {
    "name": "Brilliant Earth",
    "category": "Jewelry & Accessories",
    "domain": "brilliantearth.com"
  },
  {
    "name": "David Yurman",
    "category": "Jewelry & Accessories",
    "domain": "davidyurman.com"
  },
  {
    "name": "Mejuri",
    "category": "Jewelry & Accessories",
    "domain": "mejuri.com"
  },
  {
    "name": "Monica Vinader",
    "category": "Jewelry & Accessories",
    "domain": "monicavinader.com"
  },
  {
    "name": "Barnes & Noble",
    "category": "Books & Media",
    "domain": "barnesandnoble.com"
  },
  {
    "name": "Books A Million",
    "category": "Books & Media",
    "domain": "booksamillion.com"
  },
  {
    "name": "AbeBooks",
    "category": "Books & Media",
    "domain": "abebooks.com"
  },
  {
    "name": "ThriftBooks",
    "category": "Books & Media",
    "domain": "thriftbooks.com"
  },
  {
    "name": "Book Depository",
    "category": "Books & Media",
    "domain": "bookdepository.com"
  },
  {
    "name": "Audible",
    "category": "Books & Media",
    "domain": "audible.com"
  },
  {
    "name": "Scribd",
    "category": "Books & Media",
    "domain": "scribd.com"
  },
  {
    "name": "Half Price Books",
    "category": "Books & Media",
    "domain": "hpb.com"
  },
  {
    "name": "Better World Books",
    "category": "Books & Media",
    "domain": "betterworldbooks.com"
  },
  {
    "name": "Bookshop.org",
    "category": "Books & Media",
    "domain": "bookshop.org"
  },
  {
    "name": "Whole Foods",
    "category": "Food & Drink",
    "domain": "wholefoodsmarket.com"
  },
  {
    "name": "Wine.com",
    "category": "Food & Drink",
    "domain": "wine.com"
  },
  {
    "name": "Blue Apron",
    "category": "Food & Drink",
    "domain": "blueapron.com"
  },
  {
    "name": "HelloFresh",
    "category": "Food & Drink",
    "domain": "hellofresh.com"
  },
  {
    "name": "Home Chef",
    "category": "Food & Drink",
    "domain": "homechef.com"
  },
  {
    "name": "Drizly",
    "category": "Food & Drink",
    "domain": "drizly.com"
  },
  {
    "name": "Total Wine",
    "category": "Food & Drink",
    "domain": "totalwine.com"
  },
  {
    "name": "Instacart",
    "category": "Food & Drink",
    "domain": "instacart.com"
  },
  {
    "name": "FreshDirect",
    "category": "Food & Drink",
    "domain": "freshdirect.com"
  },
  {
    "name": "Goldbelly",
    "category": "Food & Drink",
    "domain": "goldbelly.com"
  },
  {
    "name": "LEGO",
    "category": "Toys & Games",
    "domain": "lego.com"
  },
  {
    "name": "Toys R Us",
    "category": "Toys & Games",
    "domain": "toysrus.com"
  },
  {
    "name": "Build-A-Bear Workshop",
    "category": "Toys & Games",
    "domain": "buildabear.com"
  },
  {
    "name": "American Girl",
    "category": "Toys & Games",
    "domain": "americangirl.com"
  },
  {
    "name": "Hasbro",
    "category": "Toys & Games",
    "domain": "hasbro.com"
  },
  {
    "name": "Mattel",
    "category": "Toys & Games",
    "domain": "mattel.com"
  },
  {
    "name": "Nintendo",
    "category": "Toys & Games",
    "domain": "nintendo.com"
  },
  {
    "name": "Pokemon Center",
    "category": "Toys & Games",
    "domain": "pokemoncenter.com"
  },
  {
    "name": "Hot Topic",
    "category": "Toys & Games",
    "domain": "hottopic.com"
  },
  {
    "name": "ThinkGeek",
    "category": "Toys & Games",
    "domain": "thinkgeek.com"
  },
  {
    "name": "PlayStation",
    "category": "Toys & Games",
    "domain": "playstation.com"
  },
  {
    "name": "Xbox",
    "category": "Toys & Games",
    "domain": "xbox.com"
  },
  {
    "name": "Steam",
    "category": "Toys & Games",
    "domain": "steampowered.com"
  },
  {
    "name": "Ravensburger",
    "category": "Toys & Games",
    "domain": "ravensburger.us"
  },
  {
    "name": "Melissa & Doug",
    "category": "Toys & Games",
    "domain": "melissaanddoug.com"
  },
  {
    "name": "REI",
    "category": "Sports & Outdoors",
    "domain": "rei.com"
  },
  {
    "name": "Dick's Sporting Goods",
    "category": "Sports & Outdoors",
    "domain": "dickssportinggoods.com"
  },
  {
    "name": "Bass Pro Shops",
    "category": "Sports & Outdoors",
    "domain": "basspro.com"
  },
  {
    "name": "Cabela's",
    "category": "Sports & Outdoors",
    "domain": "cabelas.com"
  },
  {
    "name": "Academy Sports",
    "category": "Sports & Outdoors",
    "domain": "academy.com"
  },
  {
    "name": "Backcountry",
    "category": "Sports & Outdoors",
    "domain": "backcountry.com"
  },
  {
    "name": "Moosejaw",
    "category": "Sports & Outdoors",
    "domain": "moosejaw.com"
  },
  {
    "name": "Steep & Cheap",
    "category": "Sports & Outdoors",
    "domain": "steepandcheap.com"
  },
  {
    "name": "Sierra Trading Post",
    "category": "Sports & Outdoors",
    "domain": "sierratradingpost.com"
  },
  {
    "name": "Eastern Mountain Sports",
    "category": "Sports & Outdoors",
    "domain": "ems.com"
  },
  {
    "name": "The North Face",
    "category": "Sports & Outdoors",
    "domain": "thenorthface.com"
  },
  {
    "name": "Columbia",
    "category": "Sports & Outdoors",
    "domain": "columbia.com"
  },
  {
    "name": "Under Armour",
    "category": "Sports & Outdoors",
    "domain": "underarmour.com"
  },
  {
    "name": "Patagonia",
    "category": "Sports & Outdoors",
    "domain": "patagonia.com"
  },
  {
    "name": "Arc'teryx",
    "category": "Sports & Outdoors",
    "domain": "arcteryx.com"
  },
  {
    "name": "Yeti",
    "category": "Sports & Outdoors",
    "domain": "yeti.com"
  },
  {
    "name": "Hydro Flask",
    "category": "Sports & Outdoors",
    "domain": "hydroflask.com"
  },
  {
    "name": "Coleman",
    "category": "Sports & Outdoors",
    "domain": "coleman.com"
  },
  {
    "name": "Osprey",
    "category": "Sports & Outdoors",
    "domain": "osprey.com"
  },
  {
    "name": "Michaels",
    "category": "Art & Crafts",
    "domain": "michaels.com"
  },
  {
    "name": "Joann",
    "category": "Art & Crafts",
    "domain": "joann.com"
  },
  {
    "name": "Hobby Lobby",
    "category": "Art & Crafts",
    "domain": "hobbylobby.com"
  },
  {
    "name": "Blick Art Materials",
    "category": "Art & Crafts",
    "domain": "dickblick.com"
  },
  {
    "name": "Paper Source",
    "category": "Art & Crafts",
    "domain": "papersource.com"
  },
  {
    "name": "Cricut",
    "category": "Art & Crafts",
    "domain": "cricut.com"
  },
  {
    "name": "Silhouette America",
    "category": "Art & Crafts",
    "domain": "silhouetteamerica.com"
  },
  {
    "name": "Arteza",
    "category": "Art & Crafts",
    "domain": "arteza.com"
  },
  {
    "name": "Minted",
    "category": "Art & Crafts",
    "domain": "minted.com"
  },
  {
    "name": "Shutterfly",
    "category": "Art & Crafts",
    "domain": "shutterfly.com"
  },
  {
    "name": "Snapfish",
    "category": "Art & Crafts",
    "domain": "snapfish.com"
  },
  {
    "name": "Mixbook",
    "category": "Art & Crafts",
    "domain": "mixbook.com"
  },
  {
    "name": "Frontier Airlines",
    "category": "Travel",
    "domain": "flyfrontier.com"
  },
  {
    "name": "Spirit Airlines",
    "category": "Travel",
    "domain": "spirit.com"
  },
  {
    "name": "JetBlue",
    "category": "Travel",
    "domain": "jetblue.com"
  },
  {
    "name": "Alaska Airlines",
    "category": "Travel",
    "domain": "alaskaair.com"
  },
  {
    "name": "Hawaiian Airlines",
    "category": "Travel",
    "domain": "hawaiianairlines.com"
  },
  {
    "name": "Carnival Cruise Line",
    "category": "Travel",
    "domain": "carnival.com"
  },
  {
    "name": "Royal Caribbean",
    "category": "Travel",
    "domain": "royalcaribbean.com"
  },
  {
    "name": "Norwegian Cruise Line",
    "category": "Travel",
    "domain": "ncl.com"
  },
  {
    "name": "Disney Cruise Line",
    "category": "Travel",
    "domain": "disneycruise.disney.go.com"
  },
  {
    "name": "Princess Cruises",
    "category": "Travel",
    "domain": "princess.com"
  },
  {
    "name": "Tire Rack",
    "category": "Auto & Parts",
    "domain": "tirerack.com"
  },
  {
    "name": "CarParts.com",
    "category": "Auto & Parts",
    "domain": "carparts.com"
  },
  {
    "name": "RockAuto",
    "category": "Auto & Parts",
    "domain": "rockauto.com"
  },
  {
    "name": "4 Wheel Parts",
    "category": "Auto & Parts",
    "domain": "4wheelparts.com"
  },
  {
    "name": "Summit Racing",
    "category": "Auto & Parts",
    "domain": "summitracing.com"
  },
  {
    "name": "Jegs",
    "category": "Auto & Parts",
    "domain": "jegs.com"
  },
  {
    "name": "Crutchfield",
    "category": "Auto & Parts",
    "domain": "crutchfield.com"
  },
  {
    "name": "Primary",
    "category": "Baby & Kids",
    "domain": "primary.com"
  },
  {
    "name": "Janie and Jack",
    "category": "Baby & Kids",
    "domain": "janieandjack.com"
  },
  {
    "name": "Tea Collection",
    "category": "Baby & Kids",
    "domain": "teacollection.com"
  },
  {
    "name": "Maisonette",
    "category": "Baby & Kids",
    "domain": "maisonette.com"
  },
  {
    "name": "Melissa & Doug",
    "category": "Baby & Kids",
    "domain": "melissaanddoug.com"
  },
  {
    "name": "Reformation",
    "category": "Fashion & Apparel",
    "domain": "thereformation.com"
  },
  {
    "name": "Everlane",
    "category": "Fashion & Apparel",
    "domain": "everlane.com"
  },
  {
    "name": "Madewell",
    "category": "Fashion & Apparel",
    "domain": "madewell.com"
  },
  {
    "name": "& Other Stories",
    "category": "Fashion & Apparel",
    "domain": "stories.com"
  },
  {
    "name": "COS",
    "category": "Fashion & Apparel",
    "domain": "cos.com"
  },
  {
    "name": "Asus",
    "category": "Electronics & Tech",
    "domain": "asus.com"
  },
  {
    "name": "MSI",
    "category": "Electronics & Tech",
    "domain": "msi.com"
  },
  {
    "name": "Acer",
    "category": "Electronics & Tech",
    "domain": "acer.com"
  },
  {
    "name": "LG Electronics",
    "category": "Electronics & Tech",
    "domain": "lg.com"
  },
  {
    "name": "Sony",
    "category": "Electronics & Tech",
    "domain": "sony.com"
  },
  {
    "name": "Philips",
    "category": "Electronics & Tech",
    "domain": "philips.com"
  },
  {
    "name": "Brooklinen",
    "category": "Home & Garden",
    "domain": "brooklinen.com"
  },
  {
    "name": "Parachute",
    "category": "Home & Garden",
    "domain": "parachutehome.com"
  },
  {
    "name": "The Company Store",
    "category": "Home & Garden",
    "domain": "thecompanystore.com"
  },
  {
    "name": "Frontgate",
    "category": "Home & Garden",
    "domain": "frontgate.com"
  },
  {
    "name": "Grandin Road",
    "category": "Home & Garden",
    "domain": "grandinroad.com"
  },
  {
    "name": "Ballard Designs",
    "category": "Home & Garden",
    "domain": "ballarddesigns.com"
  },
  {
    "name": "Tatcha",
    "category": "Health & Beauty",
    "domain": "tatcha.com"
  },
  {
    "name": "Drunk Elephant",
    "category": "Health & Beauty",
    "domain": "drunkelephant.com"
  },
  {
    "name": "Youth To The People",
    "category": "Health & Beauty",
    "domain": "youthtothepeople.com"
  },
  {
    "name": "Rare Beauty",
    "category": "Health & Beauty",
    "domain": "rarebeauty.com"
  },
  {
    "name": "Merrell",
    "category": "Sports & Outdoors",
    "domain": "merrell.com"
  },
  {
    "name": "Salomon",
    "category": "Sports & Outdoors",
    "domain": "salomon.com"
  },
  {
    "name": "Black Diamond",
    "category": "Sports & Outdoors",
    "domain": "blackdiamondequipment.com"
  },
  {
    "name": "Petzl",
    "category": "Sports & Outdoors",
    "domain": "petzl.com"
  },
  {
    "name": "Mattel",
    "category": "Toys & Games",
    "domain": "mattel.com"
  },
  {
    "name": "Hasbro",
    "category": "Toys & Games",
    "domain": "hasbro.com"
  },
  {
    "name": "Fisher-Price",
    "category": "Toys & Games",
    "domain": "fisher-price.com"
  },
  {
    "name": "Petmate",
    "category": "Pet Supplies",
    "domain": "petmate.com"
  },
  {
    "name": "Kurgo",
    "category": "Pet Supplies",
    "domain": "kurgo.com"
  },
  {
    "name": "Ruffwear",
    "category": "Pet Supplies",
    "domain": "ruffwear.com"
  },
  {
    "name": "Starbucks",
    "category": "Food & Beverage",
    "domain": "starbucks.com"
  },
  {
    "name": "Nespresso",
    "category": "Food & Beverage",
    "domain": "nespresso.com"
  },
  {
    "name": "Coffee Bean & Tea Leaf",
    "category": "Food & Beverage",
    "domain": "coffeebean.com"
  },
  {
    "name": "Peet's Coffee",
    "category": "Food & Beverage",
    "domain": "peets.com"
  },
  {
    "name": "David's Tea",
    "category": "Food & Beverage",
    "domain": "davidstea.com"
  },
  {
    "name": "Teavana",
    "category": "Food & Beverage",
    "domain": "teavana.com"
  },
  {
    "name": "Harney & Sons",
    "category": "Food & Beverage",
    "domain": "harney.com"
  },
  {
    "name": "Bookshop.org",
    "category": "Books & Media",
    "domain": "bookshop.org"
  },
  {
    "name": "Better World Books",
    "category": "Books & Media",
    "domain": "betterworldbooks.com"
  },
  {
    "name": "Alibris",
    "category": "Books & Media",
    "domain": "alibris.com"
  },
  {
    "name": "Monica Vinader",
    "category": "Jewelry & Accessories",
    "domain": "monicavinader.com"
  },
  {
    "name": "Missoma",
    "category": "Jewelry & Accessories",
    "domain": "missoma.com"
  },
  {
    "name": "Kendra Scott",
    "category": "Jewelry & Accessories",
    "domain": "kendrascott.com"
  },
  {
    "name": "Jerry's Artarama",
    "category": "Art & Crafts",
    "domain": "jerrysartarama.com"
  },
  {
    "name": "Artist & Craftsman",
    "category": "Art & Crafts",
    "domain": "artistcraftsman.com"
  },
  {
    "name": "Cheap Joe's Art Stuff",
    "category": "Art & Crafts",
    "domain": "cheapjoes.com"
  },
  {
    "name": "Delta Airlines",
    "category": "Travel",
    "domain": "delta.com"
  },
  {
    "name": "United Airlines",
    "category": "Travel",
    "domain": "united.com"
  },
  {
    "name": "American Airlines",
    "category": "Travel",
    "domain": "aa.com"
  },
  {
    "name": "Pep Boys",
    "category": "Auto & Parts",
    "domain": "pepboys.com"
  },
  {
    "name": "JC Whitney",
    "category": "Auto & Parts",
    "domain": "jcwhitney.com"
  },
  {
    "name": "Pottery Barn Kids",
    "category": "Baby & Kids",
    "domain": "potterybarnkids.com"
  },
  {
    "name": "Crate & Kids",
    "category": "Baby & Kids",
    "domain": "crateandbarrel.com/kids"
  },
  {
    "name": "Babylist",
    "category": "Baby & Kids",
    "domain": "babylist.com"
  },
  {
    "name": "Ergobaby",
    "category": "Baby & Kids",
    "domain": "ergobaby.com"
  },
  {
    "name": "UPPAbaby",
    "category": "Baby & Kids",
    "domain": "uppababy.com"
  },
  {
    "name": "Bugaboo",
    "category": "Baby & Kids",
    "domain": "bugaboo.com"
  },
  {
    "name": "Stokke",
    "category": "Baby & Kids",
    "domain": "stokke.com"
  },
  {
    "name": "Graco",
    "category": "Baby & Kids",
    "domain": "gracobaby.com"
  },
  {
    "name": "4moms",
    "category": "Baby & Kids",
    "domain": "4moms.com"
  }
];
