import { getRoommateById } from "@/utils/roommateUtils";
import RoommateDetail from "@/components/RoommateDetail";
import { notFound } from "next/navigation";

interface RoommatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoommatePage({ params }: RoommatePageProps) {
  const { id } = await params;
  const roommate = getRoommateById(id);

  if (!roommate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoommateDetail roommate={roommate} />
    </div>
  );
}
