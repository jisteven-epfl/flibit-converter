import React from "react";

interface ConvertModeButtonProps {
    currentMode: number;
    onModeChange: (mode: 8 | 16 | 32) => void;
}

const ConvertModeButton: React.FC<ConvertModeButtonProps> = ({
    currentMode,
    onModeChange,
}) => {
    return (
        <div className="flex gap-4 mx-2 my-4 p-2 bg-slate-50 rounded-lg items-center">
            <span className="text-sm font-bold text-slate-500 uppercase">Mode:</span>
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
    )
}

export default ConvertModeButton;

