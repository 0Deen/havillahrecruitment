export const siteConfig = {
  name: "Havillah Recruitment Agency",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  description: "Explore recruitment services, overseas employment guidance, job categories and candidate support with Havillah Recruitment Agency.",
  phone: "+254 754 426678",
  phoneHref: "tel:+254754426678",
  alternatePhone: "+254 745 729774",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254754426678",
  email: "havillahagency@gmail.com",
} as const;
