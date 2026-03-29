import { useTranslation } from "react-i18next";

export default function SEOContent() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mt-16 px-6 py-12 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{t("seo.binaryConverter.title")}</h2>
          <p className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seo.binaryConverter.p1") }} />
          <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seo.binaryConverter.p2") }} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{t("seo.twosComplement.title")}</h2>
          <p className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seo.twosComplement.p1") }} />
          <ul className="list-disc pl-5 space-y-2 leading-relaxed">
            <li dangerouslySetInnerHTML={{ __html: t("seo.twosComplement.unsigned") }} />
            <li dangerouslySetInnerHTML={{ __html: t("seo.twosComplement.signed") }} />
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{t("seo.bitWidths.title")}</h2>
          <p className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seo.bitWidths.p1") }} />
          <ul className="list-disc pl-5 space-y-2 leading-relaxed text-sm">
            <li dangerouslySetInnerHTML={{ __html: t("seo.bitWidths.8bit") }} />
            <li dangerouslySetInnerHTML={{ __html: t("seo.bitWidths.16bit") }} />
            <li dangerouslySetInnerHTML={{ __html: t("seo.bitWidths.32bit") }} />
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{t("seo.whyFlibit.title")}</h2>
          <p className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("seo.whyFlibit.p1") }} />
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">{t("seo.terms.title")}</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {(t("seo.terms.list", { returnObjects: true }) as string[]).map((term) => (
            <span key={term} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400">
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
