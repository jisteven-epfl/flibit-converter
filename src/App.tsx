import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/layout/Header";
import MainCard from "./components/layout/MainCard";
import { useFlibitDerived, useFlibitStore } from "./store/useFlibitStore";
import SEOContent from "./components/layout/SEOContent";
import SEO from "./components/common/SEO";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

function MainApp() {
  const { t } = useTranslation();
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("flibit-theme");
      return (
        saved === "dark" ||
        (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("flibit-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("flibit-theme", "light");
    }
  }, [isDarkMode]);

  const {
      isInputEmpty,
      isInputNonInteger,
      isInputTooBig,
      isInputTooSmall,
      isTooBigToConvert,
      isTooSmallToConvert,
      isNegativeUnsigned
  } = useFlibitDerived();
  
  const bitsLength = useFlibitStore(s => s.bitsLength);

  const getErrorMessage = isInputEmpty
    ? t("errors.empty")
    : isInputNonInteger
      ? t("errors.notInteger")
      : isInputTooBig
        ? t("errors.tooBig")
        : isInputTooSmall
          ? t("errors.tooSmall")
          : isNegativeUnsigned
            ? t("errors.negativeUnsigned")
            : isTooBigToConvert
              ? t("errors.tooBigToConvert", { bits: bitsLength })
              : isTooSmallToConvert
                ? t("errors.tooSmallToConvert", { bits: bitsLength })
                : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-50 to-indigo-100 dark:from-slate-950 dark:via-indigo-950/80 dark:to-slate-900 pt-28 pb-12 px-4 flex flex-col items-center transition-colors duration-500">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="w-full max-w-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-white/40 dark:border-slate-800/60 transition-colors">

        <span role="alert" aria-live="polite" className="sr-only">
          {getErrorMessage}
        </span>

        <MainCard />
      </div>

      <SEOContent />

      <footer className="mt-12 mb-12 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
          <a
            href="https://github.com/jisteven-epfl/flibit-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 dark:text-slate-500 text-[10px] font-mono tracking-wider uppercase hover:text-blue-400 dark:hover:text-blue-500 transition-colors"
          >
            {t("footer.github")}
          </a>
          <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold">
          Built by{" "}
          <span className="text-blue-400 dark:text-blue-500">Steven Ji</span>{" "}
          using{" "}
          <span className="text-blue-400 dark:text-blue-500">
            Google Antigravity
          </span>{" "}
          2026 // MIT License
        </p>
      </footer>
    </div>
  );
}


export default function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    if (pathLang === "zh" && i18n.language !== "zh") {
      i18n.changeLanguage("zh");
    } else if (pathLang !== "zh" && i18n.language !== "en") {
      i18n.changeLanguage("en");
    }
  }, [location.pathname, i18n]);

  return (
    <>
      <SEO />
      <Routes>
        <Route path="/zh" element={<MainApp />} />
        <Route path="/" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
