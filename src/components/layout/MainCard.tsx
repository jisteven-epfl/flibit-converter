import InputArea from '../converter/InputArea';
import ConvertModeButton from '../converter/ConvertModeButton';
import BitDisplay from '../converter/BitDisplay';

export default function MainCard() {
  return (
    <div className="w-full relative p-6 bg-transparent">
      <InputArea />
      <ConvertModeButton />
      <div className="h-px bg-slate-200/50 dark:bg-slate-800/50 my-4 mx-2" />
      <BitDisplay />
    </div>
  );
}
