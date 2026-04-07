import { useTranslation, Trans } from "react-i18next";

export default function SEOContent() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mt-16 px-6 py-12 border-t border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400">
      <div className="flex flex-col gap-16">
        
        {/* Row 1: Left Text, Right Card */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <section className="flex-1">
            <h2 className="text-2xl font-black mb-4 text-slate-800 dark:text-slate-200 tracking-tight">{t("seo.binaryConverter.title")}</h2>
            <p className="mb-4 leading-relaxed text-lg"><Trans i18nKey="seo.binaryConverter.p1" /></p>
            <p className="leading-relaxed opacity-80"><Trans i18nKey="seo.binaryConverter.p2" /></p>
          </section>
          <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <div className="h-40 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 flex flex-col items-center justify-center border border-blue-200/50 dark:border-blue-800/50">
              <span className="font-mono text-4xl text-blue-500 font-bold opacity-80">0110011</span>
              <span className="text-sm font-medium mt-2 text-blue-600 dark:text-blue-400 uppercase tracking-widest">Multi-base Logic</span>
            </div>
          </div>
        </div>

        {/* Row 2: Left Card, Right Text */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <section className="flex-1">
            <h2 className="text-2xl font-black mb-4 text-slate-800 dark:text-slate-200 tracking-tight">{t("seo.twosComplement.title")}</h2>
            <p className="mb-4 leading-relaxed text-lg"><Trans i18nKey="seo.twosComplement.p1" /></p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed opacity-80">
              <li><Trans i18nKey="seo.twosComplement.unsigned" /></li>
              <li><Trans i18nKey="seo.twosComplement.signed" /></li>
            </ul>
          </section>
          <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <div className="h-40 rounded-xl bg-gradient-to-br from-pink-100 to-rose-50 dark:from-pink-900/40 dark:to-rose-900/20 flex flex-col items-center justify-center border border-pink-200/50 dark:border-pink-800/50">
              <span className="font-mono text-4xl text-pink-500 font-bold opacity-80">-128 to 127</span>
              <span className="text-sm font-medium mt-2 text-pink-600 dark:text-pink-400 uppercase tracking-widest">Two's Complement</span>
            </div>
          </div>
        </div>

        {/* Row 3: Left Text, Right Card */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <section className="flex-1">
            <h2 className="text-2xl font-black mb-4 text-slate-800 dark:text-slate-200 tracking-tight">{t("seo.bitWidths.title")}</h2>
            <p className="mb-4 leading-relaxed text-lg"><Trans i18nKey="seo.bitWidths.p1" /></p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed text-sm opacity-80">
              <li><Trans i18nKey="seo.bitWidths.8bit" /></li>
              <li><Trans i18nKey="seo.bitWidths.16bit" /></li>
              <li><Trans i18nKey="seo.bitWidths.32bit" /></li>
            </ul>
          </section>
          <div className="flex-1 w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <div className="h-40 rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-50 dark:from-purple-900/40 dark:to-fuchsia-900/20 flex flex-col items-center justify-center border border-purple-200/50 dark:border-purple-800/50">
               <span className="font-mono text-4xl text-purple-500 font-bold opacity-80">8|16|32</span>
               <span className="text-sm font-medium mt-2 text-purple-600 dark:text-purple-400 uppercase tracking-widest">Bit Widths</span>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">{t("seo.terms.title")}</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {(t("seo.terms.list", { returnObjects: true }) as string[]).map((term) => (
            <span key={term} className="px-3 py-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400">
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
