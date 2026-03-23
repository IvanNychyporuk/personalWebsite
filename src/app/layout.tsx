import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import { headers } from "next/headers";
import { BlobBackground } from "@/components/BlobBackground";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Ivan Nychyporuk",
    template: "%s | Ivan Nychyporuk",
  },
  description:
    "AI Media / Content Designer & Creator. AI integration consultant. Former VFX compositing artist with 15+ years in film and advertising.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const locale = hdrs.get("x-locale") ?? "en";

  return (
    <html lang={locale}>
      <body className={`${sans.variable} ${serif.variable}`}>
        {/* Animated interactive blob background */}
        <BlobBackground />
        <div className="pageRoot">{children}</div>
      </body>
    </html>
  );
}
