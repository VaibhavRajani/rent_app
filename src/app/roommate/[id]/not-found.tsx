import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Error icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=center"
              alt="Error"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Roommate Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            The roommate you're looking for doesn't exist or may have been
            removed.
          </p>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=20&h=20&fit=crop&crop=center"
              alt="Back arrow"
              className="w-5 h-5 mr-2 rotate-180"
            />
            Back to All Roommates
          </Link>
        </div>
      </div>
    </div>
  );
}
