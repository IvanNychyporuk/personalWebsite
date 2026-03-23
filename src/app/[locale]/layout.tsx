import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, LOCALES } from "@/lib/i18n";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const { locale } = resolved;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      {children}
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
