import type { Metadata, Viewport } from "next";
import "./globals.css";
import ModalProvider from "@/components/providers/ModalProvider";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";
import LanguageButton from "@/components/ui/LanguageButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
        url: "/Logo.png",
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
    images: ["/Logo.png"],
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
    icon: "/LogoFavIcon.png",
    shortcut: "/LogoFavIcon.png",
    apple: "/LogoFavIcon.png",
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
    <html lang="en" className={montserrat.variable}>
      <body className={`antialiased`}>
        <AuthProvider>
          <I18nProvider defaultLocale="en">
            <ModalProvider>
              {children}
              <LanguageButton />
            </ModalProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
