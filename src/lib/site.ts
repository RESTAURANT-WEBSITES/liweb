export const PHONE_DISPLAY = "+91 62384 26420";
export const PHONE_TEL = "tel:+916238426420";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello LIWEB Solutions, I would like to discuss building a website for my business.";

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/916238426420?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export interface Plan {
  id: "static" | "dynamic" | "premium";
  name: string;
  price: string;
  monthly?: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "static",
    name: "STATIC",
    price: "₹4,999",
    monthly: "₹1,000 / month for 6 months",
    features: [
      "Up to 5 web pages",
      "1 free domain name",
      "1 free hosting",
      "Responsive design, mobile-friendly",
      "Paid additional pages and feature upgrades available",
    ],
    cta: "Choose Static",
  },
  {
    id: "dynamic",
    name: "DYNAMIC",
    price: "₹9,999",
    monthly: "₹1,000 / month for 12 months",
    features: [
      "Always-live background",
      "Video background",
      "Up to 10 web pages",
      "1 free domain name",
      "1 free hosting",
      "Responsive design, mobile-friendly",
      "Paid additional pages and features",
    ],
    featured: true,
    cta: "Choose Dynamic",
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "₹14,999",
    monthly: "₹1,500 / month for 12 months",
    features: [
      "Up to 15 web pages",
      "1 year of free maintenance",
      "Scroll-animated pages",
      "Always-live background",
      "Video background",
      "1 free domain name",
      "1 free hosting",
      "Responsive design, mobile-friendly",
      "Paid additional features",
    ],
    cta: "Choose Premium",
  },
];

// NOTE for owner confirmation: the installment amounts above are quoted
// exactly as they appear in the supplied pricing reference. The installments
// do not sum to the advertised one-time prices (₹1,000 × 6 = ₹6,000 vs
// ₹4,999; ₹1,000 × 12 = ₹12,000 vs ₹9,999; ₹1,500 × 12 = ₹18,000 vs
// ₹14,999). Do not silently change either figure — confirm the intended
// payment terms with the business owner before launch.

export const SERVICES = [
  {
    title: "Custom Website Development",
    description:
      "Professionally designed, responsive websites tailored to a business's requirements and brand identity.",
  },
  {
    title: "Business Websites",
    description:
      "Modern websites that communicate services, establish credibility, and generate enquiries.",
  },
  {
    title: "E-commerce Websites",
    description:
      "Online stores with product listings, shopping flows, and the integrations required for the project.",
  },
  {
    title: "Landing Pages",
    description:
      "Focused, conversion-oriented pages for services, products, advertising campaigns, and lead generation.",
  },
  {
    title: "Website Redesign",
    description:
      "Modernization of outdated websites with improved design, usability, responsiveness, and performance.",
  },
  {
    title: "Maintenance & Support",
    description:
      "Website updates, content changes, technical assistance, and ongoing improvements according to the agreed scope.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, audience, and project objectives.",
  },
  {
    number: "02",
    title: "Design",
    description: "Define the visual direction, layouts, and user experience.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Build the website, implement functionality, and test responsiveness.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deploy the website, verify functionality, and provide agreed support.",
  },
] as const;
