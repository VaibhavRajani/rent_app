"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Roommate } from "@/types/roommate";
import PasswordModal from "./PasswordModal";

interface RoommateCardProps {
  roommate: Roommate;
}

export default function RoommateCard({ roommate }: RoommateCardProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const handleViewDetails = () => {
    // always prompt
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    router.push(`/roommate/${roommate.id}`);
  };

  return (
    <>
      <div className="group block relative">
        <div className="relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-slate-800/80">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {roommate.image ? (
                <Image
                  src={roommate.image}
                  alt={`${roommate.name}'s photo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {roommate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {roommate.name}
            </h3>

            {/* Amount */}
            <div className="text-center mb-4">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                ${roommate.amount.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Monthly Rent
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleViewDetails}
                className="flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300 bg-slate-100 dark:bg-slate-700/50 rounded-lg py-2 px-4 hover:bg-slate-200 dark:hover:bg-slate-700/70"
              >
                <span className="text-sm font-medium mr-2">View Details</span>
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=16&h=16&fit=crop&crop=center"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        roommate={roommate}
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </>
  );
}
