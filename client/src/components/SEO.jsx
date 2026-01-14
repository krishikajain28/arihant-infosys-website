import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url, type = "website", schema }) => {
  // 1. MASTER BRANDING (Static & Strong)
  const siteTitle =
    "Arihant Infosys | Wholesale Computer Hardware | Lamington Road";
  const defaultDesc =
    "Mumbai's #1 trusted source for wholesale computer parts. We sell refurbished RAM, SSDs, HDDs, and Servers. Located at Lamington Road. Shipping Pan-India.";
  const siteUrl = "https://arihantinfosys.vercel.app";
  const defaultImage =
    "https://res.cloudinary.com/dbougyk84/image/upload/v1/arihant-inventory/logo-preview"; // Use your actual logo link if you have one

  // 2. SCHEMA: LOCAL BUSINESS (Always present)
  // This tells Google: "We are a real physical store in Mumbai"
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    name: "Arihant Infosys",
    image: defaultImage,
    telephone: "+919702730050",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 12, Ground Floor, Lamington Road",
      addressLocality: "Grant Road East",
      addressRegion: "Mumbai",
      postalCode: "400007",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.9623,
      longitude: 72.8159,
    },
    url: siteUrl,
    priceRange: "₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
  };

  // 3. MERGE SCHEMAS (If a product schema is passed, add it)
  const finalSchema = schema
    ? [localBusinessSchema, schema]
    : [localBusinessSchema];

  return (
    <Helmet>
      {/* --- STANDARD TAGS --- */}
      <title>{title ? `${title} | Arihant Infosys` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url || siteUrl} />

      {/* --- OPEN GRAPH (WhatsApp/Facebook) --- */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* --- TWITTER CARD --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* --- 🟢 THE SEO NUKE: STRUCTURED DATA --- */}
      <script type="application/ld+json">{JSON.stringify(finalSchema)}</script>
    </Helmet>
  );
};

export default SEO;
