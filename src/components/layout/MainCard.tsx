import { useState } from 'react';
import InputArea from '../converter/InputArea';
import ConvertModeButton from '../converter/ConvertModeButton';
import BitDisplay from '../converter/BitDisplay';

export default function MainCard() {
  // const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipped] = useState(false);

  return (
    <div className="relative w-full [perspective:1000px]">
      {/* Mode toggle button to trigger flip */}
      {/* 
      <button 
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute z-20 top-3 right-3 p-1.5 px-3 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors dark:text-blue-400 border border-blue-200 dark:border-blue-800"
        title="Toggle IEEE 754 Visualizer (Face B)"
      >
        {isFlipped ? "Back to Standard" : "IEEE 754 Visualizer"}
      </button>
      */}
      
      {/* Inner Container mapped mapped to preserve-3d */}
      <div 
        className="w-full relative transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Face A - Standard */}
        <div className="w-full [backface-visibility:hidden] p-6 bg-transparent">
          <InputArea />
          <ConvertModeButton />
          <div className="h-px bg-slate-200/50 dark:bg-slate-800/50 my-4 mx-2" />
          <BitDisplay />
        </div>
        
        {/* Face B - Specialized */}
        <div 
          className="absolute inset-0 w-full h-full p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl"
        >
          <div className="flex flex-col items-center justify-center h-full text-amber-600 dark:text-amber-400 border-2 border-amber-400/50 dark:border-amber-500/50 rounded-2xl bg-amber-500/5 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <h2 className="text-xl font-bold uppercase tracking-widest text-center">IEEE 754<br/>Visualizer</h2>
            <p className="text-sm mt-3 font-medium opacity-80 text-center px-4">Floating Point visualizer coming in Phase 3!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
