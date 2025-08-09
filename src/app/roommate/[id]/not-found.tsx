import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen theme-bg flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Error icon */}
        <div className="w-24 h-24 theme-error rounded-full flex items-center justify-center mx-auto mb-8">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=96&h=96&fit=crop&crop=center"
            alt="Error"
            width={96}
            height={96}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Error message */}
        <h1 className="text-4xl font-bold theme-text mb-4">
          Roommate Not Found
        </h1>
        <p className="text-lg theme-text-secondary mb-8">
          Sorry, we couldn&apos;t find the roommate you&apos;re looking for.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 theme-primary rounded-xl font-semibold hover:theme-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
