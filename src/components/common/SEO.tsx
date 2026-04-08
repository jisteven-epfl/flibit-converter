import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

export default function SEO() {
  const { t, i18n } = useTranslation();

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t("head.title")}</title>
      <meta name="description" content={t("head.description")} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={t("head.title")} />
      <meta property="og:description" content={t("head.description")} />

      {/* Twitter Tags */}
      <meta property="twitter:title" content={t("head.title")} />
      <meta property="twitter:description" content={t("head.description")} />
      
      {/* Hreflang Tags for SEO */}
      <link rel="alternate" hrefLang="en" href="https://flibit-converter.vercel.app/" />
      <link rel="alternate" hrefLang="zh" href="https://flibit-converter.vercel.app/zh" />
      <link rel="alternate" hrefLang="x-default" href="https://flibit-converter.vercel.app/" />
    </Helmet>
  );
}
