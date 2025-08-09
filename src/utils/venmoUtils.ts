import { PublicRoommate } from "@/types/roommate";

// Helper function to clean username (remove @ if present)
function cleanVenmoUsername(username: string): string {
  return username.startsWith("@") ? username.slice(1) : username;
}

export function generateVenmoLink(
  roommate: PublicRoommate,
  venmoUsername: string
): string {
  const amount = roommate.amount;
  const note = roommate.venmoNote || `Rent payment for ${roommate.name}`;
  const cleanUsername = cleanVenmoUsername(venmoUsername);

  // Venmo deep link format: venmo://paycharge?txn=pay&recipients=USERNAME&amount=AMOUNT&note=NOTE
  const venmoDeepLink = `venmo://paycharge?txn=pay&recipients=${encodeURIComponent(
    cleanUsername
  )}&amount=${amount}&note=${encodeURIComponent(note)}`;

  return venmoDeepLink;
}

export function generateVenmoWebLink(
  roommate: PublicRoommate,
  venmoUsername: string
): string {
  const amount = roommate.amount;
  const note = roommate.venmoNote || `Rent payment for ${roommate.name}`;
  const cleanUsername = cleanVenmoUsername(venmoUsername);

  // Fallback web link: https://venmo.com/USERNAME?txn=pay&amount=AMOUNT&note=NOTE
  return `https://venmo.com/${cleanUsername}?txn=pay&amount=${amount}&note=${encodeURIComponent(
    note
  )}`;
}

export function openVenmoPayment(
  roommate: PublicRoommate,
  venmoUsername: string
): void {
  const venmoLink = generateVenmoLink(roommate, venmoUsername);

  // Try to open the Venmo app first
  const link = document.createElement("a");
  link.href = venmoLink;
  link.click();

  // Fallback to web version after a short delay if app doesn't open
  setTimeout(() => {
    const webLink = generateVenmoWebLink(roommate, venmoUsername);
    window.open(webLink, "_blank", "noopener,noreferrer");
  }, 1000);
}
