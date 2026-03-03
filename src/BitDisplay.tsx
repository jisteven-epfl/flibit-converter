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
    const [copied, setCopied] = React.useState(false);

    const handleCopyBinary = () => {
        const binaryString = binaryArray.join("");
        navigator.clipboard.writeText(binaryString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const chunks = [];
    for (let i = 0; i < binaryArray.length; i += 8) {
        chunks.push(binaryArray.slice(i, i + 8));
    }


    return (
        <div className="w-full px-2">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Binary Result
                    <span className="ml-2 text-red-400 normal-case font-normal italic text-[10px]">
                        {errorMessage}
                    </span>
                </p>
                <button
                    onClick={handleCopyBinary}
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-500 transition-colors uppercase tracking-tight cursor-pointer"
                >
                    {copied ? "✓ Copied!" : "Copy Bits"}
                </button>
            </div>

            <div className="flex flex-col gap-6 select-none">
                {chunks.map((chunk, chunkIndex) => (
                    <div key={chunkIndex} className="flex flex-col gap-2">
                        {/* 组标签：可选，显示这是第几组（LSB/MSB） */}
                        {chunks.length > 1 && (
                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                                Byte {chunks.length - 1 - chunkIndex} ({8 * (chunks.length - 1 - chunkIndex) + 7} - {8 * (chunks.length - 1 - chunkIndex)})
                            </span>
                        )}

                        <ol className="flex flex-nowrap justify-center gap-1 sm:gap-2 list-none p-0 w-full">
                            {chunk.map((bit, i) => {
                                // 计算在原始数组中的真实索引
                                const originalIndex = chunkIndex * 8 + i;
                                return (
                                    <BitButton
                                        key={originalIndex}
                                        bit={bit}
                                        index={originalIndex}
                                        totalBits={bitsLength}
                                        onClick={() => onBitClick(originalIndex)}
                                    />
                                );
                            })}
                        </ol>
                    </div>
                ))}
            </div>
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
    const bitId = `bit-${totalBits - index - 1}`;

    return (
        <li className="flex-1 flex flex-col items-center gap-1 max-w-[48px]">
            <button
                id={bitId}
                onClick={onClick}
                className={`
          w-full aspect-square
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
                {totalBits - index - 1}
            </label>
        </li>
    );
};

export default BitDisplay;
