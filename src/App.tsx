import { useState } from "react";
import InputArea from "./InputArea";
import BitDisplay from "./BitDisplay";
import ConvertModeButton from "./ConvertModeButton";

function App() {
  const [bitsLength, setBitsLength] = useState<8 | 16 | 32>(8);
  const [isSigned, setIsSigned] = useState<boolean>(false);

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
  const binaryArray = toBinary(isInputParsable ? (inputNumber as number) : 0);

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
    const newArray =
      inputNumber === "" ? Array(bitsLength).fill(0) : [...binaryArray];
    newArray[id] = binaryArray[id] ^ 1;

    let newNumber = newArray.reduce((acc, bit) => (acc << 1) | bit, 0);

    if (isSigned && newArray[0] === 1) {
      newNumber = newNumber - Math.pow(2, bitsLength);
    }
    setInputNumber(newNumber);
  }

  /////////////////////// Helper functions /////////////////////////////////

  function toBinary(n: number): Array<number> {
    const bits = Array.from({ length: bitsLength }, (_, i) => {
      const shiftAmount = bitsLength - 1 - i;
      return (n >>> shiftAmount) & 1;
    });
    return bits;
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
    <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-slate-200 overflow-hidden border border-slate-100">
        <div className="bg-blue-300 py-6 px-4">
          <h1 className="text-center font-black text-white text-xl uppercase tracking-widest">
            Flibit Converter
          </h1>
          <p className="text-center text-blue-50/80 text-sm mt-2 font-medium tracking-wide">
            A simple binary converter that let's you <span className="text-white underline decoration-blue-200 underline-offset-4">directly play</span> with bits.
  </p>
        </div>

        <div className="p-6 flex flex-col gap-2">
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
          />

          <div className="h-px bg-slate-100 my-4 mx-2" />

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
          <div className="h-px w-8 bg-slate-300" />
          <a 
            href="https://github.com/jisteven-epfl/flibit-converter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 text-[10px] font-mono tracking-wider uppercase hover:text-blue-400 transition-colors"
          >
            Open Source on GitHub
          </a>
          <div className="h-px w-8 bg-slate-300" />
        </div>
        <p className="text-slate-400 text-[10px] font-bold">
          Built by <span className="text-blue-400">Steven Ji</span> using <span className="text-blue-400">Google Antigravity</span> 2026 // MIT License
        </p>
      </footer>
    </div>

  );
}

export default App;
