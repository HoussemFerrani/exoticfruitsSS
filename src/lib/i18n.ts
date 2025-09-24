import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    common: {
      nav: {
        home: "Home",
        about: "About",
        products: "Products",
        blog: "Blog",
        contact: "Contact Us"
      },
      hero: {
        title: "Premium Exotic Fruits",
        subtitle: "From the heart of Colombia to your hands — freshness you can trust, quality you can taste.",
        cta: "Explore Our Fruits"
      },
      about: {
        company: "Fruit Exotic International",
        title: "From Farm to Market",
        story: "Our Story",
        network: "Global Network",
        description: "Founded by passionate fruit specialists, Fruit Exotic International bridges the gap between tropical fruit growers and premium retailers worldwide. After years of traveling through tropical regions, we discovered the incredible diversity and quality of exotic fruits that rarely reach global markets. This inspired us to create a network that brings these treasures directly to discerning customers."
      },
      mission: {
        title: "Our Mission",
        heading: "Premium Quality",
        description1: "We connect the world to Colombia's finest agricultural treasures, delivering premium exotic fruits to wholesalers, distributors, and retailers globally.",
        description2: "To be the right hand for our international partners, bringing you the best of Colombia with top quality products, competitive prices, and reliable logistics.",
        description3: "From Canada to Europe to the Middle East — we support your business with products you can trust and service you can count on."
      },
      whoWeServe: {
        title: "Who We Serve?",
        heading: "Global Partners",
        description1: "We serve premium retailers, specialty grocery stores, high-end restaurants, and wholesale distributors who demand the finest exotic fruits. From boutique markets seeking rare varieties to established chains wanting consistent quality, we cater to businesses that value excellence.",
        description2: "Whether you're in New York, London, or Tokyo, Fruit Exotic International ensures your customers experience the authentic taste of tropical paradise, delivered fresh to your doorstep."
      },
      productRange: {
        title: "Product Range"
      },
      partners: {
        title: "Our Partners",
        subtitle: "We collaborate with trusted partners worldwide to bring you the finest exotic fruits and ensure excellence throughout our supply chain.",
        specialties: "Specialties",
        learnMore: "Learn More",
        ctaTitle: "Interested in Partnership?",
        ctaDescription: "Join our network of trusted partners and help us deliver the finest exotic fruits to markets worldwide.",
        ctaButton: "Contact Us"
      },
      faq: {
        title: "Frequently Asked Questions",
        stillHaveQuestions: "Still Have Questions?",
        contactDescription: "Our expert team is here to help you find the perfect exotic fruits for your needs.",
        contactExperts: "Contact Our Experts"
      },
      products: {
        title: "Our Products",
        subtitle: "Premium Quality",
        description: "Discover our premium selection of exotic and tropical fruits, carefully sourced from the finest farms around the world. From classic tropicals to rare varieties, we bring you the freshest and most flavorful fruits.",
        sliderTitle: "Our Premium Exotic Fruits",
        sliderDescription: "Discover the amazing variety of fresh exotic fruits we import directly from Colombia"
      },
      common: {
        exploreButton: "Explore Our Fruits",
        discoverMore: "Discover More",
        language: "Language"
      }
    }
  },
  fr: {
    common: {
      nav: {
        home: "Accueil",
        about: "À Propos",
        products: "Produits",
        blog: "Blog",
        contact: "Contactez-nous"
      },
      hero: {
        title: "Fruits Exotiques Premium",
        subtitle: "Du cœur de la Colombie à vos mains — fraîcheur en laquelle vous pouvez avoir confiance, qualité que vous pouvez goûter.",
        cta: "Explorez Nos Fruits"
      },
      about: {
        company: "Fruit Exotic International",
        title: "De la Ferme au Marché",
        story: "Notre Histoire",
        network: "Réseau Mondial",
        description: "Fondée par des spécialistes passionnés de fruits, Fruit Exotic International fait le lien entre les producteurs de fruits tropicaux et les détaillants haut de gamme du monde entier. Après des années de voyage dans les régions tropicales, nous avons découvert l'incroyable diversité et qualité des fruits exotiques qui atteignent rarement les marchés mondiaux. Cela nous a inspirés à créer un réseau qui apporte ces trésors directement aux clients exigeants."
      },
      mission: {
        title: "Notre Mission",
        heading: "Qualité Premium",
        description1: "Nous connectons le monde aux plus beaux trésors agricoles de Colombie, livrant des fruits exotiques premium aux grossistes, distributeurs et détaillants du monde entier.",
        description2: "Être la main droite de nos partenaires internationaux, vous apportant le meilleur de la Colombie avec des produits de qualité supérieure, des prix compétitifs et une logistique fiable.",
        description3: "Du Canada à l'Europe au Moyen-Orient — nous soutenons votre entreprise avec des produits en lesquels vous pouvez avoir confiance et un service sur lequel vous pouvez compter."
      },
      whoWeServe: {
        title: "Qui Servons-nous ?",
        heading: "Partenaires Mondiaux",
        description1: "Nous servons des détaillants premium, des épiceries spécialisées, des restaurants haut de gamme et des distributeurs en gros qui exigent les meilleurs fruits exotiques. Des marchés boutiques recherchant des variétés rares aux chaînes établies voulant une qualité constante, nous répondons aux entreprises qui valorisent l'excellence.",
        description2: "Que vous soyez à New York, Londres ou Tokyo, Fruit Exotic International garantit que vos clients vivent le goût authentique du paradis tropical, livré frais à votre porte."
      },
      productRange: {
        title: "Gamme de Produits"
      },
      partners: {
        title: "Nos Partenaires",
        subtitle: "Nous collaborons avec des partenaires de confiance dans le monde entier pour vous apporter les meilleurs fruits exotiques et assurer l'excellence dans toute notre chaîne d'approvisionnement.",
        specialties: "Spécialités",
        learnMore: "En Savoir Plus",
        ctaTitle: "Intéressé par un Partenariat ?",
        ctaDescription: "Rejoignez notre réseau de partenaires de confiance et aidez-nous à livrer les meilleurs fruits exotiques sur les marchés du monde entier.",
        ctaButton: "Contactez-nous"
      },
      faq: {
        title: "Questions Fréquemment Posées",
        stillHaveQuestions: "Avez-vous Encore des Questions ?",
        contactDescription: "Notre équipe d'experts est là pour vous aider à trouver les fruits exotiques parfaits pour vos besoins.",
        contactExperts: "Contactez Nos Experts"
      },
      products: {
        title: "Nos Produits",
        subtitle: "Qualité Premium",
        description: "Découvrez notre sélection premium de fruits exotiques et tropicaux, soigneusement sourcés des meilleures fermes du monde. Des tropicaux classiques aux variétés rares, nous vous apportons les fruits les plus frais et les plus savoureux.",
        sliderTitle: "Nos Fruits Exotiques Premium",
        sliderDescription: "Découvrez l'incroyable variété de fruits exotiques frais que nous importons directement de Colombie"
      },
      common: {
        exploreButton: "Explorez Nos Fruits",
        discoverMore: "Découvrir Plus",
        language: "Langue"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;