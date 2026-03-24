export default function SEOContent() {
  return (
    <div className="w-full max-w-4xl mt-16 px-6 py-12 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">What is a Binary Converter?</h2>
          <p className="mb-4 leading-relaxed">
            A <strong>binary converter</strong> is a tool that translates decimal numbers (the base-10 number system we use every day) into binary (base-2), the language of computers. 
            Computers store all information—from text to images—as a series of 0s and 1s, also known as <strong>bits</strong>.
          </p>
          <p className="leading-relaxed">
            Flibit Converter goes beyond basic conversion by letting you <strong>interact with individual bits</strong>. This visual approach helps students and developers 
            understand how changing a single bit affects the overall value of a number.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">How Two's Complement Works</h2>
          <p className="mb-4 leading-relaxed">
            In computing, we often need to represent negative numbers. The most common method is <strong>Two's Complement</strong>. 
            In this system, the <strong>Most Significant Bit (MSB)</strong> is used as a sign bit.
          </p>
          <ul className="list-disc pl-5 space-y-2 leading-relaxed">
            <li><strong>Unsigned:</strong> All bits represent positive values (e.g., bits 0-7 in an 8-bit number represent 1, 2, 4, 8, 16, 32, 64, 128).</li>
            <li><strong>Signed:</strong> The MSB represents a negative value (e.g., -128 in an 8-bit number), while the other bits remain positive.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">8-bit, 16-bit, and 32-bit conversion</h2>
          <p className="mb-4 leading-relaxed">
            The <strong>bit-width</strong> determines the range of numbers a computer can represent:
          </p>
          <ul className="list-disc pl-5 space-y-2 leading-relaxed text-sm">
            <li><strong>8-bit:</strong> 0 to 255 (unsigned) or -128 to 127 (signed).</li>
            <li><strong>16-bit:</strong> 0 to 65,535 (unsigned) or -32,768 to 32,767 (signed).</li>
            <li><strong>32-bit:</strong> 0 to over 4 billion (unsigned) or -2.1 billion to 2.1 billion (signed).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Why use Flibit Converter?</h2>
          <p className="mb-4 leading-relaxed">
            Many online converters are static. Flibit was designed for <strong>educational exploration</strong>. The "Paint-to-Toggle" feature allows you to swipe across 
            multiple bits to see patterns emerge instantly. It's the perfect <strong>bit flip tool</strong> for debugging low-level code or teaching computer architecture.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">Common Binary Conversion Terms:</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {["LSB", "MSB", "Bit Flipping", "Endianness", "Binary-to-Decimal", "Signed Integer", "Unsigned Integer", "Hexadecimal", "Computer Architecture", "Two's Complement Calculator"].map((term) => (
            <span key={term} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400">
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
