"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-black text-orange-100 mb-4">!</p>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Something went wrong</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        An unexpected error occurred. Try again or head back to the salary checker.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
