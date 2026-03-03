import React from "react";

interface BitDisplayProps {
    binaryArray: number[];
    onBitClick: (id: number) => void;
    errorMessage: string;
    bitsLength: number;
}

const BitDisplay: React.FC<BitDisplayProps> = ({
    binaryArray,
    onBitClick,
    errorMessage,
    bitsLength,
}) => {
    return (
        <div className="w-full px-2">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Binary Conversion result:
                <span className="ml-2 text-red-400 normal-case font-normal italic">
                    {errorMessage}
                </span>
            </p>
            <ol className="flex flex-wrap gap-2 list-none p-0 select-none">
                {binaryArray.map((bit, i) => (
                    <BitButton
                        key={i}
                        bit={bit}
                        index={i}
                        totalBits={bitsLength}
                        onClick={() => onBitClick(i)}
                    />
                ))}
            </ol>
        </div>
    );
};

interface BitButtonProps {
    bit: number;
    index: number;
    totalBits: number;
    onClick: () => void;
}

const BitButton: React.FC<BitButtonProps> = ({
    bit,
    index,
    totalBits,
    onClick,
}) => {
    const bitId = `bit-${totalBits - index}`;

    return (
        <li className="flex flex-col items-center gap-1">
            <button
                id={bitId}
                onClick={onClick}
                className={`
          w-12 h-12
          flex items-center justify-center
          rounded-lg font-mono font-bold transition-all
          border-none 
          outline-none
          cursor-pointer
          active:scale-95
          ${bit === 1 ? "bg-blue-300 text-white" : "bg-slate-100 text-slate-400"}`}
            >
                {bit}
            </button>
            <label
                htmlFor={bitId}
                className="text-[10px] font-mono text-slate-400 cursor-pointer select-none"
            >
                {totalBits - index}
            </label>
        </li>
    );
};

export default BitDisplay;
