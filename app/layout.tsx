import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

// English fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

// Arabic fonts
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-serif-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "إطلاق - قالب Next.js",
  description: "قالب Next.js مع نظام المصادقة وقاعدة بيانات MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar-SA" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Tell browsers and extensions this site supports both color schemes */}
        <meta name="color-scheme" content="light dark" />
        {/* Tell Dark Reader extension to not apply its dark mode */}
        <meta name="darkreader-lock" />
        {/* Prevent flash of unstyled content for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${ibmPlexArabic.variable} ${notoNaskhArabic.variable} font-sans antialiased`}
      >
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              src="//unpkg.com/react-grab/dist/index.global.js"
              crossOrigin="anonymous"
              strategy="beforeInteractive"
            />
            <Script
              src="//unpkg.com/@react-grab/claude-code/dist/client.global.js"
              crossOrigin="anonymous"
              strategy="beforeInteractive"
            />
          </>
        )}
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
