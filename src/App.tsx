import { useState } from "react";

function App() {
  const bitsLength = 8;
  const maxConvertNumber = Math.pow(2, bitsLength) - 1;
  const maxInputNumber = Number.MAX_SAFE_INTEGER;

  const [inputNumber, setInputNumber] = useState<number | "">("");
  const isInputEmpty = inputNumber === "";
  const isInputNoneInteger = !Number.isInteger(inputNumber);
  const isInputTooBig = !isInputEmpty && inputNumber > maxInputNumber;
  const isTooBigToConvert = !isInputEmpty && inputNumber > maxConvertNumber;
  const isInputValid = !(isInputEmpty || isInputNoneInteger || isInputTooBig);
  const binaryArray = toBinary(isInputValid ? (inputNumber as number) : 0);

  /////////////////////// Handle interaction /////////////////////////////////

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newValueAsNumber = Number(newValue);
    setInputNumber(newValueAsNumber);
  };

  function handleClick(id: number) {
    const newArray =
      inputNumber === "" ? Array(bitsLength).fill(0) : [...binaryArray];
    newArray[id] = binaryArray[id] ^ 1;

    const newNumber = newArray.reduce((acc, bit) => (acc << 1) | bit, 0);
    setInputNumber(newNumber);
  }

  /////////////////////// Helper functions /////////////////////////////////

  function toBinary(n: number): Array<number> {
    const bits = Array.from({ length: bitsLength }, (_, i) => {
      const shiftAmount = bitsLength - 1 - i;
      return (n >> shiftAmount) & 1;
    });
    return bits;
  }

  const getErrorMessage = () => {
    switch (true) {
      case isInputEmpty:
        return "empty input";
      case isInputNoneInteger:
        return "input is not integer";
      case isInputTooBig:
        return "input is too big too handle";
      case isTooBigToConvert:
        return `input is too big too display, only took ${bitsLength} LSB`;
      default:
        return "";
    }
  };

  /////////////////////// Actual Body /////////////////////////////////

  return (
    <div>
      <p
        className="
          w-full
          py-4
          text-center
          font-bold
          bg-blue-300"
      >
        Online Binary Converter
      </p>
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
            if ([".", "e", "E", "-", "+"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          max={maxInputNumber}
          min={0}
          onChange={handleInput}
          placeholder="Type an integer from 0 to 255…"
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
      <div
        className="
          w-full
          px-2"
      >
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          Binary Conversion result:
          {
            <span className="ml-2 text-red-400 normal-case font-normal italic">
              {getErrorMessage()}
            </span>
          }
        </p>
        <ol className="flex flex-wrap gap-2 list-none p-0 select-none">
          {binaryArray.map((bit, i) => {
            const bitId = `bit-${bitsLength - i}`;

            return (
              <li key={i} className="flex flex-col items-center gap-1">
                <button
                  id={bitId}
                  onClick={() => handleClick(i)}
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
                  {bitsLength - i}
                </label>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
