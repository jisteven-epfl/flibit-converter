import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputArea from "./components/converter/InputArea";
import BitDisplay from "./components/converter/BitDisplay";
import ConvertModeButton from "./components/converter/ConvertModeButton";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import { FlipBitInteractive } from "./components/common/interactive_logo";
import { useFlibitDerived, useFlibitStore } from "./store/useFlibitStore";
import SEOContent from "./components/layout/SEOContent";

function App() {
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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 flex flex-col items-center transition-colors duration-500">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="bg-blue-300 dark:bg-blue-600 py-6 px-6 flex flex-col items-start sm:items-center relative">
          <LanguageSwitcher />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors border border-white/20"
            title={isDarkMode ? t("header.themeToggle.toLight") : t("header.themeToggle.toDark")}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M22 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <div className="flex items-start sm:items-center justify-start sm:justify-center sm:ml-12">
            <h1 className="font-black text-white text-xl uppercase tracking-widest mt-1 flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-3 leading-tight">
              <span>Flibit</span>
              <span className="flex items-center gap-1.5">
                Converter
                <FlipBitInteractive />
              </span>
            </h1>
          </div>
          <p className="text-left sm:text-center text-blue-50/80 dark:text-blue-100/70 text-sm mt-2 font-medium tracking-wide">
            {t("header.subtitle")}
          </p>
        </div>

        <span role="alert" aria-live="polite" className="sr-only">
          {getErrorMessage}
        </span>

        <div className="p-6 flex flex-col gap-2 bg-white dark:bg-slate-900 transition-colors">
          <InputArea />
          <ConvertModeButton />
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-4 mx-2" />
          <BitDisplay />
        </div>
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

export default App;
