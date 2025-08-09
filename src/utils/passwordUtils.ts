import { Roommate } from "@/types/roommate";

export function validatePassword(
  roommate: Roommate,
  password: string
): boolean {
  const expectedPassword = roommate.birthday?.replace("/", "") || "";
  return password === expectedPassword;
}

export function getPasswordHint(roommate: Roommate): string {
  return roommate.birthday
    ? `Your birthday: ${roommate.birthday}`
    : "DD/MM format";
}

export function formatPassword(password: string): string {
  // Remove non-digits and limit to 4 characters
  return password.replace(/\D/g, "").slice(0, 4);
}

export function isAuthenticated(roommateId: string): boolean {
  const authKey = `auth_${roommateId}`;
  return sessionStorage.getItem(authKey) === "true";
}

export function setAuthenticated(roommateId: string): void {
  const authKey = `auth_${roommateId}`;
  sessionStorage.setItem(authKey, "true");
}

export function clearAuthentication(roommateId: string): void {
  const authKey = `auth_${roommateId}`;
  sessionStorage.removeItem(authKey);
}
