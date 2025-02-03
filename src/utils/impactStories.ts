export interface ImpactStory {
  category: string;
  title: string;
  quote: string;
  location: string;
  image: string;
}

export const impactStories: ImpactStory[] = [
  {
    category: "Education",
    title: "Providing Education to 1000+ Children",
    quote: "Thanks to donors like you, I can finally go to school and chase my dreams.",
    location: "Rural India",
    image: "https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto/v1738625648/nfr5etgnv6ms718iwdwk"
  },
  {
    category: "Healthcare",
    title: "Emergency Medical Care for Communities",
    quote: "The medical supplies funded by shoppers like you saved many lives in our village.",
    location: "Kenya",
    image: "https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto/v1738625652/yv85ak1i5a6pahcvhxzu"
  },
  {
    category: "Environment",
    title: "Protecting Wildlife Habitats",
    quote: "Your contributions help us preserve these endangered species for future generations.",
    location: "Amazon Rainforest",
    image: "https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto/v1738625655/wdagikc9xyy5jx6kots5"
  },
  {
    category: "Women Empowerment",
    title: "Supporting Women Entrepreneurs",
    quote: "With this microloan, I was able to start my own business and support my family.",
    location: "Bangladesh",
    image: "https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto/v1738625658/cutjedgmcf1l0ovuh1sj"
  },
  {
    category: "Veterans Support",
    title: "Helping Veterans Transition",
    quote: "The job training program gave me the skills I needed to start my civilian career.",
    location: "United States",
    image: "https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto/v1738625662/cksaoj3zobgk1xyi6fvl"
  }
];
