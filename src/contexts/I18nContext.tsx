"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "fr";

type TranslationKey =
  | "general.selectLanguage"
  | "general.changeLanguage"
  | "nav.home"
  | "nav.about"
  | "nav.services"
  | "nav.contact"
  | "nav.blog"
  | "nav.partners"
  | "nav.products"
  | "footer.rights"
  | "common.loading"
  | "common.error"
  | "common.success"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta"
  | "about.company"
  | "about.title"
  | "about.story"
  | "about.network"
  | "about.description"
  | "mission.title"
  | "mission.heading"
  | "mission.description1"
  | "mission.description2"
  | "mission.description3"
  | "whoWeServe.title"
  | "whoWeServe.heading"
  | "whoWeServe.description1"
  | "whoWeServe.description2"
  | "coreValues.title"
  | "coreValues.qualityFirst.title"
  | "coreValues.qualityFirst.description"
  | "coreValues.reliableLogistics.title"
  | "coreValues.reliableLogistics.description"
  | "coreValues.sustainability.title"
  | "coreValues.sustainability.description"
  | "coreValues.strongPartnerships.title"
  | "coreValues.strongPartnerships.description"
  | "partners.title"
  | "partners.subtitle"
  | "partners.description"
  | "partners.specialties"
  | "partners.learnMore"
  | "partners.cta.title"
  | "partners.cta.description"
  | "partners.cta.button"
  | "partners.ctaTitle"
  | "partners.ctaDescription"
  | "partners.ctaButton"
  | "aboutUs.title"
  | "aboutUs.company"
  | "aboutUs.description1"
  | "aboutUs.description2"
  | "aboutUs.learnMore"
  | "footer.brand.tagline"
  | "footer.trustBadges.freshGuarantee"
  | "footer.trustBadges.fastDelivery"
  | "footer.quickLinks.title"
  | "footer.quickLinks.home"
  | "footer.quickLinks.fruits"
  | "footer.quickLinks.about"
  | "footer.quickLinks.contact"
  | "footer.quickLinks.shipping"
  | "footer.products.title"
  | "footer.products.tropical"
  | "footer.products.exotic"
  | "footer.products.citrus"
  | "footer.products.berries"
  | "footer.products.seasonal"
  | "footer.contact.title"
  | "footer.contact.location"
  | "footer.contact.phone"
  | "footer.contact.email"
  | "footer.social.title"
  | "footer.social.subtitle"
  | "specialties.nationwideDistribution"
  | "specialties.freshDelivery"
  | "specialties.qualityAssurance"
  | "specialties.premiumQuality"
  | "specialties.europeanDistribution"
  | "specialties.exoticSpecialties"
  | "specialties.gourmetSelection"
  | "specialties.premiumService"
  | "specialties.fineFoodDistribution"
  | "specialties.freshProduce"
  | "specialties.canadianMarket"
  | "specialties.qualityDistribution"
  | "specialties.retailExcellence"
  | "specialties.freshGroceries"
  | "specialties.communityFocus"
  | "specialties.foodService"
  | "specialties.professionalDistribution"
  | "specialties.restaurantSupply"
  | "faq.title"
  | "faq.questions.1.question"
  | "faq.questions.1.answer"
  | "faq.questions.2.question"
  | "faq.questions.2.answer"
  | "faq.questions.3.question"
  | "faq.questions.3.answer"
  | "faq.questions.4.question"
  | "faq.questions.4.answer"
  | "faq.questions.5.question"
  | "faq.questions.5.answer"
  | "faq.questions.6.question"
  | "faq.questions.6.answer"
  | "faq.cta.title"
  | "faq.cta.description"
  | "faq.cta.button"
  | "faq.stillHaveQuestions"
  | "faq.contactDescription"
  | "faq.contactExperts"
  | "products.title"
  | "products.subtitle"
  | "products.description"
  | "products.sliderTitle"
  | "products.sliderDescription"
  | "common.exploreButton"
  | "common.discoverMore"
  | "common.language"
  | "testimonials.title"
  | "testimonials.subtitle"
  | "testimonials.thomasFruits.quote"
  | "testimonials.thomasFruits.author"
  | "testimonials.thomasFruits.meta"
  | "testimonials.iga.quote"
  | "testimonials.iga.author"
  | "testimonials.iga.meta";

