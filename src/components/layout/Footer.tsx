"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Truck, Shield } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

function FooterLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="block text-sm leading-6 text-white/80 hover:text-orange-400 transition-colors"
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function SocialIcon({
  href,
  label,
  children,
  ...props
}: {
  href: string;
  label: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        aria-label={label}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo  fruit exotic.png"
                  alt="Fruit Exotic Logo"
                  width={200}
                  height={200}
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Fruit Exotic</h3>
                  <p className="text-sm text-orange-400">Inc</p>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed mb-6">
                {t("footer.brand.tagline")}
              </p>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-green-600/20 px-3 py-2 rounded-lg"
                >
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">{t("footer.trustBadges.freshGuarantee")}</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-blue-600/20 px-3 py-2 rounded-lg"
                >
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-400">{t("footer.trustBadges.fastDelivery")}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-orange-400">{t("footer.quickLinks.title")}</h4>
              <nav className="space-y-3">
                <FooterLink href="/">{t("footer.quickLinks.home")}</FooterLink>
                <FooterLink href="/products">{t("footer.quickLinks.fruits")}</FooterLink>
                <FooterLink href="/apropre">{t("footer.quickLinks.about")}</FooterLink>
                <FooterLink href="/contact">{t("footer.quickLinks.contact")}</FooterLink>
              </nav>
            </motion.div>
          </div>

          {/* Fruit Categories */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-orange-400">{t("footer.products.title")}</h4>
              <nav className="space-y-3">
                <FooterLink href="/products?category=Tropical">{t("footer.products.tropical")}</FooterLink>
                <FooterLink href="/products?category=Exotic">{t("footer.products.exotic")}</FooterLink>
                <FooterLink href="/products?category=Citrus">{t("footer.products.citrus")}</FooterLink>
                <FooterLink href="/products?category=Berries">{t("footer.products.berries")}</FooterLink>
                <FooterLink href="/products?category=Seasonal">{t("footer.products.seasonal")}</FooterLink>
              </nav>
            </motion.div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-orange-400">{t("footer.contact.title")}</h4>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{t("footer.contact.location")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{t("footer.contact.phone")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{t("footer.contact.email")}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-6">
                  <SocialIcon href="#" label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="https://m.facebook.com/100091780630660/" label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="https://www.linkedin.com/in/fruit-exotic-international-inc-76b030334/" label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </SocialIcon>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/60 text-sm">
            © Fruit Exotic Inc. {t("footer.rights")}.
          </p>
          <p className="text-white/60 text-sm">
            Created by{" "}
            <Link
              href="https://www.progix.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors underline"
            >
              Progix
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}


