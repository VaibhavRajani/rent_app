import { NextRequest, NextResponse } from "next/server";
import type { PrivateRoommate } from "@/types/roommate";

// Try to import private roommates, but handle the case where the file doesn't exist
let privateRoommates: PrivateRoommate[] = [];

// Function to load roommates data from environment variables or file
async function loadPrivateRoommates(): Promise<PrivateRoommate[]> {
  try {
    // First, try to load from environment variables (production)
    if (process.env.ROOMMATES_DATA) {
      try {
        const roommatesData = JSON.parse(process.env.ROOMMATES_DATA);
        if (Array.isArray(roommatesData)) {
          console.log(
            `Loaded ${roommatesData.length} roommates from environment variables`
          );
          return roommatesData;
        }
      } catch (error) {
        console.error(
          "Failed to parse ROOMMATES_DATA from environment:",
          error
        );
      }
    }

    // Fallback to file system (development)
    const roommatesModule = await import("../../../data/roommates");
    const roommates = roommatesModule.privateRoommates;

    if (!roommates || !Array.isArray(roommates)) {
      console.error("Invalid roommates data structure");
      return [];
    }

    console.log(`Loaded ${roommates.length} roommates from file system`);
    return roommates;
  } catch (error) {
    console.error("Failed to load roommates data:", error);
    // Return empty array if import fails
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    // Load roommates data if not already loaded
    if (privateRoommates.length === 0) {
      privateRoommates = await loadPrivateRoommates();
      console.log(`Loaded ${privateRoommates.length} roommates for auth route`);
    }

    const { roommateId, password } = await request.json();

    // Check if private roommates data is available
    if (!privateRoommates || privateRoommates.length === 0) {
      console.error("No roommates data available for auth");
      return NextResponse.json(
        { error: "Roommate data not configured" },
        { status: 503 }
      );
    }

    // Find the roommate
    const roommate = privateRoommates.find((r) => r.id === roommateId);

    if (!roommate) {
      console.error(`Roommate not found: ${roommateId}`);
      console.log(
        `Available roommates: ${privateRoommates.map((r) => r.id).join(", ")}`
      );
      return NextResponse.json(
        { error: "Roommate not found" },
        { status: 404 }
      );
    }

    // Validate password - accept both DD/MM and DDMM formats
    const expectedPassword = roommate.birthday;
    const expectedPasswordWithoutSlash = expectedPassword.replace("/", "");

    // Also handle the case where password might be formatted (digits only)
    const formattedPassword = password.replace(/\D/g, ""); // Remove non-digits

    // Normalize all passwords for comparison (remove slashes and spaces)
    const normalizedPassword = password.replace(/[/\s]/g, "");
    const normalizedExpected = expectedPassword.replace(/[/\s]/g, "");

    const isValidPassword =
      password === expectedPassword ||
      password === expectedPasswordWithoutSlash ||
      formattedPassword === expectedPasswordWithoutSlash ||
      normalizedPassword === normalizedExpected;

    // Add detailed logging for debugging
    console.log(`Auth attempt for ${roommate.name} (${roommateId}):`);
    console.log(
      `  Expected: ${expectedPassword} or ${expectedPasswordWithoutSlash}`
    );
    console.log(`  Received: ${password}`);
    console.log(`  Formatted: ${formattedPassword}`);
    console.log(`  Normalized: ${normalizedPassword} vs ${normalizedExpected}`);
    console.log(`  Valid: ${isValidPassword}`);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
          hint: `Expected: ${expectedPassword} or ${expectedPasswordWithoutSlash}, Received: ${password}`,
        },
        { status: 401 }
      );
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
