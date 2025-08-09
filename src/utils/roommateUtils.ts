import { publicRoommates } from "@/data/publicRoommates";
import { PublicRoommate } from "@/types/roommate";

export function getAllRoommates(): PublicRoommate[] {
  return publicRoommates;
}

export function getRoommateById(id: string): PublicRoommate | undefined {
  return publicRoommates.find((roommate) => roommate.id === id);
}

export function getRoommateIds(): string[] {
  return publicRoommates.map((roommate) => roommate.id);
}
