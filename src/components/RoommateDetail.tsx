"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Roommate } from "@/types/roommate";
import VenmoButton from "./VenmoButton";
import PasswordModal from "./PasswordModal";
import { isAuthenticated, setAuthenticated } from "@/utils/passwordUtils";

interface RoommateDetailProps {
  roommate: Roommate;
}

export default function RoommateDetail({ roommate }: RoommateDetailProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = isAuthenticated(roommate.id);
    setIsUserAuthenticated(authStatus);

    // Only show password modal if not authenticated
    if (!authStatus) {
      setIsPasswordModalOpen(true);
    }
  }, [roommate.id]);

  const handlePasswordSuccess = () => {
    setIsUserAuthenticated(true);
    setIsPasswordModalOpen(false);
    setAuthenticated(roommate.id);
  };

  const handlePasswordClose = () => {
    // If user closes the modal without authentication, redirect to home
    router.push("/");
  };

  // Show password modal if not authenticated
  if (!isUserAuthenticated && isPasswordModalOpen) {
    return (
      <PasswordModal
        roommate={roommate}
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordClose}
        onSuccess={handlePasswordSuccess}
      />
    );
  }

  // If not authenticated, show loading
  if (!isUserAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, show the detail page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Roommates
          </Link>
        </div>

        {/* Main content card */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  {roommate.image ? (
                    <Image
                      src={roommate.image}
                      alt={`${roommate.name}'s photo`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {roommate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-center mb-2">
                {roommate.name}
              </h1>
              <p className="text-blue-100 text-center text-lg">
                Roommate Payment Details
              </p>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8">
            {/* Amount display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    ${roommate.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Monthly Rent
                  </p>
                </div>
              </div>
            </div>

            {/* Additional details */}
            <div className="grid grid-cols-1 mb-8">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Due Date
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      1st of Month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VenmoButton
                roommate={roommate}
                className="flex-1 sm:flex-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
