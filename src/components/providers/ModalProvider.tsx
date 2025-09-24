"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "@/components/models/AuthModal";

export type ModalType = "auth";

type ModalContextValue = {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
}

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("auth");

  const openModal = useCallback((type: ModalType) => {
    setModalType(type);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openModal, closeModal, isModalOpen: isOpen }),
    [openModal, closeModal, isOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalType === "auth" && (
        <AuthModal isOpen={isOpen} onClose={closeModal} />
      )}
    </ModalContext.Provider>
  );
}


