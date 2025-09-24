"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/components/providers/ModalProvider";

export type ServiceInfo = {
  id: string;
  title: string;
  imageSrc: string;
  pricing: string;
  description: string;
  features: string[];
};

const SERVICE_DETAILS: ServiceInfo[] = [
  {
    id: "audio",
    title: "Appels vocaux",
    imageSrc: "/ServiceSection/AppelsVocaux.jpg",
    pricing: "20 $ / 30 min · 35 $ / 1 h",
    description: "Une voix qui t'écoute vraiment, sans jugement.",
    features: [
      "Raconte ta journée après le boulot.",
      "Brise la solitude, comme un café avec un ami.",
    ],
  },
  {
    id: "anonymous",
    title: "Appels anonymes",
    imageSrc: "/ServiceSection/AnonymousCalls.png",
    pricing: "20 $ / 30 min · 35 $ / 1 h",
    description: "Parle librement, en toute discrétion.",
    features: [
      "Confie un secret sans jamais dire ton nom.",
      "Vide ton sac, sans filtre ni gêne.",
    ],
  },
  {
    id: "visio",
    title: "Appels visio",
    imageSrc: "/ServiceSection/AppelVisio.jpg",
    pricing: "25 $ / 30 min · 45 $ / 1 h",
    description: "Parce que voir un visage change tout.",
    features: [
      "Un café virtuel qui ressemble à un vrai.",
      "Sourires, regards, une vraie présence à distance.",
    ],
  },
  {
    id: "presence",
    title: "Activités en personne",
    imageSrc: "/ServiceSection/ActivitesPresence.jpg",
    pricing: "dès 90 $ / h",
    description: "Une présence dédiée, pensée pour toi.",
      features: [
      "Être accompagné à un mariage ou une sortie.",
      "Partager une marche, un café ou un repas.",
      "Service haut de gamme sur mesure, construit avec le client selon ses besoins.",
    ],
  },
];

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
}

export default function ServiceModal({
  isOpen,
  onClose,
  serviceId,
}: ServiceModalProps) {
  const service = SERVICE_DETAILS.find((s) => s.id === serviceId);
  const router = useRouter();
  const { user } = useAuth();
  const { openModal } = useModal();

  // Service to checkout route mapping
  const getCheckoutRoute = (serviceId: string) => {
    const routeMap: Record<string, string> = {
      'audio': '/checkout/services/audio',
      'anonymous': '/checkout/services/anonymous', 
      'visio': '/checkout/services/visio',
      'presence': '/checkout/services/presence-inperson'
    };
    return routeMap[serviceId] || '/checkout/cancel';
  };

  const handleReservation = () => {
    if (!user) {
      // Close service modal first, then open auth modal
      onClose();
      setTimeout(() => {
        openModal("auth");
      }, 100);
      return;
    }

    // User is authenticated, redirect to checkout
    const checkoutRoute = getCheckoutRoute(serviceId!);
    onClose();
    router.push(checkoutRoute);
  };

  // Handle ESC key press and prevent body scroll
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const preventScroll = (e: TouchEvent) => {
      // Allow scrolling within modal content areas
      const target = e.target as HTMLElement;
      const modalContent = target.closest("[data-modal-content]");
      if (modalContent) {
        return; // Allow the event to proceed
      }
      e.preventDefault();
    };

    if (isOpen) {
      // Prevent body scroll when modal is open
      const scrollY = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      document.addEventListener("keydown", handleEscKey);
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        // Restore body scroll when modal closes
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);

        document.removeEventListener("keydown", handleEscKey);
        document.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isOpen, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-2 sm:inset-4 z-[70] flex items-center justify-center p-2 sm:p-4"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
              data-modal-content
            >
              {/* Header */}
              <div className="relative p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 48px, 64px"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                    <p className="text-base sm:text-lg font-semibold text-orange-600 mt-1">
                      {service.pricing}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div
                className={`p-4 sm:p-6 overflow-y-auto ${
                  service.id === "presence"
                    ? "max-h-[45vh] sm:max-h-[55vh]"
                    : "max-h-[50vh] sm:max-h-[60vh]"
                }`}
              >
                <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 sm:space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Special note for in-person activities */}
                {service.id === "presence" && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-blue-800 text-sm leading-relaxed">
                      <strong>
                        Ce prix inclut un accompagnement personnalisé, une
                        présence 100 % dédiée et un cadre sûr.
                      </strong>{" "}
                      Plus qu&apos;une simple sortie, c&apos;est un vrai moment
                      humain, pensé pour vous.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer touch-manipulation"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={handleReservation}
                    className="w-full sm:flex-1 px-4 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors cursor-pointer touch-manipulation"
                  >
                    {user ? "Réserver maintenant" : "Se connecter"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
