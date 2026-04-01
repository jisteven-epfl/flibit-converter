import React from "react";
import { useTranslation } from "react-i18next";
import { useFlibitStore, useFlibitDerived } from "../../store/useFlibitStore";

const BitDisplay: React.FC = () => {
    const { t } = useTranslation();
    const [copied, setCopied] = React.useState(false);

    const bitsLength = useFlibitStore(s => s.bitsLength);
    const onBitClick = useFlibitStore(s => s.handleBitClick);
    const {
        binaryArray,
        isInputEmpty,
        isInputNonInteger,
        isInputTooBig,
        isInputTooSmall,
        isTooBigToConvert,
        isTooSmallToConvert,
        isNegativeUnsigned
    } = useFlibitDerived();

    const errorMessage = isInputEmpty 
        ? "" 
        : isInputNonInteger 
            ? t("errors.notInteger", "Value must be an integer")
            : isInputTooBig
                ? t("errors.tooBig", "Value exceeds system limits")
                : isInputTooSmall
                    ? t("errors.tooSmall", "Value is below system limits")
                    : isNegativeUnsigned
                        ? t("errors.negativeUnsigned", "Unsigned cannot be negative")
                        : isTooBigToConvert
                            ? t("errors.tooBigToConvert", { bits: bitsLength, defaultValue: `Too big for ${bitsLength} bits` })
                            : isTooSmallToConvert
                                ? t("errors.tooSmallToConvert", { bits: bitsLength, defaultValue: `Too small for ${bitsLength} bits` })
                                : "";


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
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider" aria-hidden="true">
                    {t("bitDisplay.label")}
                    <span className="ml-2 text-red-400 normal-case font-normal italic text-[10px]">
                        {errorMessage}
                    </span>
                </p>
                <button
                    onClick={handleCopyBinary}
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-colors uppercase tracking-tight cursor-pointer"
                >
                    {copied ? t("bitDisplay.copied") : t("bitDisplay.copyBits")}
                </button>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-3 -mt-1 italic">
                {t("bitDisplay.tip")}
            </p>

            <div className="flex flex-col gap-6 select-none">
                {chunks.map((chunk, chunkIndex) => (
                    <div key={chunkIndex} className="flex flex-col gap-2">
                        {/* 组标签：可选，显示这是第几组（LSB/MSB） */}
                        {chunks.length > 1 && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                                {t("bitDisplay.byteLabel", {
                                    index: chunks.length - 1 - chunkIndex,
                                    high: 8 * (chunks.length - 1 - chunkIndex) + 7,
                                    low: 8 * (chunks.length - 1 - chunkIndex),
                                })}
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
    const { t } = useTranslation();
    const bitId = `bit-${totalBits - index - 1}`;

    return (
        <li className="flex-1 flex flex-col items-center gap-1 max-w-[48px]">
            <button
                id={bitId}
                aria-label={t("bitDisplay.bitAriaLabel", { position: totalBits - index - 1, value: bit })}
                onMouseDown={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                onMouseEnter={(e) => {
                    if (e.buttons === 1) {
                        onClick();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick();
                    }
                }}
                onDragStart={(e) => e.preventDefault()}
                className="relative w-full aspect-square border-none outline-none cursor-pointer group"
                style={{ perspective: '600px' }}
            >
                <div
                    className="w-full h-full absolute top-0 left-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: bit === 1 ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    {/* Front Face (0) */}
                    <div
                        className="w-full h-full absolute top-0 left-0 flex items-center justify-center rounded-lg font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-active:scale-95 transition-transform"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        0
                    </div>

                    {/* Back Face (1) */}
                    <div
                        className="w-full h-full absolute top-0 left-0 flex items-center justify-center rounded-lg font-mono font-bold bg-blue-300 dark:bg-blue-600 text-white group-active:scale-95 transition-transform shadow-[0_0_15px_rgba(147,197,253,0.3)] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        1
                    </div>
                </div>
            </button>
            <label
                htmlFor={bitId}
                className="text-[10px] font-mono text-slate-400 dark:text-slate-500 cursor-pointer select-none"
            >
                {totalBits - index - 1}
            </label>
        </li>
    );
};

export default BitDisplay;
