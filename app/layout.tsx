import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Etlaq - Next.js Template",
  description: "A Next.js template with authentication and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
            <Script id="grab-bridge" strategy="afterInteractive">
              {`
                // Intercept fetch to grab-server and postMessage to parent
                (function() {
                  const originalFetch = window.fetch;
                  window.fetch = async function(...args) {
                    const response = await originalFetch.apply(this, args);

                    // Check if this is a grab-server request
                    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
                    if (url && (url.includes(':4567/agent') || url.includes('localhost:4567/agent'))) {
                      try {
                        const clonedResponse = response.clone();
                        const data = await clonedResponse.json();

                        if (data.type === 'grab-prompt' && window.parent !== window) {
                          console.log('[GRAB] Posting to parent:', data);
                          window.parent.postMessage({
                            type: 'etlaq-grab',
                            prompt: data.prompt,
                            context: data.context
                          }, '*');
                        }
                      } catch (e) {
                        console.warn('[GRAB] Failed to parse grab response:', e);
                      }
                    }

                    return response;
                  };
                })();
              `}
            </Script>
          </>
        )}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
