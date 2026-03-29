import React from "react";
import { useTranslation } from "react-i18next";

interface InputAreaProps {
  inputNumber: number | "";
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxInputNumber: number;
  minInputNumber: number;
  maxConvertNumber: number;
  minConvertNumber: number;
  hasError?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
  inputNumber,
  onInputChange,
  maxInputNumber,
  minInputNumber,
  maxConvertNumber,
  minConvertNumber,
  hasError = false,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (inputNumber === "") return;
    
    try {
      await navigator.clipboard.writeText(String(inputNumber));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const inputClassName = [
    "w-full",
    "min-w-0",
    "py-2",
    "px-2",
    "text-lg",
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-900",
    "dark:text-white",
    "border",
    hasError
      ? "border-red-400 dark:border-red-500"
      : "border-slate-200 dark:border-slate-700",
    "rounded-lg",
    "focus:ring-2",
    hasError
      ? "focus:ring-red-300 dark:focus:ring-red-900"
      : "focus:ring-blue-300 dark:focus:ring-blue-500",
    "focus:border-transparent",
    "focus:outline-none",
    "placeholder:text-slate-300",
    "dark:placeholder:text-slate-600",
    "transition-all",
  ].join(" ");

  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor="decimal-input"
          className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
        >
          {t("inputArea.label")}
        </label>
        <button
          onClick={handleCopy}
          className="text-[10px] font-bold text-blue-400 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-colors uppercase tracking-tight cursor-pointer"
        >
          {copied ? t("inputArea.copied") : t("inputArea.copy")}
        </button>
      </div>
      <input
        type="number"
        step="1"
        value={inputNumber}
        onKeyDown={(e) => {
          if ([".", "e", "E", "+"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        max={maxInputNumber}
        min={minInputNumber}
        onChange={onInputChange}
        placeholder={t("inputArea.placeholder", { min: minConvertNumber, max: maxConvertNumber })}
        id="decimal-input"
        name="decimal"
        className={inputClassName}
      />
    </div>
  );
};

export default InputArea;
