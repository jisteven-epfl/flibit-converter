import React from "react";

interface ConvertModeButtonProps {
    currentMode: number;
    onModeChange: (mode: 8 | 16 | 32) => void;
    isSigned: boolean;
    onSignedChange: (isSigned: boolean) => void;
}

const ConvertModeButton: React.FC<ConvertModeButtonProps> = ({
    currentMode,
    onModeChange,
    isSigned,
    onSignedChange,
}) => {
    return (
        <div className="flex flex-col gap-3 mx-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors">
            {/* Row 1: Width Selection */}
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase w-10">Width</span>
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
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase w-10">Type</span>
                <div className="flex gap-2">
                    {["unsigned", "signed"].map(mode => (
                        <button
                            key={mode}
                            aria-pressed={isSigned === (mode === "signed")}
                            onClick={() => onSignedChange(mode === "signed")}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${isSigned === (mode === "signed")
                                ? 'bg-blue-300 dark:bg-blue-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-700'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConvertModeButton;

