import Link from "next/link";
import Image from "next/image";

const SOURCES = [
  { src: "/logos/eurostat.png",  alt: "Eurostat",    width: 72,  height: 24 },
  { src: "/logos/ons.png",       alt: "ONS",         width: 48,  height: 24 },
  { src: "/logos/glassdoor.svg", alt: "Glassdoor",   width: 80,  height: 24 },
  { src: "/logos/indeed.png",    alt: "Indeed",      width: 56,  height: 24 },
  { src: "/logos/levelsfyi.svg", alt: "Levels.fyi",  width: 72,  height: 24 },
];

export default function TrustStrip() {
  const MONTH_YEAR = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-400 mb-2.5">Benchmarked against public data from:</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {SOURCES.map(({ src, alt, width, height }) => (
          <Image
            key={alt}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="opacity-30 grayscale hover:opacity-50 transition-opacity"
            style={{ objectFit: "contain", height: "20px", width: "auto" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <p className="text-xs text-gray-300">
          Updated {MONTH_YEAR} · Estimates based on public benchmarks &amp; structured modelling
        </p>
        <Link href="/methodology" className="text-xs text-orange-500 hover:underline font-medium whitespace-nowrap ml-3">
          How we calculate →
        </Link>
      </div>
    </div>
  );
}
