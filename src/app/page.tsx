import { getAllRoommates } from "@/utils/roommateUtils";
import RoommateGrid from "@/components/RoommateGrid";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

export default function Home() {
  const roommates = getAllRoommates();

  return (
    <div className="min-h-screen theme-bg">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 theme-primary rounded-full mb-6 shadow-lg">
            <svg
              className="w-8 h-8 theme-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold theme-text mb-4">
            683 Washington St - APT 5
          </h1>
          <p className="text-xl theme-text-secondary max-w-2xl mx-auto">
            Pay your rent here.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="theme-bg-secondary backdrop-blur-sm rounded-2xl p-6 theme-border border shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium theme-text-secondary">
                  Total Roommates
                </p>
                <p className="text-3xl font-bold theme-text">
                  {roommates.length}
                </p>
              </div>
              <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 theme-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="theme-bg-secondary backdrop-blur-sm rounded-2xl p-6 theme-border border shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium theme-text-secondary">
                  Total Monthly Rent
                </p>
                <p className="text-3xl font-bold theme-text">
                  $
                  {roommates
                    .reduce((sum, roommate) => sum + roommate.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 theme-success rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 theme-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Roommates Grid */}
        <div>
          <h2 className="text-2xl font-semibold theme-text mb-8 text-center">
            Roommate Payments
          </h2>
          <RoommateGrid roommates={roommates} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
