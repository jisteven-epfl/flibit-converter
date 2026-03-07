import React from "react";

interface InputAreaProps {
    inputNumber: number | "";
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxInputNumber: number;
    minInputNumber: number;
    maxConvertNumber: number;
    minConvertNumber: number;
}

const InputArea: React.FC<InputAreaProps> = ({
    inputNumber,
    onInputChange,
    maxInputNumber,
    minInputNumber,
    maxConvertNumber,
    minConvertNumber,
}) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        if (inputNumber === "") return;
        navigator.clipboard.writeText(inputNumber.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mx-2 my-2">
            <div className="flex justify-between items-center mb-1">
                <label
                    htmlFor="decimal-input"
                    className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer"
                >
                    Decimal Value
                </label>
                <button
                    onClick={handleCopy}
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-colors uppercase tracking-tight cursor-pointer"
                >
                    {copied ? "✓ Copied!" : "Copy"}
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
                placeholder={`Type an integer from ${minConvertNumber} to ${maxConvertNumber}`}
                id="decimal-input"
                name="decimal"
                className="
          w-full
          min-w-0
          py-2
          px-2
          text-lg
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          border
          border-slate-200
          dark:border-slate-700
          rounded-lg
          focus:ring-2
          focus:ring-blue-300
          dark:focus:ring-blue-500
          focus:border-transparent
          focus:outline-none
          placeholder:text-slate-300
          dark:placeholder:text-slate-600
          transition-all"
            />
        </div>
    );
};

export default InputArea;
