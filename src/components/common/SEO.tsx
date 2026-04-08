import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function SEO() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const siteOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://flibit-converter.vercel.app";
  const canonicalUrl = `${siteOrigin}${location.pathname}`;

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t("head.title")}</title>
      <meta name="description" content={t("head.description")} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={t("head.title")} />
      <meta property="og:description" content={t("head.description")} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Tags */}
      <meta name="twitter:title" content={t("head.title")} />
      <meta name="twitter:description" content={t("head.description")} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Hreflang Tags for SEO */}
      <link rel="alternate" hrefLang="en" href={`${siteOrigin}/`} />
      <link rel="alternate" hrefLang="zh" href={`${siteOrigin}/zh`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteOrigin}/`} />
    </Helmet>
  );
}
