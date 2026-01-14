import { Helmet } from "react-helmet-async";

const SEO = ({ description, image, url }) => {
  // 🟢 FORCE STATIC TITLE ALWAYS
  const masterTitle = "Arihant Infosys | Wholesale Computer Hardware";

  const defaultDesc =
    "Mumbai's trusted source for pulled, refurbished, and open-box computer hardware. Enterprise performance at wholesale prices.";
  const siteUrl = window.location.href;
  const defaultImage =
    "https://res.cloudinary.com/dbougyk84/image/upload/v1/arihant-inventory/logo-preview";

  return (
    <Helmet>
      {/* 🔒 LOCKED BROWSER TAB TITLE */}
      <title>{masterTitle}</title>

      {/* Standard Metadata */}
      <meta name="description" content={description || defaultDesc} />

      {/* Facebook / WhatsApp Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={masterTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={masterTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
