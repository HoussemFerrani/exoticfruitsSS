"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogArticleModal from "@/components/ui/BlogArticleModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

// Blog articles with translations
const getBlogPosts = (t: any) => [
  {
    id: 1,
    title: t("blogArticles.1.title"),
    excerpt: t("blogArticles.1.excerpt"),
    image: "/background1.jpg",
    category: "Health",
    tags: ["Fruits Exotiques", "Santé", "Bien-être", "Nutrition"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-20",
    readTime: "5 min",
    content: t("blogArticles.1.content")
  },
  {
    id: 2,
    title: t("blogArticles.2.title"),
    excerpt: t("blogArticles.2.excerpt"),
    image: "/background2.jpg",
    category: "Tips & Guides",
    tags: ["Qualité", "Conseils", "Achat", "Fraîcheur"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-18",
    readTime: "4 min",
    content: t("blogArticles.2.content")
  },
  {
    id: 3,
    title: t("blogArticles.3.title"),
    excerpt: t("blogArticles.3.excerpt"),
    image: "/background3.jpg",
    category: "Tips & Guides",
    tags: ["Guide", "Choix", "Conseils", "Humeur"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-15",
    readTime: "3 min",
    content: t("blogArticles.3.content")
  },
  {
    id: 4,
    title: t("blogArticles.4.title"),
    excerpt: t("blogArticles.4.excerpt"),
    image: "/background1.jpg",
    category: "Health",
    tags: ["Variété", "Nutrition", "Santé", "Habitudes"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-12",
    readTime: "4 min",
    content: t("blogArticles.4.content")
  },
  {
    id: 5,
    title: t("blogArticles.5.title"),
    excerpt: t("blogArticles.5.excerpt"),
    image: "/background2.jpg",
    category: "Health",
    tags: ["Immunité", "Défenses naturelles", "Vitamine C", "Anti-inflammatoire"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-10",
    readTime: "4 min",
    content: t("blogArticles.5.content")
  },
  {
    id: 6,
    title: t("blogArticles.6.title"),
    excerpt: t("blogArticles.6.excerpt"),
    image: "/background3.jpg",
    category: "Sustainability",
    tags: ["Agriculture durable", "Écologie", "Qualité", "Environnement"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-08",
    readTime: "3 min",
    content: t("blogArticles.6.content")
  },
  {
    id: 7,
    title: t("blogArticles.7.title"),
    excerpt: t("blogArticles.7.excerpt"),
    image: "/background1.jpg",
    category: "Behind the Scenes",
    tags: ["Engagement", "Partenaires", "Éthique", "Agriculture responsable"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-05",
    readTime: "4 min",
    content: t("blogArticles.7.content")
  }
];

export default function BlogPage() {
  const { t, isLoading } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
        </div>
      </div>
    );
  }

  const blogPosts = getBlogPosts(t);

  const categories = [
    { key: "All", label: t("blogPage.categories.all") },
    { key: "Education", label: t("blogPage.categories.education") },
    { key: "Sustainability", label: t("blogPage.categories.sustainability") },
    { key: "Tips & Guides", label: t("blogPage.categories.tipsGuides") },
    { key: "Health", label: t("blogPage.categories.health") },
    { key: "Behind the Scenes", label: t("blogPage.categories.behindScenes") },
    { key: "Recipes", label: t("blogPage.categories.recipes") }
  ];

  const handleReadMore = (e: React.MouseEvent, article: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const regularPosts = filteredPosts;

  console.log("=== BLOG DEBUG ===");
  console.log("blogPosts length:", blogPosts.length);
  console.log("filteredPosts length:", filteredPosts.length);
  console.log("regularPosts length:", regularPosts.length);
  console.log("selectedCategory:", selectedCategory);
  console.log("regularPosts titles:", regularPosts.map(p => p.title));
  console.log("=== END DEBUG ===");

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide mb-4 text-orange-600">
                {t("blogPage.hero.subtitle")}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                {t("blogPage.hero.title")}
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                {t("blogPage.hero.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.key
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    textOverflow: 'ellipsis'
                  }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                    <button
                      onClick={(e) => handleReadMore(e, post)}
                      className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium text-sm group-hover:gap-2 transition-all cursor-pointer"
                    >
                      {t("blogPage.readMore")}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      <Footer />

      {/* Blog Article Modal */}
      <BlogArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}