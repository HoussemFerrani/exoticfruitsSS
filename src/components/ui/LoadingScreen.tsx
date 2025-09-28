"use client";

import Image from "next/image";
import React from "react";

type LoadingScreenProps = {
  message?: string;
};

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: "#fffef7",
      }}
      aria-label="Loading"
      role="status"
    >
      <div className="w-full max-w-sm px-8">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/logo  fruit exotic.png"
            alt="Fruit Exotic International Logo"
            width={160}
            height={160}
            priority
            className="h-32 w-auto drop-shadow-sm"
          />

          <div className="w-full">
            <div className="loading-bar-track" aria-hidden>
              <div className="loading-bar-fill" />
            </div>
            {message ? (
              <p className="mt-3 text-center text-sm" style={{ color: "var(--color-muted)" }}>
                {message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}


