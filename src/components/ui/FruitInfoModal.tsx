"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  ediblePart: string;
  consumption: string;
  healthBenefits: string[];
  price: string;
  image: string;
  rating: number;
  inStock: boolean;
};

interface FruitInfoModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FruitInfoModal({ product, isOpen, onClose }: FruitInfoModalProps) {
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

  if (!product) return null;

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
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
              transformStyle: "preserve-3d"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 opacity-10">
              <div className="absolute top-4 left-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-12 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-16 left-1/3 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-pulse delay-500"></div>
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

            <div className="relative z-10 p-8">
              {/* Header Section */}
              <motion.div
                variants={contentVariants}
                className="flex flex-col md:flex-row gap-8 mb-8"
              >
                {/* Fruit Image */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="relative w-48 h-48 mx-auto md:mx-0"
                  >
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 animate-pulse"></div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain z-10 relative"
                      sizes="200px"
                    />
                  </motion.div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full mb-3">
                      {product.category}
                    </span>
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating}/5
                      </span>
                    </div>


                    {/* Stock Status */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Detailed Information */}
              <motion.div
                variants={contentVariants}
                className="grid md:grid-cols-2 gap-6 mb-8"
              >
                {/* Edible Part */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
                >
                  <h3 className="font-semibold text-blue-800 mb-2">🍽️ Edible Part</h3>
                  <p className="text-blue-700">{product.ediblePart}</p>
                </motion.div>

                {/* Consumption */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100"
                >
                  <h3 className="font-semibold text-green-800 mb-2">🥤 How to Enjoy</h3>
                  <p className="text-green-700">{product.consumption}</p>
                </motion.div>
              </motion.div>

              {/* Health Benefits */}
              <motion.div
                variants={contentVariants}
                className="mb-8"
              >
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">💪 Health Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {product.healthBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 text-center"
                    >
                      <span className="text-orange-700 font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={contentVariants}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!product.inStock}
                  className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-200 ${
                    product.inStock
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className="px-8 py-3 rounded-2xl font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                >
                  Close
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