import { roommates } from "@/data/roommates";
import { Roommate } from "@/types/roommate";

export function getAllRoommates(): Roommate[] {
  return roommates;
}

export function getRoommateById(id: string): Roommate | undefined {
  return roommates.find((roommate) => roommate.id === id);
}

export function getRoommateIds(): string[] {
  return roommates.map((roommate) => roommate.id);
}
