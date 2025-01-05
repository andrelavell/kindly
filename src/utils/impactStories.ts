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
    image: "/images/impact/education.jpg"
  },
  {
    category: "Healthcare",
    title: "Emergency Medical Care for Communities",
    quote: "The medical supplies funded by shoppers like you saved many lives in our village.",
    location: "Kenya",
    image: "/images/impact/healthcare.jpg"
  },
  {
    category: "Environment",
    title: "Protecting Wildlife Habitats",
    quote: "Your contributions help us preserve these endangered species for future generations.",
    location: "Amazon Rainforest",
    image: "/images/impact/wildlife.jpg"
  },
  {
    category: "Women Empowerment",
    title: "Supporting Women Entrepreneurs",
    quote: "With this microloan, I was able to start my own business and support my family.",
    location: "Bangladesh",
    image: "/images/impact/women-entrepreneurs.jpg"
  },
  {
    category: "Veterans Support",
    title: "Helping Veterans Transition",
    quote: "The job training program gave me the skills I needed to start my civilian career.",
    location: "United States",
    image: "/images/impact/veterans.jpg"
  }
];
