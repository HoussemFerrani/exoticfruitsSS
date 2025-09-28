"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/contexts/I18nContext";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  featured?: boolean;
  content: string;
  author?: string;
  readTime?: string;
};

interface BlogArticleModalProps {
  article: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogArticleModal({ article, isOpen, onClose }: BlogArticleModalProps) {
  const { t } = useI18n();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!article) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: 50,
      rotateX: 15,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
              transformStyle: "preserve-3d"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 opacity-10">
              <div className="absolute top-4 left-8 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-12 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-16 left-1/3 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 shadow-lg cursor-pointer"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>

            {/* Header Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Category Badge */}
              <div className="absolute bottom-4 left-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
                  <Tag className="w-3 h-3" />
                  {article.category}
                </span>
              </div>
            </div>

            <div className="relative z-10 p-8">
              {/* Title and Meta */}
              <motion.div
                variants={contentVariants}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  {article.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  {article.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                  )}
                  {article.readTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime} de lecture
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                variants={contentVariants}
                className="prose prose-lg max-w-none mb-8"
              >
                <div className="text-gray-800 leading-relaxed space-y-6">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-lg"
                    >
                      {paragraph.includes('**') ? (
                        <div dangerouslySetInnerHTML={{
                          __html: paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-600 font-semibold">$1</strong>')
                            .replace(/\n/g, '<br />')
                        }} />
                      ) : (
                        <p className="whitespace-pre-line">{paragraph}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.div
                variants={contentVariants}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className="px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:shadow-lg cursor-pointer"
                >
                  {t("blogPage.closeArticle")}
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}