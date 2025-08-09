import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Error icon */}
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=96&h=96&fit=crop&crop=center"
            alt="Error"
            width={96}
            height={96}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Error message */}
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Roommate Not Found
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Sorry, we couldn&apos;t find the roommate you&apos;re looking for.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=20&h=20&fit=crop&crop=center"
            alt="Arrow"
            width={20}
            height={20}
            className="w-5 h-5 mr-2 transform rotate-180"
          />
          Back to All Roommates
        </Link>
      </div>
    </div>
  );
}
