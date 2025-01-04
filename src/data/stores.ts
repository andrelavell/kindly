export interface Store {
  name: string;
  category: string;
  logo?: string;  // Optional logo URL
  popular?: boolean;
  domain?: string; // Optional custom domain
}

// Helper function to format domain names
const formatDomain = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[&']/g, '') // Remove & and '
    .replace(/[\s.-]+/g, '-') // Replace spaces, dots, and hyphens with a single hyphen
    .replace(/[^a-z0-9-]/g, ''); // Remove any other special characters
};

// Get common domain variations for a store
const getDomainVariations = (store: Store) => {
  const baseName = formatDomain(store.name);
  const variations = [
    store.domain, // Custom domain if provided
    `${baseName}.com`,
    `${baseName}.net`,
    `${baseName}store.com`,
    `${baseName}-store.com`,
    `${baseName}shop.com`,
    `${baseName}-shop.com`,
    `shop${baseName}.com`,
    `my${baseName}.com`,
    `get${baseName}.com`,
    `www.${baseName}.com`,
    // Handle special cases
    baseName === 'tjmaxx' ? 'tjx.com' : null,
    baseName === 'marshalls' ? 'marshallsonline.com' : null,
    baseName === 'samsclub' ? 'samsclub.com' : null,
    baseName === 'walmart' ? 'walmart-inc.com' : null,
  ].filter(Boolean) as string[];

  return Array.from(new Set(variations)); // Remove duplicates
};

// Helper function to get store logo URL with multiple fallbacks
export const getStoreLogo = async (store: Store): Promise<string | null> => {
  const domains = getDomainVariations(store);
  const baseName = formatDomain(store.name);
  
  // If store has a predefined logo, use it
  if (store.logo) {
    return store.logo;
  }

  // Prioritized list of providers, ordered by reliability and speed
  const providers = [
    // Primary CDN providers (most reliable)
    ...domains.map(domain => `https://logo.clearbit.com/${domain}`),
    
    // Company specific CDNs (for major retailers)
    baseName === 'amazon' ? 'https://amazon-press.com/images/amazon-logo.png' : null,
    baseName === 'walmart' ? 'https://cdn.corporate.walmart.com/images/walmart-logo.png' : null,
    baseName === 'target' ? 'https://corporate.target.com/_media/images/target-logo.png' : null,
    baseName === 'costco' ? 'https://www.costco.com/images/costco-logo.png' : null,
    baseName === 'ebay' ? 'https://cdn.ebayinc.com/images/ebay-logo.png' : null,
    
    // Secondary reliable sources
    `https://cdn.simpleicons.org/${baseName}`,
    ...domains.map(domain => `https://cdn.worldvectorlogo.com/logos/${baseName}.svg`),
  ].filter(Boolean) as string[];

  // Try each provider with a timeout
  const timeout = 3000; // 3 seconds timeout
  
  for (const url of providers) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, { 
        signal: controller.signal,
        method: 'HEAD' // Only fetch headers to check if image exists
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        return url;
      }
    } catch (error) {
      // Continue to next provider if timeout or error occurs
      continue;
    }
  }

  // Return null if no logo found
  return null;
};

// Helper function to get unique categories from stores
export const getUniqueCategories = () => {
  return Array.from(new Set(stores.map(store => store.category))).sort();
};

// Helper function to get popular stores
export const getPopularStores = () => {
  return stores.filter(store => store.popular);
};

// Helper function to search stores
export const searchStores = (query: string, category?: string) => {
  return stores.filter(store => {
    const matchesQuery = store.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || store.category === category;
    return matchesQuery && matchesCategory;
  });
};

export const categories = [
  "Major Retailers",
  "Fashion & Apparel",
  "Electronics & Tech",
  "Home & Garden",
  "Health & Beauty",
  "Travel & Leisure",
  "Sports & Outdoors",
  "Books & Media",
  "Food & Drink",
  "Toys & Games",
  "Luxury",
  "Pet Supplies",
  "Automotive",
  "Office & School",
  "Baby & Kids",
  "Jewelry & Accessories"
] as const;

