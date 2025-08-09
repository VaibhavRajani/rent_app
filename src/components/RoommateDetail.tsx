"use client";

import Link from "next/link";
import Image from "next/image";
import { PublicRoommate } from "@/types/roommate";
import VenmoButton from "./VenmoButton";

interface RoommateDetailProps {
  roommate: PublicRoommate;
}

export default function RoommateDetail({ roommate }: RoommateDetailProps) {
  return (
    <div className="min-h-screen theme-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 theme-bg-secondary backdrop-blur-sm theme-text-secondary rounded-xl hover:theme-bg-tertiary transition-all duration-300 shadow-lg hover:shadow-xl theme-border border"
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
        <div className="theme-bg-secondary backdrop-blur-sm rounded-3xl shadow-2xl theme-border border overflow-hidden">
          {/* Header section */}
          <div className="theme-primary p-8 relative overflow-hidden">
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
              <h1 className="text-4xl font-bold text-center mb-2 text-white">
                {roommate.name}
              </h1>
              <p className="text-white/80 text-center text-lg">
                Roommate Payment Details
              </p>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8">
            {/* Amount display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 theme-bg-tertiary rounded-full mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold theme-primary-text">
                    ${roommate.amount.toLocaleString()}
                  </p>
                  <p className="text-sm theme-text-secondary mt-1">
                    Monthly Rent
                  </p>
                </div>
              </div>
            </div>

            {/* Additional details */}
            <div className="grid grid-cols-1 mb-8">
              <div className="theme-bg-tertiary rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium theme-text-secondary">
                      Due Date
                    </p>
                    <p className="text-lg font-semibold theme-text">
                      1st of Every Month
                    </p>
                  </div>
                  <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
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
