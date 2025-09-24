"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import EmailVerification from "@/components/auth/EmailVerification";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login, signup } = useAuth();

  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData({ name: "", email: "", password: "" });
        setIsLoading(false);
        setErrors({});
        setApiError("");
        setShowEmailVerification(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Nom est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await login(formData.email, formData.password);
        if (response.requiresVerification) {
          setShowEmailVerification(true);
        } else {
          onClose();
        }
      } else {
        const response = await signup(
          formData.name,
          formData.email,
          formData.password
        );
        if (response.requiresVerification) {
          setShowEmailVerification(true);
        } else {
          onClose();
        }
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setApiError("");
    setShowEmailVerification(false);
    setShowForgotPassword(false);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleVerificationSuccess = () => {
    // Close modal after successful verification
    onClose();
  };

  const handleBackToLogin = () => {
    setShowEmailVerification(false);
    setIsLogin(true);
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: "Email est requis" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiError("");
        alert(
          "Si un compte avec cet email existe, un lien de réinitialisation a été envoyé."
        );
        setShowForgotPassword(false);
      } else {
        setApiError(data.error || "Une erreur est survenue");
      }
    } catch {
      setApiError("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToAuth = () => {
    setShowForgotPassword(false);
    setShowEmailVerification(false);
    setIsLogin(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {showEmailVerification ? (
                <>
                  {/* Email Verification Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-cinzel font-bold text-[var(--color-brand)]">
                      Vérification Email
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Email Verification Component */}
                  <EmailVerification
                    email={formData.email}
                    userName={formData.name || formData.email.split("@")[0]}
                    onVerificationSuccess={handleVerificationSuccess}
                    onBackToLogin={handleBackToLogin}
                  />
                </>
              ) : showForgotPassword ? (
                <>
                  {/* Forgot Password Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-cinzel font-bold text-[var(--color-brand)]">
                      Réinitialiser le mot de passe
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Forgot Password Form */}
                  <div className="p-6 space-y-4">
                    {apiError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-700">{apiError}</span>
                      </div>
                    )}

                    <p className="text-sm text-gray-600">
                      Entrez votre adresse email et nous vous enverrons un lien
                      pour réinitialiser votre mot de passe.
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleForgotPassword}
                      disabled={isLoading}
                      className="w-full bg-[var(--color-brand)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        "Envoyer le lien de réinitialisation"
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleBackToAuth}
                        className="text-[var(--color-brand)] hover:underline text-sm"
                      >
                        Retour à la connexion
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Normal Auth Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-cinzel font-bold text-[var(--color-brand)]">
                      {isLogin ? "Se connecter" : "Créer un compte"}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {apiError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-700">{apiError}</span>
                      </div>
                    )}

                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Votre nom"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Votre mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-[var(--color-brand)] hover:underline"
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[var(--color-brand)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {isLogin ? "Connexion..." : "Inscription..."}
                        </div>
                      ) : isLogin ? (
                        "Se connecter"
                      ) : (
                        "Créer un compte"
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-[var(--color-brand)] hover:underline text-sm"
                      >
                        {isLogin
                          ? "Pas de compte ? S'inscrire"
                          : "Déjà un compte ? Se connecter"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
