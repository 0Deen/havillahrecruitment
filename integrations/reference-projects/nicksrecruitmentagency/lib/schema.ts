import { SEO } from "./seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SEO.company.url}/#organization`,

      name: SEO.company.name,

      legalName: SEO.company.legalName,

      url: SEO.company.url,

      logo: {
        "@type": "ImageObject",
        url: SEO.company.logo,
      },

      image: SEO.company.image,

      description: SEO.company.description,

      email: SEO.company.emails.primary,

      telephone: SEO.company.telephone,

      foundingDate: SEO.company.founded,

      slogan: SEO.company.slogan,

      knowsAbout: [
        "Recruitment",
        "International Recruitment",
        "Human Resource",
        "Employment",
        "Jobs Abroad",
        "Healthcare Recruitment",
        "Construction Recruitment",
        "Engineering Recruitment",
        "Hospitality Recruitment",
        "Medical Screening",
        "Visa Processing",
        "Training",
        "Career Guidance"
      ],

      areaServed: SEO.company.serviceArea,

      sameAs: [
        SEO.company.socials.facebook,
        SEO.company.socials.twitter,
        SEO.company.socials.tiktok,
        SEO.company.socials.telegram,
        SEO.company.socials.linktree
      ],

      contactPoint: [
        {
          "@type": "ContactPoint",

          telephone: SEO.company.telephone,

          contactType: "customer support",

          email: SEO.company.emails.support,

          availableLanguage: SEO.company.languages
        },

        {
          "@type": "ContactPoint",

          telephone: SEO.company.telephone,

          contactType: "sales",

          email: SEO.company.emails.primary,

          availableLanguage: SEO.company.languages
        },

        {
          "@type": "ContactPoint",

          telephone: SEO.company.telephone,

          contactType: "recruitment",

          email: SEO.company.emails.jobs,

          availableLanguage: SEO.company.languages
        }
      ]
    },

    {
      "@type": "EmploymentAgency",

      "@id": `${SEO.company.url}/#agency`,

      name: SEO.company.name,

      url: SEO.company.url,

      image: SEO.company.image,

      logo: SEO.company.logo,

      telephone: SEO.company.telephone,

      email: SEO.company.emails.primary,

      address: {

        "@type": "PostalAddress",

        streetAddress: SEO.company.address.street,

        addressLocality: SEO.company.address.city,

        addressRegion: SEO.company.address.county,

        addressCountry: SEO.company.address.country
      },

      areaServed: SEO.company.serviceArea,

      openingHours: SEO.company.openingHours,

      sameAs: [
        SEO.company.socials.facebook,
        SEO.company.socials.twitter,
        SEO.company.socials.tiktok,
        SEO.company.socials.telegram,
        SEO.company.socials.linktree
      ],

      hasOfferCatalog: {

        "@type": "OfferCatalog",

        name: "Recruitment Services",

        itemListElement: SEO.services.map((service) => ({
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",

            name: service
          }
        }))
      }
    },

    {
      "@type": "WebSite",

      "@id": `${SEO.company.url}/#website`,

      url: SEO.company.url,

      name: SEO.company.name,

      description: SEO.company.description,

      publisher: {
        "@id": `${SEO.company.url}/#organization`
      },

      inLanguage: "en",

      potentialAction: {
        "@type": "SearchAction",

        target: `${SEO.company.url}/search?q={search_term_string}`,

        "query-input": "required name=search_term_string"
      }
    },

    {
      "@type": "WebPage",

      "@id": `${SEO.company.url}/#homepage`,

      url: SEO.company.url,

      name: SEO.company.name,

      isPartOf: {
        "@id": `${SEO.company.url}/#website`
      },

      about: {
        "@id": `${SEO.company.url}/#organization`
      },

      primaryImageOfPage: {

        "@type": "ImageObject",

        url: SEO.company.image
      },

      description: SEO.company.description,

      inLanguage: "en"
    },

    {
      "@type": "Brand",

      name: SEO.company.name,

      logo: SEO.company.logo,

      slogan: SEO.company.slogan
    }
  ]
};

export default organizationSchema;
