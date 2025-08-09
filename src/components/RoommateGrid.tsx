"use client";

import { Roommate } from "@/types/roommate";
import RoommateCard from "./RoommateCard";

interface RoommateGridProps {
  roommates: Roommate[];
}

export default function RoommateGrid({ roommates }: RoommateGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {roommates.map((roommate) => (
        <RoommateCard key={roommate.id} roommate={roommate} />
      ))}
    </div>
  );
}
