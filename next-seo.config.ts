import preview from "@public/favicons/card.png";

const getConfig = (): any => {
  const domain = process.env.DOMAIN;

  return {
    title: {
      default: "Главная | NextCity",
      template: `%s | NextCity`,
    },
    description: `NextCity - `,
    openGraph: {
      type: "website",
      images: [{ url: preview.src, alt: "Preview Image" }],
      title: `NextCity`,
      description: `NextCity - `,
      locale: "ru",
      url: "localhost",
      siteName: "NextCity",
    },
    manifest: "/favicons/manifest.json",
    twitter: {
      card: "summary_large_image",
    },
    metadataBase: new URL(domain),
  };
};

export default getConfig;
