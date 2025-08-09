import { NextRequest, NextResponse } from "next/server";
import type { PrivateRoommate } from "@/types/roommate";

// Try to import private roommates, but handle the case where the file doesn't exist
let privateRoommates: PrivateRoommate[] = [];

// Function to load roommates data
async function loadPrivateRoommates(): Promise<PrivateRoommate[]> {
  try {
    // Use dynamic import for ES modules
    const roommatesModule = await import("@/data/roommates");
    return roommatesModule.privateRoommates || [];
  } catch {
    console.warn(
      "Private roommates data not found. Please create src/data/roommates.ts from the template."
    );
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    // Load roommates data if not already loaded
    if (privateRoommates.length === 0) {
      privateRoommates = await loadPrivateRoommates();
    }

    const { roommateId, password } = await request.json();

    // Check if private roommates data is available
    if (!privateRoommates || privateRoommates.length === 0) {
      return NextResponse.json(
        { error: "Roommate data not configured" },
        { status: 503 }
      );
    }

    // Find the roommate
    const roommate = privateRoommates.find((r) => r.id === roommateId);

    if (!roommate) {
      return NextResponse.json(
        { error: "Roommate not found" },
        { status: 404 }
      );
    }

    // Validate password - accept both DD/MM and DDMM formats
    const expectedPassword = roommate.birthday;
    const expectedPasswordWithoutSlash = expectedPassword.replace("/", "");

    const isValidPassword =
      password === expectedPassword ||
      password === expectedPasswordWithoutSlash;

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Return success without exposing sensitive data
    return NextResponse.json({
      success: true,
      roommate: {
        id: roommate.id,
        name: roommate.name,
        amount: roommate.amount,
        venmoNote: roommate.venmoNote,
        image: roommate.image,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
