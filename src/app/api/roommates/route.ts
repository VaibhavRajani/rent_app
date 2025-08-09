import { NextResponse } from "next/server";
import { publicRoommates } from "@/data/publicRoommates";

export async function GET() {
  try {
    // Return only public roommate data (no birthdays, emails, etc.)
    return NextResponse.json(publicRoommates);
  } catch (error) {
    console.error("Error fetching roommates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
