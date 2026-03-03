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

      <BitDisplay
        binaryArray={binaryArray}
        onBitClick={handleClick}
        errorMessage={getErrorMessage}
        bitsLength={bitsLength}
      />
    </div>
  );
}

export default App;
