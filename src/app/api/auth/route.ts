import { NextRequest, NextResponse } from "next/server";
import { privateRoommates } from "@/data/roommates";

export async function POST(request: NextRequest) {
  try {
    const { roommateId, password } = await request.json();

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
