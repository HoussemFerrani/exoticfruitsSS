"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, Heart, Star, Search, X } from "lucide-react";
import FruitInfoModal from "../ui/FruitInfoModal";

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

const PRODUCTS: Product[] = [
  {
    id: "mango",
    name: "Papaya",
    category: "Tropical",
    ediblePart: "Flesh",
    consumption: "Fresh, smoothies, desserts",
    healthBenefits: ["Rich in Vitamin C", "High in fiber", "Antioxidants"],
    price: "$3.99",
    image: "/papaya.png",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "dragon-fruit",
    name: "Dragon Fruit",
    category: "Exotic",
    ediblePart: "Flesh with seeds",
    consumption: "Fresh, fruit salads, smoothie bowls",
    healthBenefits: ["Low in calories", "Rich in iron", "Vitamin C"],
    price: "$7.99",
    image: "/dragon-fruit.png",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "passion-fruit",
    name: "Physalis",
    category: "Tropical",
    ediblePart: "Pulp and seeds",
    consumption: "Fresh, juices, dessert topping",
    healthBenefits: ["High in fiber", "Vitamin A", "Potassium"],
    price: "$2.49",
    image: "/physalis.png",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "rambutan",
    name: "Passion Fruit",
    category: "Exotic",
    ediblePart: "Translucent flesh",
    consumption: "Fresh, fruit salads",
    healthBenefits: ["Vitamin C", "Copper", "Manganese"],
    price: "$6.99",
    image: "/Exotische.png",
    rating: 4.5,
    inStock: false,
  },
  {
    id: "lychee",
    name: "Mangosteen",
    category: "Tropical",
    ediblePart: "Sweet flesh",
    consumption: "Fresh, cocktails, desserts",
    healthBenefits: ["Vitamin C", "Copper", "Vitamin B6"],
    price: "$5.99",
    image: "/Mangosteen.png",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "star-fruit",
    name: "Banana",
    category: "Tropical",
    ediblePart: "Entire fruit",
    consumption: "Fresh, garnish, salads",
    healthBenefits: ["Low calories", "Vitamin C", "Fiber"],
    price: "$4.49",
    image: "/banana.png",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "papaya",
    name: "Cantaloupe Melon",
    category: "Tropical",
    ediblePart: "Orange flesh",
    consumption: "Fresh, smoothies, salads",
    healthBenefits: ["Digestive enzymes", "Vitamin C", "Folate"],
    price: "$3.49",
    image: "/poire.png",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "jackfruit",
    name: "Feijoa",
    category: "Exotic",
    ediblePart: "Yellow pods",
    consumption: "Fresh, curries, desserts",
    healthBenefits: ["High in fiber", "Vitamin A", "Potassium"],
    price: "$12.99",
    image: "/Feijoa.png",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "durian",
    name: "Soursop",
    category: "Exotic",
    ediblePart: "Custard-like flesh",
    consumption: "Fresh, desserts, ice cream",
    healthBenefits: ["High in energy", "Vitamin B", "Potassium"],
    price: "$18.99",
    image: "/COROSSOL.png",
    rating: 3.8,
    inStock: true,
  },
  {
    id: "kiwi",
    name: "Lime",
    category: "Tropical",
    ediblePart: "Green flesh with seeds",
    consumption: "Fresh, smoothies, fruit salads",
    healthBenefits: ["Vitamin C", "Fiber", "Antioxidants"],
    price: "$4.99",
    image: "/lime.png",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "guava",
    name: "Avocado",
    category: "Tropical",
    ediblePart: "Pink/white flesh",
    consumption: "Fresh, juices, jams",
    healthBenefits: ["Vitamin C", "Fiber", "Folate"],
    price: "$3.99",
    image: "/avocado.png",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "pomegranate",
    name: "Green Apple",
    category: "Stone Fruits",
    ediblePart: "Red seeds (arils)",
    consumption: "Fresh, juices, salads",
    healthBenefits: ["Antioxidants", "Vitamin C", "Fiber"],
    price: "$6.49",
    image: "/apple.png",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "persimmon",
    name: "Curuba",
    category: "Stone Fruits",
    ediblePart: "Orange flesh",
    consumption: "Fresh, dried, desserts",
    healthBenefits: ["Vitamin A", "Fiber", "Manganese"],
    price: "$5.99",
    image: "/Curuba.png",
    rating: 4.3,
    inStock: false,
  },
  {
    id: "blueberries",
    name: "Figue de la Barbarie",
    category: "Berries",
    ediblePart: "Entire berry",
    consumption: "Fresh, smoothies, baking",
    healthBenefits: ["Antioxidants", "Vitamin K", "Fiber"],
    price: "$7.99",
    image: "/hendi.png",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "blackberries",
    name: "Tamarillo",
    category: "Berries",
    ediblePart: "Entire berry",
    consumption: "Fresh, jams, desserts",
    healthBenefits: ["Vitamin C", "Fiber", "Antioxidants"],
    price: "$8.49",
    image: "/tamarillo.png",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "blood-orange",
    name: "Aloe Vera",
    category: "Citrus",
    ediblePart: "Red flesh segments",
    consumption: "Fresh, juices, cocktails",
    healthBenefits: ["Vitamin C", "Anthocyanins", "Folate"],
    price: "$5.49",
    image: "/Aloe vera.png",
    rating: 4.7,
    inStock: true,
  },
];

