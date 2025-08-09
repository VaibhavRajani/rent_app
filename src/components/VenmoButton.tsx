"use client";

import { Roommate } from "@/types/roommate";
import { VENMO_CONFIG } from "@/config/venmo";
import { generateVenmoLink, generateVenmoWebLink } from "@/utils/venmoUtils";
import Image from "next/image";

interface VenmoButtonProps {
  roommate: Roommate;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function VenmoButton({
  roommate,
  className = "",
  variant = "primary",
}: VenmoButtonProps) {
  const handleVenmoClick = () => {
    const venmoLink = generateVenmoLink(roommate, VENMO_CONFIG.username);
    const link = document.createElement("a");
    link.href = venmoLink;
    link.click();
    setTimeout(() => {
      const webLink = generateVenmoWebLink(roommate, VENMO_CONFIG.username);
      window.open(webLink, "_blank", "noopener,noreferrer");
    }, 1000);
  };

  const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1";
  const variantClasses =
    variant === "primary"
      ? "theme-venmo-primary"
      : "theme-bg-secondary theme-text-secondary hover:theme-bg-tertiary border theme-border";

  return (
    <button
      onClick={handleVenmoClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <div className="w-5 h-5 mr-2 flex items-center justify-center bg-white/20 rounded-full">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=20&h=20&fit=crop&crop=center"
          alt="Venmo"
          width={20}
          height={20}
          className="w-4 h-4 rounded-full object-cover"
        />
      </div>
      Pay ${roommate.amount.toLocaleString()} via Venmo
    </button>
  );
}
