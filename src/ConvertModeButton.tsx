import React from "react";

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
    return (
        <div className="flex flex-col gap-3 mx-2 p-2 bg-slate-50 rounded-xl">
            {/* Row 1: Width Selection */}
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase w-10">Width</span>
                <div className="flex gap-2">
                    {[8, 16, 32].map(mode => (
                        <button
                            key={mode}
                            aria-pressed={currentMode === mode}
                            onClick={() => onModeChange(mode as 8 | 16 | 32)}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${currentMode === mode ? 'bg-blue-300 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {mode}-bit
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 2: Signed Mode Selection */}
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase w-10">Type</span>
                <div className="flex gap-2">
                    {["unsigned", "signed"].map(mode => (
                        <button
                            key={mode}
                            aria-pressed={isSigned === (mode === "signed")}
                            onClick={() => onSignedChange(mode === "signed")}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${isSigned === (mode === "signed") ? 'bg-blue-300 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 3: Click Action Selection */}
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase w-10">Action</span>
                <div className="flex gap-2">
                    {["flip", "add"].map(mode => (
                        <button
                            key={mode}
                            aria-pressed={clickMode === mode}
                            onClick={() => onClickModeChange(mode as "flip" | "add")}
                            className={`px-3 py-1 text-sm rounded-md transition-all font-medium ${clickMode === mode ? 'bg-blue-300 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'
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

