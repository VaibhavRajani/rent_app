import { getRoommateById } from "@/utils/roommateUtils";
import RoommateDetail from "@/components/RoommateDetail";
import { notFound } from "next/navigation";

interface RoommatePageProps {
  params: {
    id: string;
  };
}

export default function RoommatePage({ params }: RoommatePageProps) {
  const roommate = getRoommateById(params.id);

  if (!roommate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoommateDetail roommate={roommate} />
    </div>
  );
}
