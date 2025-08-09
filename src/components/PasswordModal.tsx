"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Roommate } from "@/types/roommate";
import { validatePassword, formatPassword } from "@/utils/passwordUtils";

interface PasswordModalProps {
  roommate: Roommate;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PasswordModal({
  roommate,
  isOpen,
  onClose,
  onSuccess,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatPassword(e.target.value);
    setPassword(value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate loading
    setTimeout(() => {
      if (validatePassword(roommate, password)) {
        setIsLoading(false);
        onSuccess();
        setPassword("");
      } else {
        setIsLoading(false);
        setError("Incorrect password. Hint: DD/MM format");
        setPassword("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative theme-bg-secondary backdrop-blur-sm rounded-2xl shadow-2xl theme-border border p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="password-modal-title"
        aria-describedby="password-modal-description"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-bg-tertiary flex items-center justify-center hover:theme-bg transition-colors"
        >
          <svg
            className="w-4 h-4 theme-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Avatar */}
          <div className="w-16 h-16 theme-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
            {roommate.image ? (
              <Image
                src={roommate.image}
                alt={`${roommate.name}'s photo`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold theme-text">
                {roommate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>

          <h2
            id="password-modal-title"
            className="text-2xl font-bold theme-text mb-2"
          >
            {roommate.name}
          </h2>
          <p
            id="password-modal-description"
            className="theme-text-secondary mb-6"
          >
            Enter your 4-digit password to view details
          </p>

          {/* Password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                placeholder="DDMM"
                className="w-full px-4 py-3 text-center text-2xl font-mono theme-bg-tertiary theme-border border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 theme-text"
                maxLength={4}
                autoComplete="off"
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="flex space-x-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i < password.length
                          ? "theme-primary"
                          : "theme-muted-text"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="theme-error text-sm animate-in slide-in-from-top-2 duration-200">
                {error}
              </div>
            )}

            {/* Hint */}
            <div className="text-xs theme-text-tertiary">
              💡 Hint: Your birthday in DD/MM format
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={password.length !== 4 || isLoading}
              className="w-full px-6 py-3 theme-primary rounded-xl font-semibold hover:theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Verifying...
                </div>
              ) : (
                "Access Details"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
