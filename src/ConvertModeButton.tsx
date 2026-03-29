import React from "react";
import { useTranslation } from "react-i18next";
import InfoTooltip from "./InfoTooltip";

interface ConvertModeButtonProps {
    currentMode: number;
    onModeChange: (mode: 8 | 16 | 32) => void;
    isSigned: boolean;
    onSignedChange: (isSigned: boolean) => void;
    clickMode: "flip" | "add";
    onClickModeChange: (mode: "flip" | "add") => void;
}

const ConvertModeButton: React.FC<ConvertModeButtonProps> = ({
    currentMode,
    onModeChange,
    isSigned,
    onSignedChange,
    clickMode,
    onClickModeChange,
}) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-3 mx-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors">
            {/* Row 1: Width Selection */}
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase w-16">
                    {t("controls.width.label")}
                    <InfoTooltip text={t("controls.width.tooltip")} />
                </span>
                <div className="flex gap-2">
                    {[8, 16, 32].map(mode => (
                        <button
                            key={mode}
                            aria-pressed={currentMode === mode}
                            onClick={() => onModeChange(mode as 8 | 16 | 32)}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${currentMode === mode
                                ? 'bg-blue-300 dark:bg-blue-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            {mode}-bit
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 2: Signed Mode Selection */}
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase w-16">
                    {t("controls.type.label")}
                    <InfoTooltip text={t("controls.type.tooltip")} />
                </span>
                <div className="flex gap-2">
                    {(["unsigned", "signed"] as const).map(mode => (
                        <button
                            key={mode}
                            aria-pressed={isSigned === (mode === "signed")}
                            onClick={() => onSignedChange(mode === "signed")}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${isSigned === (mode === "signed")
                                ? 'bg-blue-300 dark:bg-blue-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            {t(`controls.type.${mode}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 3: Click Action Selection */}
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase w-16">
                    {t("controls.action.label")}
                    <InfoTooltip text={t("controls.action.tooltip")} />
                </span>
                <div className="flex gap-2">
                    {(["flip", "add"] as const).map(mode => (
                        <button
                            key={mode}
                            aria-pressed={clickMode === mode}
                            onClick={() => onClickModeChange(mode)}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${clickMode === mode
                                ? 'bg-blue-300 dark:bg-blue-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            {t(`controls.action.${mode}`)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConvertModeButton;

