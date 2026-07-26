import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";
import { generateWebsiteSchema, generatePersonSchema } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.title} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: `${siteConfig.url}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-default.png`],
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': [
        {
          url: `${siteConfig.url}/rss.xml`,
          title: `${siteConfig.title} RSS Feed`,
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="ce4a2698-c176-46ce-a18f-c242f0e6f303"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateWebsiteSchema()),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generatePersonSchema()),
              }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
