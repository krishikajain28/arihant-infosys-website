import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url }) => {
  const siteTitle = "Arihant Infosys | Premium Refurbished Hardware";
  const defaultDesc =
    "Mumbai's trusted source for pulled, refurbished, and open-box computer hardware.";
  const siteUrl = window.location.href;
  const defaultImage =
    "https://res.cloudinary.com/dbougyk84/image/upload/v1/arihant-inventory/logo-preview";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | Arihant Infosys` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />

      {/* Facebook / WhatsApp Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