export default function ProductsGrid() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    "All",
    "Tropical",
    "Exotic",
    "Citrus",
    "Stone Fruits",
    "Berries",
    "Seasonal"
  ];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Logo and Quote Section */}
      <section className="relative py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <Image
                  src="/Logo.png"
                  alt="Fruit Exotic International Logo"
                  width={200}
                  height={200}
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative Elements */}
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 italic leading-relaxed text-center"
                  >
                    Quality harvested with care, delivered with passion
                  </motion.p>

                  {/* Decorative line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mx-auto mt-4 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Search Bar */}
        <div className="flex justify-center mb-8 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-2xl w-full"
          >
            <motion.div
              animate={{
                scale: isSearchFocused ? 1.02 : 1,
                boxShadow: isSearchFocused
                  ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 pl-4">
                  <Search className={`w-5 h-5 transition-colors duration-200 ${
                    isSearchFocused ? "text-blue-500" : "text-gray-400"
                  }`} />
                </div>
                <input
                  type="text"
                  placeholder="Search fruits by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="flex-shrink-0 pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Animated border */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{
                  width: isSearchFocused ? "100%" : "0%"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Search Results Count */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-4 text-sm text-gray-600"
              >
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="relative flex flex-wrap gap-2 bg-white rounded-2xl p-3 shadow-lg border border-gray-100 max-w-4xl">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, var(--color-brand), var(--color-cta))"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group overflow-hidden rounded-2xl"
            >
              {/* Product Image */}
              <div
                className="relative aspect-square p-6 cursor-pointer"
                onClick={() => openModal(product)}
              >
                {/* Circular animated background */}
                <div className="absolute inset-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform scale-75 group-hover:scale-100" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--color-brand) 40%, white), color-mix(in oklab, var(--color-cta) 40%, white), color-mix(in oklab, var(--color-emphasis) 40%, white))" }}></div>

                <div className="relative w-full h-full z-10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

              </div>

              {/* Product Name - Outside hover area */}
              <div className="text-center -mt-2">
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-brand)" }}>
                  {product.name}
                </h3>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(product)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
                  >
                    More Info
                  </motion.button>

                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-cta)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--color-cta-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--color-cta)";
                      }}
                    >
                      Buy Now
                    </motion.button>
                  </Link>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              {searchQuery ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No fruits found for "{searchQuery}"
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try searching for different keywords or browse our categories above.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
                  >
                    Clear Search
                  </motion.button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No products found in this category
                  </h3>
                  <p className="text-gray-500">
                    Try selecting a different category or search for specific fruits.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Fruit Info Modal */}
      <FruitInfoModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      </section>
    </>
  );
}