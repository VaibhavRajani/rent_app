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
        <div className="relative overflow-hidden theme-bg-secondary backdrop-blur-sm rounded-2xl p-8 theme-border border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:theme-bg-tertiary">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Avatar */}
            <div className="w-16 h-16 theme-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {roommate.image ? (
                <Image
                  src={roommate.image}
                  alt={`${roommate.name}'s photo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold theme-text">
                  {roommate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="text-xl font-semibold theme-text text-center mb-3 group-hover:theme-primary-text transition-colors duration-300">
              {roommate.name}
            </h3>

            {/* Amount */}
            <div className="text-center mb-4">
              <p className="text-3xl font-bold theme-primary-text">
                ${roommate.amount.toLocaleString()}
              </p>
              <p className="text-sm theme-text-secondary mt-1">Monthly Rent</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleViewDetails}
                className="flex items-center justify-center theme-text-secondary group-hover:theme-primary-text transition-colors duration-300 theme-bg-tertiary rounded-lg py-2 px-4 hover:theme-bg"
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
          <div className="absolute top-4 right-4 w-2 h-2 theme-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 theme-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
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
