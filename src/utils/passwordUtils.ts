import { PublicRoommate } from "@/types/roommate";

export function formatPassword(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Limit to 4 digits
  return digits.slice(0, 4);
}

export async function validatePasswordServerSide(
  roommateId: string,
  password: string
): Promise<{ success: boolean; roommate?: PublicRoommate; error?: string }> {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roommateId,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Authentication failed",
      };
    }

    return {
      success: true,
      roommate: data.roommate,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      error: "Network error",
    };
  }
}

// Legacy function for backward compatibility (deprecated)
export function validatePassword(
  roommate: { birthday?: string },
  password: string
): boolean {
  console.warn(
    "validatePassword is deprecated. Use validatePasswordServerSide instead."
  );
  return roommate.birthday === password;
}

export function getPasswordHint(roommate: { birthday?: string }): string {
  return roommate.birthday
    ? `Your birthday: ${roommate.birthday}`
    : "DD/MM format";
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
