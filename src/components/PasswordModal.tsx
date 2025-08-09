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
        className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="password-modal-title"
        aria-describedby="password-modal-description"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
            {roommate.image ? (
              <Image
                src={roommate.image}
                alt={`${roommate.name}'s photo`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-white">
                {roommate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>

          <h2
            id="password-modal-title"
            className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
          >
            {roommate.name}
          </h2>
          <p
            id="password-modal-description"
            className="text-slate-600 dark:text-slate-400 mb-6"
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
                className="w-full px-4 py-3 text-center text-2xl font-mono bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                          ? "bg-blue-500"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm animate-in slide-in-from-top-2 duration-200">
                {error}
              </div>
            )}

            {/* Hint */}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              💡 Hint: Your birthday in DD/MM format
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={password.length !== 4 || isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1"
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
