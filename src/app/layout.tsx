import type { Metadata, Viewport } from "next";
import "./globals.css";
import ModalProvider from "@/components/providers/ModalProvider";
import { Manrope } from "next/font/google";
import { I18nProvider } from "@/contexts/I18nContext";
import LanguageButton from "@/components/ui/LanguageButton";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Exotic Fruits International - Premium Colombian Exotic Fruits",
  description:
    "Discover premium exotic and tropical fruits directly imported from Colombia's most fertile regions. Fresh, sustainable, and high-quality fruits delivered to your market.",
  keywords: [
    "exotic fruits",
    "tropical fruits",
    "Colombian fruits",
    "fresh fruits",
    "import",
    "wholesale",
    "premium quality",
    "sustainable farming",
  ],
  authors: [{ name: "Exotic Fruits International" }],
  creator: "Exotic Fruits International",
  publisher: "Exotic Fruits International",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://exoticfruits.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Exotic Fruits International - Premium Colombian Exotic Fruits",
    description:
      "Discover premium exotic and tropical fruits directly imported from Colombia's most fertile regions. Fresh, sustainable, and high-quality fruits delivered to your market.",
    url: "https://exoticfruits.com",
    siteName: "Exotic Fruits International",
    images: [
      {
        url: "/logo  fruit exotic.png",
        width: 1200,
        height: 630,
        alt: "Exotic Fruits International - Premium Colombian Fruits",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exotic Fruits International - Premium Colombian Exotic Fruits",
    description:
      "Discover premium exotic and tropical fruits directly imported from Colombia's most fertile regions.",
    images: ["/logo  fruit exotic.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/logo  fruit exotic.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "/logo  fruit exotic.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/logo  fruit exotic.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo  fruit exotic.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/logo  fruit exotic.png",
    apple: {
      url: "/logo  fruit exotic.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <link rel="preload" href="/logo  fruit exotic.png" as="image" type="image/png" />
        <link rel="preload" href="/papaya.png" as="image" type="image/png" />
        <link rel="preload" href="/dragon-fruit.png" as="image" type="image/png" />
        <link rel="preload" href="/physalis.png" as="image" type="image/png" />
        <link rel="preload" href="/Exotische.png" as="image" type="image/png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/logo  fruit exotic.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/logo  fruit exotic.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo  fruit exotic.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo  fruit exotic.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo  fruit exotic.png" />
        <link rel="shortcut icon" href="/logo  fruit exotic.png" />
        <link rel="icon" href="/logo  fruit exotic.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove browser extension attributes that cause hydration issues
                if (typeof window !== 'undefined') {
                  // Immediately clean existing attributes when the script runs
                  function cleanExtensionAttributes(element) {
                    if (!element || !element.attributes) return;
                    const attributesToRemove = [];
                    for (let i = 0; i < element.attributes.length; i++) {
                      const attr = element.attributes[i];
                      if (
                        ['bis_register', 'bis_skin_checked', 'bis_size', 'bis_id'].includes(attr.name) ||
                        (attr.name.startsWith('__processed_') && attr.name.endsWith('__')) ||
                        attr.name.startsWith('data-new-gr-') ||
                        attr.name.startsWith('data-gr-') ||
                        attr.name.includes('extension') ||
                        attr.name.includes('bis_') ||
                        attr.name.match(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)
                      ) {
                        attributesToRemove.push(attr.name);
                      }
                    }
                    attributesToRemove.forEach(attr => {
                      try {
                        element.removeAttribute(attr);
                      } catch (e) {
                        // Ignore errors
                      }
                    });
                  }

                  // Clean immediately and repeatedly to prevent hydration issues
                  function cleanAll() {
                    if (document.body) cleanExtensionAttributes(document.body);
                    if (document.documentElement) cleanExtensionAttributes(document.documentElement);
                  }

                  cleanAll();

                  // Clean again after a short delay in case extensions add attributes after initial load
                  setTimeout(cleanAll, 100);
                  setTimeout(cleanAll, 500);
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.type === 'attributes') {
                        cleanExtensionAttributes(mutation.target);
                      }
                    });
                  });

                  // Start observing once DOM is ready
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() {
                      observer.observe(document.body, {
                        attributes: true,
                        childList: true,
                        subtree: true
                      });
                    });
                  } else {
                    observer.observe(document.body, {
                      attributes: true,
                      childList: true,
                      subtree: true
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <I18nProvider defaultLocale="en">
          <ModalProvider>
            {children}
            <LanguageButton />
          </ModalProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
