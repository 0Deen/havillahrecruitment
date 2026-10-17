import type { Metadata } from "next";

type MetadataProps = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
};

export function generateMetadata({
  title,
  description,
  canonical,
  image = "/logo.jpg",
  robots = {
    index: true,
    follow: true,
  },
}: MetadataProps): Metadata {
  return {
    title,
    description,

    alternates: {
      canonical,
    },

    robots,

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Nicks Recruitment Agency",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
