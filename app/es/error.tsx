"use client";

import Link from "next/link";

export default function ErrorES({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-black text-orange-100 mb-4">!</p>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Algo ha salido mal</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Ha ocurrido un error inesperado. Inténtalo de nuevo o vuelve a la calculadora.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/es/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
