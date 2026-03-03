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
        <div className="flex flex-col gap-3 mx-2 p-2 bg-slate-50 rounded-xl">
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase w-10">Width</span>
                <div className="flex gap-2">
                    {[8, 16, 32].map(mode => (
                    <button 
                        key={mode}
                        onClick={() => onModeChange(mode as 8 | 16 | 32)}
                        className={`px-3 py-1 rounded ${currentMode === mode ? 'bg-blue-300 text-white' : 'bg-white'}`}
                    >
                        {mode}-bit
                    </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase w-10">Type</span>
                <div className="flex gap-2">
                    {["signed", "unsigned"].map(mode => (
                    <button
                        key={mode}
                        onClick={() => onSignedChange(mode === "signed")}
                        className={`px-3 py-1 rounded ${isSigned === (mode === "signed") ? 'bg-blue-300 text-white' : 'bg-white'}`}
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