// Update store data to include custom domains where needed
export const stores: Store[] = [
  // Major Retailers
  { name: "Amazon", category: "Major Retailers", popular: true, domain: "amazon.com" },
  { name: "Walmart", category: "Major Retailers", popular: true, domain: "walmart.com" },
  { name: "Target", category: "Major Retailers", popular: true, domain: "target.com" },
  { name: "Costco", category: "Major Retailers", popular: true, domain: "costco.com" },
  { name: "eBay", category: "Major Retailers", popular: true, domain: "ebay.com" },
  { name: "Sam's Club", category: "Major Retailers", domain: "samsclub.com" },
  { name: "BJ's Wholesale Club", category: "Major Retailers", domain: "bjs.com" },
  { name: "Big Lots", category: "Major Retailers" },
  { name: "Dollar General", category: "Major Retailers" },
  { name: "Family Dollar", category: "Major Retailers" },
  { name: "Five Below", category: "Major Retailers" },
  { name: "Dollar Tree", category: "Major Retailers" },
  { name: "Kohl's", category: "Major Retailers" },
  { name: "JCPenney", category: "Major Retailers" },
  { name: "Marshalls", category: "Major Retailers" },
  { name: "TJ Maxx", category: "Major Retailers" },
  { name: "HomeGoods", category: "Major Retailers" },
  { name: "Ross", category: "Major Retailers" },
  { name: "Burlington", category: "Major Retailers" },
  { name: "Tuesday Morning", category: "Major Retailers" },

  // Fashion & Apparel
  { name: "Nike", category: "Fashion & Apparel", popular: true },
  { name: "Adidas", category: "Fashion & Apparel", popular: true },
  { name: "H&M", category: "Fashion & Apparel", popular: true },
  { name: "Zara", category: "Fashion & Apparel" },
  { name: "Uniqlo", category: "Fashion & Apparel" },
  { name: "ASOS", category: "Fashion & Apparel" },
  { name: "The North Face", category: "Fashion & Apparel" },
  { name: "Levi's", category: "Fashion & Apparel" },
  { name: "Urban Outfitters", category: "Fashion & Apparel" },
  { name: "Patagonia", category: "Fashion & Apparel" },
  { name: "Gap", category: "Fashion & Apparel" },
  { name: "Old Navy", category: "Fashion & Apparel" },
  { name: "Banana Republic", category: "Fashion & Apparel" },
  { name: "Forever 21", category: "Fashion & Apparel" },
  { name: "Macy's", category: "Fashion & Apparel" },
  { name: "Nordstrom", category: "Fashion & Apparel" },
  { name: "J.Crew", category: "Fashion & Apparel" },
  { name: "Anthropologie", category: "Fashion & Apparel" },
  { name: "Puma", category: "Fashion & Apparel" },
  { name: "Under Armour", category: "Fashion & Apparel" },

  // Electronics & Tech
  { name: "Best Buy", category: "Electronics & Tech", popular: true },
  { name: "Apple", category: "Electronics & Tech", popular: true },
  { name: "Samsung", category: "Electronics & Tech" },
  { name: "Microsoft", category: "Electronics & Tech" },
  { name: "Dell", category: "Electronics & Tech" },
  { name: "HP", category: "Electronics & Tech" },
  { name: "Lenovo", category: "Electronics & Tech" },
  { name: "Newegg", category: "Electronics & Tech" },
  { name: "B&H Photo", category: "Electronics & Tech" },
  { name: "GameStop", category: "Electronics & Tech" },
  { name: "Bose", category: "Electronics & Tech" },
  { name: "Sony", category: "Electronics & Tech" },
  { name: "LG", category: "Electronics & Tech" },
  { name: "Razer", category: "Electronics & Tech" },
  { name: "Logitech", category: "Electronics & Tech" },

  // Home & Garden
  { name: "Wayfair", category: "Home & Garden", popular: true },
  { name: "IKEA", category: "Home & Garden", popular: true },
  { name: "Crate & Barrel", category: "Home & Garden" },
  { name: "Pottery Barn", category: "Home & Garden" },
  { name: "West Elm", category: "Home & Garden" },
  { name: "The Home Depot", category: "Home & Garden" },
  { name: "Lowe's", category: "Home & Garden" },
  { name: "Bed Bath & Beyond", category: "Home & Garden" },
  { name: "Williams Sonoma", category: "Home & Garden" },
  { name: "Sur La Table", category: "Home & Garden" },
  { name: "Pier 1", category: "Home & Garden" },
  { name: "Ashley Furniture", category: "Home & Garden" },
  { name: "Overstock", category: "Home & Garden" },
  { name: "Restoration Hardware", category: "Home & Garden" },
  { name: "Room & Board", category: "Home & Garden" },

  // Health & Beauty
  { name: "Sephora", category: "Health & Beauty", popular: true },
  { name: "Ulta Beauty", category: "Health & Beauty", popular: true },
  { name: "MAC Cosmetics", category: "Health & Beauty" },
  { name: "Bath & Body Works", category: "Health & Beauty" },
  { name: "The Body Shop", category: "Health & Beauty" },
  { name: "Dermstore", category: "Health & Beauty" },
  { name: "Glossier", category: "Health & Beauty" },
  { name: "Fenty Beauty", category: "Health & Beauty" },
  { name: "Charlotte Tilbury", category: "Health & Beauty" },
  { name: "Kiehl's", category: "Health & Beauty" },
  { name: "Origins", category: "Health & Beauty" },
  { name: "Clinique", category: "Health & Beauty" },
  { name: "Estée Lauder", category: "Health & Beauty" },
  { name: "NYX Cosmetics", category: "Health & Beauty" },
  { name: "Morphe", category: "Health & Beauty" },

  // Travel & Leisure
  { name: "Expedia", category: "Travel & Leisure", popular: true },
  { name: "Booking.com", category: "Travel & Leisure", popular: true },
  { name: "Hotels.com", category: "Travel & Leisure" },
  { name: "Airbnb", category: "Travel & Leisure" },
  { name: "Vrbo", category: "Travel & Leisure" },
  { name: "Kayak", category: "Travel & Leisure" },
  { name: "Priceline", category: "Travel & Leisure" },
  { name: "Travelocity", category: "Travel & Leisure" },
  { name: "Hotwire", category: "Travel & Leisure" },
  { name: "Orbitz", category: "Travel & Leisure" },
  { name: "TripAdvisor", category: "Travel & Leisure" },
  { name: "Agoda", category: "Travel & Leisure" },
  { name: "Hopper", category: "Travel & Leisure" },
  { name: "CheapOair", category: "Travel & Leisure" },
  { name: "Southwest Airlines", category: "Travel & Leisure" },

  // Luxury
  { name: "Gucci", category: "Luxury", popular: true },
  { name: "Louis Vuitton", category: "Luxury", popular: true },
  { name: "Burberry", category: "Luxury" },
  { name: "Prada", category: "Luxury" },
  { name: "Chanel", category: "Luxury" },
  { name: "Hermès", category: "Luxury" },
  { name: "Cartier", category: "Luxury" },
  { name: "Tiffany & Co", category: "Luxury" },
  { name: "Rolex", category: "Luxury" },
  { name: "Omega", category: "Luxury" },
  { name: "Tag Heuer", category: "Luxury" },
  { name: "Bulgari", category: "Luxury" },
  { name: "Saint Laurent", category: "Luxury" },
  { name: "Balenciaga", category: "Luxury" },
  { name: "Fendi", category: "Luxury" },

  // Pet Supplies
  { name: "Chewy", category: "Pet Supplies", popular: true },
  { name: "PetSmart", category: "Pet Supplies", popular: true },
  { name: "Petco", category: "Pet Supplies" },
  { name: "BarkBox", category: "Pet Supplies" },
  { name: "Rover", category: "Pet Supplies" },
  { name: "Wag", category: "Pet Supplies" },
  { name: "Pet Supplies Plus", category: "Pet Supplies" },
  { name: "1800PetMeds", category: "Pet Supplies" },
  { name: "PetFlow", category: "Pet Supplies" },
  { name: "PetPlate", category: "Pet Supplies" },

  // Automotive
  { name: "AutoZone", category: "Automotive", popular: true },
  { name: "O'Reilly Auto Parts", category: "Automotive" },
  { name: "Advance Auto Parts", category: "Automotive" },
  { name: "NAPA Auto Parts", category: "Automotive" },
  { name: "CarParts.com", category: "Automotive" },
  { name: "TireRack", category: "Automotive" },
  { name: "Pep Boys", category: "Automotive" },
  { name: "JC Whitney", category: "Automotive" },
  { name: "RockAuto", category: "Automotive" },
  { name: "4 Wheel Parts", category: "Automotive" },

  // Office & School
  { name: "Staples", category: "Office & School", popular: true },
  { name: "Office Depot", category: "Office & School", popular: true },
  { name: "The Container Store", category: "Office & School" },
  { name: "Five Star", category: "Office & School" },
  { name: "Poppin", category: "Office & School" },
  { name: "Quill", category: "Office & School" },
  { name: "School Specialty", category: "Office & School" },
  { name: "Mead", category: "Office & School" },
  { name: "Post-it", category: "Office & School" },
  { name: "Moleskine", category: "Office & School" },

  // Baby & Kids
  { name: "Buy Buy Baby", category: "Baby & Kids", popular: true },
  { name: "Carter's", category: "Baby & Kids", popular: true },
  { name: "The Children's Place", category: "Baby & Kids" },
  { name: "Gymboree", category: "Baby & Kids" },
  { name: "OshKosh B'gosh", category: "Baby & Kids" },
  { name: "Pottery Barn Kids", category: "Baby & Kids" },
  { name: "Melissa & Doug", category: "Baby & Kids" },
  { name: "Hanna Andersson", category: "Baby & Kids" },
  { name: "Primary", category: "Baby & Kids" },
  { name: "Janie and Jack", category: "Baby & Kids" },

  // Jewelry & Accessories
  { name: "Pandora", category: "Jewelry & Accessories", popular: true },
  { name: "Kay Jewelers", category: "Jewelry & Accessories", popular: true },
  { name: "Swarovski", category: "Jewelry & Accessories" },
  { name: "Alex and Ani", category: "Jewelry & Accessories" },
  { name: "Blue Nile", category: "Jewelry & Accessories" },
  { name: "James Allen", category: "Jewelry & Accessories" },
  { name: "Brilliant Earth", category: "Jewelry & Accessories" },
  { name: "David Yurman", category: "Jewelry & Accessories" },
  { name: "Mejuri", category: "Jewelry & Accessories" },
  { name: "Monica Vinader", category: "Jewelry & Accessories" },

  // Books & Media
  { name: "Barnes & Noble", category: "Books & Media", popular: true },
  { name: "Books A Million", category: "Books & Media" },
  { name: "AbeBooks", category: "Books & Media" },
  { name: "ThriftBooks", category: "Books & Media" },
  { name: "Book Depository", category: "Books & Media" },
  { name: "Audible", category: "Books & Media" },
  { name: "Scribd", category: "Books & Media" },
  { name: "Half Price Books", category: "Books & Media" },
  { name: "Better World Books", category: "Books & Media" },
  { name: "Bookshop.org", category: "Books & Media" },

  // Food & Drink
  { name: "Whole Foods", category: "Food & Drink", popular: true },
  { name: "Wine.com", category: "Food & Drink", popular: true },
  { name: "Blue Apron", category: "Food & Drink" },
  { name: "HelloFresh", category: "Food & Drink" },
  { name: "Home Chef", category: "Food & Drink" },
  { name: "Drizly", category: "Food & Drink" },
  { name: "Total Wine", category: "Food & Drink" },
  { name: "Instacart", category: "Food & Drink" },
  { name: "FreshDirect", category: "Food & Drink" },
  { name: "Goldbelly", category: "Food & Drink" },

  // Toys & Games
  { name: "LEGO", category: "Toys & Games", popular: true },
  { name: "Toys R Us", category: "Toys & Games", popular: true },
  { name: "Build-A-Bear Workshop", category: "Toys & Games" },
  { name: "American Girl", category: "Toys & Games" },
  { name: "Hasbro", category: "Toys & Games" },
  { name: "Mattel", category: "Toys & Games" },
  { name: "Nintendo", category: "Toys & Games" },
  { name: "Pokemon Center", category: "Toys & Games" },
  { name: "Hot Topic", category: "Toys & Games" },
  { name: "ThinkGeek", category: "Toys & Games" },

  // Sports & Outdoors
  { name: "REI", category: "Sports & Outdoors", popular: true },
  { name: "Dick's Sporting Goods", category: "Sports & Outdoors", popular: true },
  { name: "Bass Pro Shops", category: "Sports & Outdoors" },
  { name: "Cabela's", category: "Sports & Outdoors" },
  { name: "Academy Sports", category: "Sports & Outdoors" },
  { name: "Backcountry", category: "Sports & Outdoors" },
  { name: "Moosejaw", category: "Sports & Outdoors" },
  { name: "Steep & Cheap", category: "Sports & Outdoors" },
  { name: "Sierra Trading Post", category: "Sports & Outdoors" },
  { name: "Eastern Mountain Sports", category: "Sports & Outdoors" }
];
