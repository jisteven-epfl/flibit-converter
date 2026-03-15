import { useState, useEffect } from "react";
import InputArea from "./InputArea";
import BitDisplay from "./BitDisplay";
import ConvertModeButton from "./ConvertModeButton";
import { FlipBitInteractive } from "./interactive_logo";
import { toBinary, toSigned, toUnsigned, simulateHardwareTruncation } from "./utils/math";

function App() {
  const [bitsLength, setBitsLength] = useState<8 | 16 | 32>(8);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("flibit-theme");
      return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("flibit-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("flibit-theme", "light");
    }
  }, [isDarkMode]);
  const [clickMode, setClickMode] = useState<"flip" | "add">("flip");

  const minConvertNumber = isSigned ? -Math.pow(2, bitsLength - 1) : 0;
  const maxConvertNumber = isSigned
    ? Math.pow(2, bitsLength - 1) - 1
    : Math.pow(2, bitsLength) - 1;
  const maxInputNumber = Number.MAX_SAFE_INTEGER;
  const minInputNumber = Number.MIN_SAFE_INTEGER;

  const [inputNumber, setInputNumber] = useState<number | "">("");
  const isInputEmpty = inputNumber === "";
  const isInputNoneInteger = !Number.isInteger(inputNumber);
  const isInputTooBig = !isInputEmpty && inputNumber > maxInputNumber;
  const isInputTooSmall = !isInputEmpty && inputNumber < minInputNumber;
  const isTooBigToConvert = !isInputEmpty && inputNumber > maxConvertNumber;
  const isTooSmallToConvert = !isInputEmpty && inputNumber < minConvertNumber;
  const isInputParsable =
    !(isInputEmpty ||
      isInputNoneInteger ||
      isInputTooBig ||
      isInputTooSmall);
  const binaryArray = toBinary(isInputParsable ? (inputNumber as number) : 0, bitsLength);

  /////////////////////// Handle interaction /////////////////////////////////

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setInputNumber("");
      return;
    }

    const newValueAsNumber = Number(newValue);
    setInputNumber(newValueAsNumber);
  };

  function handleClick(id: number) {
    if (clickMode === "add") {
      const position = bitsLength - 1 - id;
      const addValue = Math.pow(2, position);
      const currentValue = inputNumber === "" ? 0 : (inputNumber as number);

      // 1. Convert current value to pure unsigned binary equivalent
      const unsignedCurrent = toUnsigned(currentValue, bitsLength);

      // 2. Perform raw mathematical addition
      const rawNewNumber = unsignedCurrent + addValue;

      // 3. Perfect Hardware Truncation (using BigInt to avoid JS 32-bit bitwise limits)
      const truncatedNumber = simulateHardwareTruncation(rawNewNumber, bitsLength);

      // 4. Convert back to Signed representation if necessary
      const finalNumber = isSigned ? toSigned(truncatedNumber, bitsLength) : truncatedNumber;

      setInputNumber(finalNumber);
    } else {
      // Flip mode: Purely toggle the bit without carrying over
      const newArray = [...binaryArray];
      newArray[id] ^= 1; // Toggle the specific bit

      let newNumber = newArray.reduce((acc, bit) => (acc * 2) + bit, 0);

      // In signed mode, interpret the most significant bit (MSB) as negative weight
      if (isSigned && newArray[0] === 1) {
        newNumber = newNumber - Math.pow(2, bitsLength);
      }

      setInputNumber(newNumber);
    }
  }

  const getErrorMessage =
    isInputEmpty ? "Empty input." :
      isInputNoneInteger ? "Input is not integer." :
        isInputTooBig ? "Input is too big too handle." :
          isInputTooSmall ? "Input is too small too handle." :
            (!isSigned && (inputNumber as number) < 0) ? "Negative input: Displaying bits as interpreted by the hardware." :
              isTooBigToConvert ? `Input is too big too display, only took ${bitsLength} LSB.` :
                isTooSmallToConvert ? `Input is too small too display, only took ${bitsLength} LSB.` :
                  "";

  /////////////////////// Actual Body /////////////////////////////////

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 flex flex-col items-center transition-colors duration-500">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="bg-blue-300 dark:bg-blue-600 py-6 px-6 flex flex-col items-start sm:items-center relative">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors border border-white/20"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M22 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
            )}
          </button>
          <div className="flex items-start sm:items-center justify-start sm:justify-center sm:ml-12">
            <h1 className="font-black text-white text-xl uppercase tracking-widest mt-1 flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-3 leading-tight">
              <span>Flibit</span>
              <span className="flex items-center gap-1.5">
                Converter
                <FlipBitInteractive />
              </span>
            </h1>
          </div>
          <p className="text-left sm:text-center text-blue-50/80 dark:text-blue-100/70 text-sm mt-2 font-medium tracking-wide">
            A simple binary converter that lets you intuitively{" "}
            <span className="sm:text-white sm:underline sm:decoration-blue-200 sm:dark:decoration-blue-400 sm:underline-offset-4 transition-all">
              play<span className="hidden sm:inline"> ↑</span>
            </span>{" "}
            with bits.
          </p>
        </div>

        {/* hidden span for screen readers to announce errors immediately */}
        <span role="alert" aria-live="polite" className="sr-only">
          {getErrorMessage}
        </span>

        <div className="p-6 flex flex-col gap-2 bg-white dark:bg-slate-900 transition-colors">
          <InputArea
            inputNumber={inputNumber}
            onInputChange={handleInput}
            maxInputNumber={maxInputNumber}
            minInputNumber={minInputNumber}
            maxConvertNumber={maxConvertNumber}
            minConvertNumber={minConvertNumber}
          />

          <ConvertModeButton
            currentMode={bitsLength}
            onModeChange={setBitsLength}
            isSigned={isSigned}
            onSignedChange={setIsSigned}
            clickMode={clickMode}
            onClickModeChange={setClickMode}
          />

          <div className="h-px bg-slate-100 dark:bg-slate-800 my-4 mx-2" />

          <BitDisplay
            binaryArray={binaryArray}
            onBitClick={handleClick}
            errorMessage={getErrorMessage}
            bitsLength={bitsLength}
          />
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
          <a
            href="https://github.com/jisteven-epfl/flibit-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 dark:text-slate-500 text-[10px] font-mono tracking-wider uppercase hover:text-blue-400 dark:hover:text-blue-500 transition-colors"
          >
            Open Source on GitHub
          </a>
          <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold">
          Built by <span className="text-blue-400 dark:text-blue-500">Steven Ji</span> using <span className="text-blue-400 dark:text-blue-500">Google Antigravity</span> 2026 // MIT License
        </p>
      </footer>
    </div>
  );
}

export default App;
