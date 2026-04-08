import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFlibitStore, useFlibitDerived } from "../../store/useFlibitStore";

const baseConfig = {
  10: { text: "text-blue-500", border: "border-blue-300 dark:border-blue-500/50", ring: "focus:ring-blue-300", label: "DEC", prefix: "" },
  2:  { text: "text-purple-500", border: "border-purple-300 dark:border-purple-500/50", ring: "focus:ring-purple-300", label: "BIN", prefix: "" },
  8:  { text: "text-pink-500", border: "border-pink-300 dark:border-pink-500/50", ring: "focus:ring-pink-300", label: "OCT", prefix: "" },
  16: { text: "text-orange-500", border: "border-orange-300 dark:border-orange-500/50", ring: "focus:ring-orange-300", label: "HEX", prefix: "" },
};

const InputArea: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const inputString = useFlibitStore((s) => s.inputString);
  const currentBase = useFlibitStore((s) => s.currentBase);
  const setCurrentBase = useFlibitStore((s) => s.setCurrentBase);
  const onInputChange = useFlibitStore((s) => s.handleInputChange);
  const onInputBlur = useFlibitStore((s) => s.handleInputBlur);
  const onInputKeyDown = useFlibitStore((s) => s.handleInputKeyDown);

  const { hasError } = useFlibitDerived();

  const handleCopy = async () => {
    if (inputString === "") return;
    try {
      await navigator.clipboard.writeText(inputString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const cycleBase = () => {
    let nextBase: 10 | 16 | 8 | 2 = 10;
    if (currentBase === 10) nextBase = 2;
    else if (currentBase === 2) nextBase = 8;
    else if (currentBase === 8) nextBase = 16;
    
    setCurrentBase(nextBase);

    // Trigger bouncy effect
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 200);
  };

  const currentConfig = baseConfig[currentBase];

  const inputClassName = [
    "w-full",
    "min-w-0",
    "py-2.5",
    "pr-3",
    "pl-2",
    "text-xl",
    "font-medium",
    "bg-transparent",
    "text-slate-900",
    "dark:text-white",
    "focus:outline-none",
    "placeholder:text-slate-300",
    "dark:placeholder:text-slate-600",
    "transition-all",
    "tracking-widest",
  ].join(" ");

  const wrapperClassName = [
    "flex items-center w-full bg-white dark:bg-slate-800",
    "border-2",
    "rounded-xl",
    "transition-all duration-300",
    hasError
      ? "border-red-400 dark:border-red-500 shadow-[0_0_15px_rgba(248,113,113,0.3)]"
      : `${currentConfig.border}`,
  ].join(" ");

  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor="multi-base-input"
          className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1"
        >
          {t("inputArea.label", { base: t(`inputArea.baseName.${currentBase}`) })}
        </label>
        <button
          onClick={handleCopy}
          className="text-[10px] font-bold text-blue-400 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-colors uppercase tracking-tight cursor-pointer pr-1"
        >
          {copied ? t("inputArea.copied", "Copied!") : t("inputArea.copy", "Copy")}
        </button>
      </div>

      <div className={wrapperClassName}>
        {/* The Base Cycler Button */}
        <div className="relative pl-2 py-1 pr-1 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center">
          <button 
            onClick={cycleBase}
            className={`
              relative flex items-center justify-center h-10 w-20 px-2 rounded-lg 
              bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 
              transition-all duration-200 font-black tracking-widest uppercase
              active:scale-90
              ${currentConfig.text}
              ${isBouncing ? "scale-110 shadow-lg shadow-current/20" : "scale-100"}
            `}
          >
             {currentConfig.label}
          </button>
        </div>

        <input
          type="text"
          value={inputString}
          onKeyDown={(e) => {
            if (currentBase === 10 && [".", "e", "E", "+"].includes(e.key)) {
              e.preventDefault();
            }
            if (onInputKeyDown) onInputKeyDown(e);
          }}
          onBlur={onInputBlur}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="0"
          id="multi-base-input"
          name="multiBase"
          className={inputClassName}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default InputArea;
