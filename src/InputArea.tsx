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
    return (
        <div className="mx-2 my-4">
            <label
                htmlFor="decimal-input"
                className="text-sm font-bold text-slate-500 uppercase tracking-wider cursor-pointer"
            >
                Decimal Value
            </label>
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
          py-2
          px-2
          border
          rounded-lg
          focus:ring-2
          focus:ring-blue-300
          focus:border-transparent
          focus:outline-none
          transition-all"
            />
        </div>
    );
};

export default InputArea;
