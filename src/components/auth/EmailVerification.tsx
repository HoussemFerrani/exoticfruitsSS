"use client";

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface EmailVerificationProps {
  email: string;
  userName: string;
  onVerificationSuccess: () => void;
  onBackToLogin: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onVerificationSuccess,
  onBackToLogin
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const { completeEmailVerification } = useAuth();

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!verificationCode) {
      setError('Veuillez entrer le code de vérification');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Le code de vérification doit contenir 6 chiffres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la vérification');
      }

      setSuccess('✅ Email vérifié avec succès ! Connexion automatique...');
      
      // Automatically log in the user with the token from verification
      if (data.token && data.user) {
        completeEmailVerification(data.user, data.token);
      }
      
      setTimeout(() => {
        onVerificationSuccess();
      }, 1500);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setIsResending(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la réexpédition');
      }

      setSuccess('Un nouveau code a été envoyé à votre email');
      setCanResend(false);
      setCountdown(60);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la réexpédition');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-cinzel font-bold text-[var(--color-brand)] mb-2">
          Vérification Email
        </h3>
        <p className="text-gray-600 text-sm">
          Nous avons envoyé un code de vérification à <br />
          <span className="font-semibold">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code de vérification (6 chiffres)
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setVerificationCode(value);
              setError('');
            }}
            placeholder="123456"
            className="w-full px-4 py-3 text-center text-lg font-mono tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all"
            maxLength={6}
            autoComplete="one-time-code"
          />
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Success Display */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading || verificationCode.length !== 6}
          className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand)]/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all"
        >
          {isLoading ? 'Vérification...' : 'Vérifier'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Vous n&apos;avez pas reçu le code ?
          </p>
          <button
            onClick={handleResend}
            disabled={!canResend || isResending}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-brand)] hover:text-[var(--color-brand)]/80 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
            {isResending ? 'Réexpédition...' : 
             canResend ? 'Renvoyer le code' : 
             `Renvoyer (${countdown}s)`}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={onBackToLogin}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailVerification;
