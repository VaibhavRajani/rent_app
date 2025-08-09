import { NextRequest, NextResponse } from "next/server";
import { publicRoommates } from "@/data/publicRoommates";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find the roommate in public data
    const roommate = publicRoommates.find((r) => r.id === id);

    if (!roommate) {
      return NextResponse.json(
        { error: "Roommate not found" },
        { status: 404 }
      );
    }

    // Return only public roommate data
    return NextResponse.json(roommate);
  } catch (error) {
    console.error("Error fetching roommate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