type Translations = Record<Locale, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    "general.selectLanguage": "Select Language",
    "general.changeLanguage": "Change website language",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact Us",
    "nav.blog": "Blog",
    "nav.partners": "Partners",
    "nav.products": "Products",
    "footer.rights": "All rights reserved",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "hero.title": "Premium Exotic Fruits",
    "hero.subtitle": "From the heart of Colombia to your hands — freshness you can trust, quality you can taste.",
    "hero.cta": "Explore Our Fruits",
    "about.company": "Fruit Exotic International",
    "about.title": "From Farm to Market",
    "about.story": "Our Story",
    "about.network": "Global Network",
    "about.description": "Founded by passionate fruit specialists, Fruit Exotic International bridges the gap between tropical fruit growers and premium retailers worldwide. After years of traveling through tropical regions, we discovered the incredible diversity and quality of exotic fruits that rarely reach global markets. This inspired us to create a network that brings these treasures directly to discerning customers.",
    "mission.title": "Our Mission",
    "mission.heading": "Premium Quality",
    "mission.description1": "We connect the world to Colombia's finest agricultural treasures, delivering premium exotic fruits to wholesalers, distributors, and retailers globally.",
    "mission.description2": "To be the right hand for our international partners, bringing you the best of Colombia with top quality products, competitive prices, and reliable logistics.",
    "mission.description3": "From Canada to Europe to the Middle East — we support your business with products you can trust and service you can count on.",
    "whoWeServe.title": "Who We Serve?",
    "whoWeServe.heading": "Global Partners",
    "whoWeServe.description1": "We serve premium retailers, specialty grocery stores, high-end restaurants, and wholesale distributors who demand the finest exotic fruits. From boutique markets seeking rare varieties to established chains wanting consistent quality, we cater to businesses that value excellence.",
    "whoWeServe.description2": "Whether you're in New York, London, or Tokyo, Fruit Exotic International ensures your customers experience the authentic taste of tropical paradise, delivered fresh to your doorstep.",
    "coreValues.title": "Our Core Values",
    "coreValues.qualityFirst.title": "Quality First",
    "coreValues.qualityFirst.description": "We prioritize excellence in every aspect of our business, from sourcing the finest fruits to delivering premium products that exceed expectations.",
    "coreValues.reliableLogistics.title": "Reliable Logistics",
    "coreValues.reliableLogistics.description": "Our advanced transportation network ensures timely delivery worldwide, maintaining freshness from farm to destination through air and sea freight.",
    "coreValues.sustainability.title": "Sustainability",
    "coreValues.sustainability.description": "We are committed to environmental responsibility and ethical sourcing, supporting sustainable farming practices and fair compensation for growers.",
    "coreValues.strongPartnerships.title": "Strong Partnerships",
    "coreValues.strongPartnerships.description": "Building lasting relationships with trusted growers, distributors, and retailers to create a reliable network that benefits everyone in the supply chain.",
    "partners.title": "Our Partners",
    "partners.subtitle": "We collaborate with trusted partners worldwide to bring you the finest exotic fruits and ensure excellence throughout our supply chain.",
    "partners.description": "We collaborate with trusted partners worldwide to bring you the finest exotic fruits and ensure excellence throughout our supply chain.",
    "partners.specialties": "Specialties",
    "partners.learnMore": "Learn More",
    "partners.cta.title": "Interested in Partnership?",
    "partners.cta.description": "Join our network of trusted partners and help us deliver the finest exotic fruits to markets worldwide.",
    "partners.cta.button": "Contact Us",
    "partners.ctaTitle": "Interested in Partnership?",
    "partners.ctaDescription": "Join our network of trusted partners and help us deliver the finest exotic fruits to markets worldwide.",
    "partners.ctaButton": "Contact Us",
    "aboutUs.title": "About Us",
    "aboutUs.company": "Exotic Fruits International",
    "aboutUs.description1": "is your trusted source for premium exotic and tropical fruits, carefully harvested from Colombia's most fertile regions.",
    "aboutUs.description2": "Through strong partnerships with local growers, we ensure every shipment delivers unmatched freshness and quality — bringing the rich biodiversity of Colombia straight to your market.",
    "aboutUs.learnMore": "Learn More About Us",
    "footer.brand.tagline": "Premium exotic fruits from the heart of Colombia. Quality harvested with care, delivered with passion.",
    "footer.trustBadges.freshGuarantee": "Fresh Guarantee",
    "footer.trustBadges.fastDelivery": "Fast Delivery",
    "footer.quickLinks.title": "Quick Links",
    "footer.quickLinks.home": "Home",
    "footer.quickLinks.fruits": "Our Fruits",
    "footer.quickLinks.about": "About Us",
    "footer.quickLinks.contact": "Contact",
    "footer.quickLinks.shipping": "Shipping Info",
    "footer.products.title": "Our Products",
    "footer.products.tropical": "Tropical Fruits",
    "footer.products.exotic": "Exotic Varieties",
    "footer.products.citrus": "Citrus Fruits",
    "footer.products.berries": "Premium Berries",
    "footer.products.seasonal": "Seasonal Selection",
    "footer.contact.title": "Get In Touch",
    "footer.contact.location": "Medellín, Colombia",
    "footer.contact.phone": "+57 123 456 7890",
    "footer.contact.email": "info@fruitexotic.com",
    "footer.social.title": "Follow Our Journey",
    "footer.social.subtitle": "Stay connected with us for fresh updates, tropical vibes, and the latest from Colombia",
    "specialties.nationwideDistribution": "Nationwide Distribution",
    "specialties.freshDelivery": "Fresh Delivery",
    "specialties.qualityAssurance": "Quality Assurance",
    "specialties.premiumQuality": "Premium Quality",
    "specialties.europeanDistribution": "European Distribution",
    "specialties.exoticSpecialties": "Exotic Specialties",
    "specialties.gourmetSelection": "Gourmet Selection",
    "specialties.premiumService": "Premium Service",
    "specialties.fineFoodDistribution": "Fine Food Distribution",
    "specialties.freshProduce": "Fresh Produce",
    "specialties.canadianMarket": "Canadian Market",
    "specialties.qualityDistribution": "Quality Distribution",
    "specialties.retailExcellence": "Retail Excellence",
    "specialties.freshGroceries": "Fresh Groceries",
    "specialties.communityFocus": "Community Focus",
    "specialties.foodService": "Food Service",
    "specialties.professionalDistribution": "Professional Distribution",
    "specialties.restaurantSupply": "Restaurant Supply",
    "faq.title": "Frequently Asked Questions",
    "faq.questions.1.question": "What makes your exotic fruits premium quality?",
    "faq.questions.1.answer": "Our fruits are sourced directly from certified organic farms in Colombia's most fertile regions. We maintain strict quality control standards, ensuring optimal freshness through our advanced cold-chain logistics and deliver only the finest specimens that meet our rigorous criteria for taste, appearance, and nutritional value.",
    "faq.questions.2.question": "How do you ensure freshness during international shipping?",
    "faq.questions.2.answer": "We utilize state-of-the-art cold-chain distribution systems that maintain precise temperature and humidity levels throughout the entire journey. Our fruits are harvested at peak ripeness and immediately processed through our temperature-controlled facilities, ensuring they arrive at your destination with maximum freshness and flavor.",
    "faq.questions.3.question": "What exotic fruits do you specialize in importing?",
    "faq.questions.3.answer": "We specialize in a diverse range of premium exotic fruits including dragon fruit, physalis, mangosteen, tamarillo, passion fruit, and many rare Colombian varieties. Our selection varies seasonally to ensure we're always offering the freshest, highest-quality fruits available from our trusted farming partners.",
    "faq.questions.4.question": "Do you offer wholesale pricing for businesses?",
    "faq.questions.4.answer": "Yes, we provide competitive wholesale pricing for restaurants, grocery stores, distributors, and other businesses. Our wholesale program includes volume discounts, flexible delivery schedules, and dedicated account management to ensure your business receives consistent, high-quality exotic fruits.",
    "faq.questions.5.question": "What certifications do your fruits have?",
    "faq.questions.5.answer": "Our fruits come with comprehensive certifications including organic certification, fair trade compliance, and international food safety standards. We work exclusively with certified farms that follow sustainable farming practices and meet strict environmental and social responsibility criteria.",
    "faq.questions.6.question": "How can I place an order and what are the minimum quantities?",
    "faq.questions.6.answer": "You can place orders through our website or by contacting our sales team directly. Minimum order quantities vary by fruit type and destination, but we accommodate both small specialty orders and large commercial shipments. Our team will work with you to find the best solution for your specific needs.",
    "faq.cta.title": "Still Have Questions?",
    "faq.cta.description": "Our expert team is here to help you find the perfect exotic fruits for your needs.",
    "faq.cta.button": "Contact Our Experts",
    "faq.stillHaveQuestions": "Still Have Questions?",
    "faq.contactDescription": "Our expert team is here to help you find the perfect exotic fruits for your needs.",
    "faq.contactExperts": "Contact Our Experts",
    "products.title": "Our Products",
    "products.subtitle": "Premium Quality",
    "products.description": "Discover our premium selection of exotic and tropical fruits, carefully sourced from the finest farms around the world. From classic tropicals to rare varieties, we bring you the freshest and most flavorful fruits.",
    "products.sliderTitle": "Our Premium Exotic Fruits",
    "products.sliderDescription": "Discover the amazing variety of fresh exotic fruits we import directly from Colombia",
    "common.exploreButton": "Explore Our Fruits",
    "common.discoverMore": "Discover More",
    "common.language": "Language",
    "testimonials.title": "Testimonials",
    "testimonials.subtitle": "What our partners say about our premium exotic fruits.",
    "testimonials.thomasFruits.quote": "Product quality: Very good, fruits well ripened, little loss upon reception.",
    "testimonials.thomasFruits.author": "Thomas Fruits",
    "testimonials.thomasFruits.meta": "Partner - Canada",
    "testimonials.iga.quote": "Consistent product quality: 5/5 – The fruits are fresh, well-calibrated, with excellent presentation and ideal ripeness for sale.",
    "testimonials.iga.author": "IGA",
    "testimonials.iga.meta": "Partner - Canada"
  },
  fr: {
    "general.selectLanguage": "Choisir la langue",
    "general.changeLanguage": "Changer la langue du site",
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.contact": "Contactez-nous",
    "nav.blog": "Blog",
    "nav.partners": "Partenaires",
    "nav.products": "Produits",
    "footer.rights": "Tous droits réservés",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "hero.title": "Fruits Exotiques Premium",
    "hero.subtitle": "Du cœur de la Colombie à vos mains — fraîcheur en laquelle vous pouvez avoir confiance, qualité que vous pouvez goûter.",
    "hero.cta": "Explorez Nos Fruits",
    "about.company": "Fruit Exotic International",
    "about.title": "De la Ferme au Marché",
    "about.story": "Notre Histoire",
    "about.network": "Réseau Mondial",
    "about.description": "Fondée par des spécialistes passionnés de fruits, Fruit Exotic International fait le lien entre les producteurs de fruits tropicaux et les détaillants haut de gamme du monde entier. Après des années de voyage dans les régions tropicales, nous avons découvert l'incroyable diversité et qualité des fruits exotiques qui atteignent rarement les marchés mondiaux. Cela nous a inspirés à créer un réseau qui apporte ces trésors directement aux clients exigeants.",
    "mission.title": "Notre Mission",
    "mission.heading": "Qualité Premium",
    "mission.description1": "Nous connectons le monde aux plus beaux trésors agricoles de Colombie, livrant des fruits exotiques premium aux grossistes, distributeurs et détaillants du monde entier.",
    "mission.description2": "Être la main droite de nos partenaires internationaux, vous apportant le meilleur de la Colombie avec des produits de qualité supérieure, des prix compétitifs et une logistique fiable.",
    "mission.description3": "Du Canada à l'Europe au Moyen-Orient — nous soutenons votre entreprise avec des produits en lesquels vous pouvez avoir confiance et un service sur lequel vous pouvez compter.",
    "whoWeServe.title": "Qui Servons-nous ?",
    "whoWeServe.heading": "Partenaires Mondiaux",
    "whoWeServe.description1": "Nous servons des détaillants premium, des épiceries spécialisées, des restaurants haut de gamme et des distributeurs en gros qui exigent les meilleurs fruits exotiques. Des marchés boutiques recherchant des variétés rares aux chaînes établies voulant une qualité constante, nous répondons aux entreprises qui valorisent l'excellence.",
    "whoWeServe.description2": "Que vous soyez à New York, Londres ou Tokyo, Fruit Exotic International garantit que vos clients vivent le goût authentique du paradis tropical, livré frais à votre porte.",
    "coreValues.title": "Nos Valeurs Fondamentales",
    "coreValues.qualityFirst.title": "Qualité Avant Tout",
    "coreValues.qualityFirst.description": "Nous priorisons l'excellence dans chaque aspect de notre entreprise, du sourcing des meilleurs fruits à la livraison de produits premium qui dépassent les attentes.",
    "coreValues.reliableLogistics.title": "Logistique Fiable",
    "coreValues.reliableLogistics.description": "Notre réseau de transport avancé assure une livraison ponctuelle mondiale, maintenant la fraîcheur de la ferme à destination par fret aérien et maritime.",
    "coreValues.sustainability.title": "Durabilité",
    "coreValues.sustainability.description": "Nous nous engageons pour la responsabilité environnementale et l'approvisionnement éthique, soutenant les pratiques agricoles durables et une rémunération équitable pour les producteurs.",
    "coreValues.strongPartnerships.title": "Partenariats Solides",
    "coreValues.strongPartnerships.description": "Construire des relations durables avec des producteurs, distributeurs et détaillants de confiance pour créer un réseau fiable qui profite à tous dans la chaîne d'approvisionnement.",
    "partners.title": "Nos Partenaires",
    "partners.subtitle": "Nous collaborons avec des partenaires de confiance dans le monde entier pour vous apporter les meilleurs fruits exotiques et assurer l'excellence dans toute notre chaîne d'approvisionnement.",
    "partners.description": "Nous collaborons avec des partenaires de confiance dans le monde entier pour vous apporter les meilleurs fruits exotiques et assurer l'excellence dans toute notre chaîne d'approvisionnement.",
    "partners.specialties": "Spécialités",
    "partners.learnMore": "En Savoir Plus",
    "partners.cta.title": "Intéressé par un Partenariat ?",
    "partners.cta.description": "Rejoignez notre réseau de partenaires de confiance et aidez-nous à livrer les meilleurs fruits exotiques sur les marchés du monde entier.",
    "partners.cta.button": "Contactez-nous",
    "partners.ctaTitle": "Intéressé par un Partenariat ?",
    "partners.ctaDescription": "Rejoignez notre réseau de partenaires de confiance et aidez-nous à livrer les meilleurs fruits exotiques sur les marchés du monde entier.",
    "partners.ctaButton": "Contactez-nous",
    "aboutUs.title": "À Propos de Nous",
    "aboutUs.company": "Exotic Fruits International",
    "aboutUs.description1": "est votre source de confiance pour les fruits exotiques et tropicaux premium, soigneusement récoltés des régions les plus fertiles de Colombie.",
    "aboutUs.description2": "Grâce à des partenariats solides avec les producteurs locaux, nous garantissons que chaque expédition offre une fraîcheur et une qualité inégalées — apportant la riche biodiversité de la Colombie directement à votre marché.",
    "aboutUs.learnMore": "En Savoir Plus sur Nous",
    "footer.brand.tagline": "Fruits exotiques premium du cœur de la Colombie. Qualité récoltée avec soin, livrée avec passion.",
    "footer.trustBadges.freshGuarantee": "Garantie Fraîcheur",
    "footer.trustBadges.fastDelivery": "Livraison Rapide",
    "footer.quickLinks.title": "Liens Rapides",
    "footer.quickLinks.home": "Accueil",
    "footer.quickLinks.fruits": "Nos Fruits",
    "footer.quickLinks.about": "À Propos",
    "footer.quickLinks.contact": "Contact",
    "footer.quickLinks.shipping": "Info Livraison",
    "footer.products.title": "Nos Produits",
    "footer.products.tropical": "Fruits Tropicaux",
    "footer.products.exotic": "Variétés Exotiques",
    "footer.products.citrus": "Agrumes",
    "footer.products.berries": "Baies Premium",
    "footer.products.seasonal": "Sélection Saisonnière",
    "footer.contact.title": "Contactez-nous",
    "footer.contact.location": "Medellín, Colombie",
    "footer.contact.phone": "+57 123 456 7890",
    "footer.contact.email": "info@fruitexotic.com",
    "footer.social.title": "Suivez Notre Parcours",
    "footer.social.subtitle": "Restez connecté avec nous pour des mises à jour fraîches, des vibrations tropicales, et les dernières nouvelles de Colombie",
    "specialties.nationwideDistribution": "Distribution à l'Échelle Nationale",
    "specialties.freshDelivery": "Livraison de Produits Frais",
    "specialties.qualityAssurance": "Garantie de Qualité",
    "specialties.premiumQuality": "Qualité Premium",
    "specialties.europeanDistribution": "Distribution Européenne",
    "specialties.exoticSpecialties": "Spécialités Exotiques",
    "specialties.gourmetSelection": "Sélection Gourmet",
    "specialties.premiumService": "Service Premium",
    "specialties.fineFoodDistribution": "Distribution Alimentaire Fine",
    "specialties.freshProduce": "Produits Frais",
    "specialties.canadianMarket": "Marché Canadien",
    "specialties.qualityDistribution": "Distribution de Qualité",
    "specialties.retailExcellence": "Excellence de Détail",
    "specialties.freshGroceries": "Épiceries Fraîches",
    "specialties.communityFocus": "Focus Communautaire",
    "specialties.foodService": "Service Alimentaire",
    "specialties.professionalDistribution": "Distribution Professionnelle",
    "specialties.restaurantSupply": "Approvisionnement Restaurant",
    "faq.title": "Questions Fréquemment Posées",
    "faq.questions.1.question": "Qu'est-ce qui rend vos fruits exotiques de qualité premium ?",
    "faq.questions.1.answer": "Nos fruits sont sourcés directement de fermes biologiques certifiées dans les régions les plus fertiles de Colombie. Nous maintenons des standards de contrôle qualité stricts, assurant une fraîcheur optimale grâce à notre logistique avancée de chaîne du froid et livrons seulement les meilleurs spécimens qui répondent à nos critères rigoureux de goût, apparence et valeur nutritionnelle.",
    "faq.questions.2.question": "Comment assurez-vous la fraîcheur pendant l'expédition internationale ?",
    "faq.questions.2.answer": "Nous utilisons des systèmes de distribution de chaîne du froid à la pointe de la technologie qui maintiennent des niveaux précis de température et d'humidité tout au long du voyage. Nos fruits sont récoltés à maturité optimale et immédiatement traités dans nos installations à température contrôlée, garantissant qu'ils arrivent à destination avec une fraîcheur et une saveur maximales.",
    "faq.questions.3.question": "En quels fruits exotiques vous spécialisez-vous ?",
    "faq.questions.3.answer": "Nous nous spécialisons dans une gamme diversifiée de fruits exotiques premium incluant le fruit du dragon, la physalis, le mangoustan, le tamarillo, le fruit de la passion, et de nombreuses variétés colombiennes rares. Notre sélection varie selon les saisons pour s'assurer que nous offrons toujours les fruits les plus frais et de la plus haute qualité disponibles de nos partenaires agricoles de confiance.",
    "faq.questions.4.question": "Offrez-vous des prix de gros pour les entreprises ?",
    "faq.questions.4.answer": "Oui, nous fournissons des prix de gros compétitifs pour les restaurants, épiceries, distributeurs et autres entreprises. Notre programme de gros inclut des remises sur volume, des horaires de livraison flexibles, et une gestion de compte dédiée pour s'assurer que votre entreprise reçoive des fruits exotiques de haute qualité de manière cohérente.",
    "faq.questions.5.question": "Quelles certifications ont vos fruits ?",
    "faq.questions.5.answer": "Nos fruits viennent avec des certifications complètes incluant la certification biologique, la conformité au commerce équitable, et les standards internationaux de sécurité alimentaire. Nous travaillons exclusivement avec des fermes certifiées qui suivent des pratiques agricoles durables et répondent à des critères stricts de responsabilité environnementale et sociale.",
    "faq.questions.6.question": "Comment puis-je passer une commande et quelles sont les quantités minimales ?",
    "faq.questions.6.answer": "Vous pouvez passer des commandes par notre site web ou en contactant directement notre équipe de ventes. Les quantités minimales de commande varient selon le type de fruit et la destination, mais nous accommodons aussi bien les petites commandes spécialisées que les grands envois commerciaux. Notre équipe travaillera avec vous pour trouver la meilleure solution pour vos besoins spécifiques.",
    "faq.cta.title": "Avez-vous Encore des Questions ?",
    "faq.cta.description": "Notre équipe d'experts est là pour vous aider à trouver les fruits exotiques parfaits pour vos besoins.",
    "faq.cta.button": "Contactez Nos Experts",
    "faq.stillHaveQuestions": "Avez-vous Encore des Questions ?",
    "faq.contactDescription": "Notre équipe d'experts est là pour vous aider à trouver les fruits exotiques parfaits pour vos besoins.",
    "faq.contactExperts": "Contactez Nos Experts",
    "products.title": "Nos Produits",
    "products.subtitle": "Qualité Premium",
    "products.description": "Découvrez notre sélection premium de fruits exotiques et tropicaux, soigneusement sourcés des meilleures fermes du monde. Des tropicaux classiques aux variétés rares, nous vous apportons les fruits les plus frais et les plus savoureux.",
    "products.sliderTitle": "Nos Fruits Exotiques Premium",
    "products.sliderDescription": "Découvrez l'incroyable variété de fruits exotiques frais que nous importons directement de Colombie",
    "common.exploreButton": "Explorez Nos Fruits",
    "common.discoverMore": "Découvrir Plus",
    "common.language": "Langue",
    "testimonials.title": "Témoignages",
    "testimonials.subtitle": "Ce que nos partenaires disent de nos fruits exotiques premium.",
    "testimonials.thomasFruits.quote": "Qualité du produit : Très bonne, fruits bien mûrs, peu de pertes à la réception.",
    "testimonials.thomasFruits.author": "Thomas Fruits",
    "testimonials.thomasFruits.meta": "Partenaire - Canada",
    "testimonials.iga.quote": "Qualité constante du produit : 5/5 – Les fruits sont frais, bien calibrés, avec une excellente présentation et une maturité idéale pour la vente.",
    "testimonials.iga.author": "IGA",
    "testimonials.iga.meta": "Partenaire - Canada"
  }
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale = "en" }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("exoticfruits-locale") as Locale;
      if (savedLocale && Object.keys(translations).includes(savedLocale)) {
        setLocale(savedLocale);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0] as Locale;
        if (Object.keys(translations).includes(browserLang)) {
          setLocale(browserLang);
        }
      }
    }
  }, []);

  // Save locale to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("exoticfruits-locale", locale);
    }
  }, [locale]);

  const t = (key: TranslationKey): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export type { Locale, TranslationKey };