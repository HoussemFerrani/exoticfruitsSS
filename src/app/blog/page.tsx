"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogArticleModal from "@/components/ui/BlogArticleModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

// Mock blog data - replace with your actual blog data source
const blogPosts = [
  {
    id: 1,
    title: "Les fruits exotiques, un atout pour votre santé au quotidien",
    excerpt: "🥭🐉 Et si vos fruits devenaient vos alliés bien-être au quotidien ? Riches en vitamines, en fibres et en antioxydants, les fruits exotiques sont bien plus que de simples douceurs exotiques. Découvrez pourquoi ils méritent une place dans votre routine santé.",
    image: "/background1.jpg",
    category: "Health",
    tags: ["Fruits Exotiques", "Santé", "Bien-être", "Nutrition"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-20",
    readTime: "5 min",
    content: `🥭🐉 Et si vos fruits devenaient vos alliés bien-être au quotidien ?

Riches en vitamines, en fibres et en antioxydants, les fruits exotiques sont bien plus que de simples douceurs exotiques 🌴

Voici pourquoi ils méritent une place dans votre routine santé 👇

✅ **Énergie naturelle**
➡️ Le fruit de la passion ou le corossol vous apportent un vrai coup de boost sans sucre ajouté artificiel.

✅ **Digestion facilitée**
➡️ La papaye et le mangoustan contiennent des enzymes naturelles qui aident à bien digérer.

✅ **Beauté de la peau**
➡️ Le fruit du dragon est riche en eau et antioxydants, parfait pour une peau hydratée et lumineuse.

✅ **Immunité renforcée**
➡️ Le ramboutan et la curuba sont chargés en vitamine C : idéals pour affronter les petits coups de fatigue.

💡 **Astuce bien-être :**
Ajoutez 1 ou 2 fruits exotiques à vos petits-déjeuners, salades ou smoothies chaque jour et observez la différence !`
  },
  {
    id: 2,
    title: "Comment reconnaître un fruit exotique de qualité ?",
    excerpt: "🥭🍍 Avant de déguster un fruit tropical, voici 5 astuces pour faire le bon choix au marché ou en ligne. Découvrez comment reconnaître un fruit mûr grâce à la couleur, le parfum, la texture et plus encore.",
    image: "/background2.jpg",
    category: "Tips & Guides",
    tags: ["Qualité", "Conseils", "Achat", "Fraîcheur"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-18",
    readTime: "4 min",
    content: `🥭🍍 Comment reconnaître un fruit exotique de qualité ?

Avant de déguster un fruit tropical, voici 5 astuces pour faire le bon choix au marché ou en ligne ⬇️

✅ **1. La couleur**
Un fruit mûr a une couleur vive et uniforme.
👉 Exemple : une mangue mûre est jaune/orangée, sans taches vertes dures.

✅ **2. Le parfum**
Un bon fruit exotique sent bon ! Sentez la base du fruit :
💡 Une odeur sucrée = bon signe de maturité.

✅ **3. La texture**
La peau doit être souple sans être molle.
🥥 Trop dur = pas encore mûr / Trop mou = trop mûr.

✅ **4. Le poids**
Un fruit lourd pour sa taille est souvent bien juteux.
🍊 Plus de poids = plus de goût.

✅ **5. L'origine & la fraîcheur**
Privilégiez des fruits récoltés à maturité et importés par des spécialistes`
  },
  {
    id: 3,
    title: "Quel fruit exotique choisir selon vos envies ?",
    excerpt: "🍍✨ Fruité, rafraîchissant, énergisant… chaque fruit exotique a sa personnalité ! Vous ne savez pas lequel choisir ? Découvrez notre guide rapide pour choisir le fruit parfait selon votre humeur ou vos besoins.",
    image: "/background3.jpg",
    category: "Tips & Guides",
    tags: ["Guide", "Choix", "Conseils", "Humeur"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-15",
    readTime: "3 min",
    content: `🍍✨ Quel fruit exotique choisir selon vos envies ?

Fruité, rafraîchissant, énergisant… chaque fruit exotique a sa personnalité !

Vous ne savez pas lequel choisir ? Voici un guide rapide pour vous aider selon votre humeur ou vos besoins 👇

💧 **Besoin d'hydratation ?**
→ Fruit du dragon: riches en eau, parfaits après le sport ou par temps chaud !

🍬 **Envie de douceur ?**
→ Papaye ou corossol : texture fondante, goût sucré et réconfortant

⚡ **Coup de boost naturel ?**
→ fruit de la passion : riches en vitamine C et antioxydants, idéals pour faire le plein d'énergie

🧘‍♀️ **Pause bien-être ?**
→ Mangoustan ou feijoa : bons pour la digestion et le système immunitaire

🎉 **Apéro ou moment festif ?**
→ Mangoustan, curuba ou carambole : visuels étonnants, parfaits à partager ou à mettre en valeur dans vos recettes !

🌴 **Faites confiance à votre palais… ou laissez-vous surprendre !**`
  },
  {
    id: 4,
    title: "Et si varier vos fruits exotiques devenait votre meilleure habitude santé ?",
    excerpt: "Manger des fruits exotiques, c'est bon. Mais varier les espèces et les couleurs, c'est encore mieux pour votre santé ! Découvrez pourquoi la diversité est essentielle pour maximiser les bienfaits nutritionnels.",
    image: "/background1.jpg",
    category: "Health",
    tags: ["Variété", "Nutrition", "Santé", "Habitudes"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-12",
    readTime: "4 min",
    content: `Et si varier vos fruits exotiques devenait votre meilleure habitude santé ?

Manger des fruits exotiques, c'est bon. Mais varier les espèces et les couleurs, c'est encore mieux pour votre santé ! 💪🌿

Voici pourquoi la diversité est essentielle :

✅ **Chaque fruit a ses propres nutriments :**
Le mangoustan est riche en xanthones antioxydantes
La papaye soutient la digestion grâce à ses enzymes
Le fruit du dragon (ou pitaya) est hydratant, riche en fibres et en antioxydants
Le corossol est apaisant et riche en vitamines B
Le ramboutan renforce l'immunité avec sa vitamine C

✅ **Plus de couleurs = plus de bienfaits !**
Les pigments naturels (orange, violet, vert, rose) sont aussi des protecteurs naturels pour vos cellules.

✅ **Moins de monotonie = plus de plaisir !**
Changer régulièrement vos fruits, c'est aussi garder l'envie de bien manger, sans frustration.`
  },
  {
    id: 5,
    title: "Les bienfaits des fruits exotiques sur le système immunitaire",
    excerpt: "🍍🥭 Saviez-vous que certains fruits exotiques sont de véritables alliés pour renforcer vos défenses naturelles ? Découvrez 5 super-fruits à intégrer dans votre routine santé pour booster votre immunité.",
    image: "/background2.jpg",
    category: "Health",
    tags: ["Immunité", "Défenses naturelles", "Vitamine C", "Anti-inflammatoire"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-10",
    readTime: "4 min",
    content: `🍍 Les bienfaits des fruits exotiques sur le système immunitaire 🥭

Saviez-vous que certains fruits exotiques sont de véritables alliés pour renforcer vos défenses naturelles ? 💪

Voici 5 super-fruits à intégrer dans votre routine santé :

✅ **Fruit de la passion** – Source de vitamine C, il stimule la production de globules blancs.

✅ **Papaye** – Contient une enzyme appelée papaïne et des vitamines C et E : un cocktail anti-inflammatoire.

✅ **Corossol** – Connu pour ses propriétés antibactériennes et antivirales naturelles.

💡 En plus d'être délicieux, ces fruits tropicaux vous aident à faire le plein d'énergie et à mieux résister aux infections, surtout en période de fatigue ou de changement de saison.

🌱 **Astuce :** consommez-les frais, en smoothie, en salade ou sous forme de jus pressé pour conserver tous leurs bienfaits !`
  },
  {
    id: 6,
    title: "Pourquoi choisir des fruits exotiques issus de l'agriculture durable ?",
    excerpt: "🌍 Chez FruitExotica.ca, on ne choisit pas les fruits au hasard. On les sélectionne avec respect pour la terre… et pour vous ! Découvrez 3 bonnes raisons de privilégier l'agriculture durable pour vos fruits exotiques.",
    image: "/background3.jpg",
    category: "Sustainability",
    tags: ["Agriculture durable", "Écologie", "Qualité", "Environnement"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-08",
    readTime: "3 min",
    content: `🌍 Pourquoi choisir des fruits exotiques issus de l'agriculture durable ?

Chez FruitExotica.ca, on ne choisit pas les fruits au hasard. On les sélectionne avec respect pour la terre… et pour vous 🍍💚

Voici 3 bonnes raisons de privilégier l'agriculture durable 👇

✅ **1. Respect des sols et de la biodiversité**
Les plantations durables évitent les pesticides chimiques nocifs et préservent les écosystèmes tropicaux 🌿

✅ **2. Moins de gaspillage, plus de qualité**
Des méthodes de culture raisonnées = fruits cueillis à maturité, moins de pertes, plus de goût 😋

✅ **3. Pour votre santé et celle de la planète**
Moins de produits chimiques, plus de nutriments naturels 🌱 = un choix gagnant sur tous les plans`
  },
  {
    id: 7,
    title: "Notre engagement : une agriculture respectueuse de la terre et des hommes",
    excerpt: "Nous croyons qu'un fruit savoureux commence par une terre respectée. Découvrez notre engagement quotidien pour une agriculture durable, en collaboration directe avec nos producteurs partenaires passionnés.",
    image: "/background1.jpg",
    category: "Behind the Scenes",
    tags: ["Engagement", "Partenaires", "Éthique", "Agriculture responsable"],
    featured: false,
    author: "ExoticFruits Team",
    publishedDate: "2024-09-05",
    readTime: "4 min",
    content: `Notre engagement : une agriculture respectueuse de la terre et des hommes

Nous croyons qu'un fruit savoureux commence par une terre respectée.

C'est pourquoi nous nous engageons chaque jour pour une agriculture durable, en collaboration directe avec nos producteurs partenaires.

✅ **Sans pesticides chimiques :** nos fruits poussent dans un environnement naturel, sans produits nocifs pour vous ou pour la planète.

✅ **Méthodes agricoles responsables :** compostage, gestion de l'eau, rotation des cultures… chaque geste compte.

✅ **Soutien aux communautés locales :** nous travaillons main dans la main avec des agriculteurs passionnés, pour une production éthique et équitable.

🍍 Quand vous choisissez Fruit Exotica, vous choisissez des produits bons pour votre santé et pour la planète.

**ET VOUS, QUELS GESTES FAITES-VOUS AU QUOTIDIEN POUR UNE ALIMENTATION PLUS RESPONSABLE ?**

💚 **PARTAGEZ CE POST POUR SOUTENIR UNE AGRICULTURE PLUS HUMAINE.**`
  }
];

export default function BlogPage() {
  const { t, isLoading } = useI18n();

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Ensure filteredPosts is initialized on mount
  useEffect(() => {
    if (filteredPosts.length === 0) {
      setFilteredPosts(blogPosts);
    }
  }, []);

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