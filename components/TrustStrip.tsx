import Link from "next/link";
import Image from "next/image";

// Only official government statistics sources whose data is actually used in the pipeline
// and whose branding we are permitted to display (open data / open government licences).
// Glassdoor, Indeed, and Levels.fyi are NOT shown here — they are not licensed for
// logo display and/or are not primary data sources.
const SOURCES = [
  { src: "/logos/eurostat.png", alt: "Eurostat", width: 72, height: 24, displayHeight: 24 },
  { src: "/logos/ons.png",      alt: "ONS",      width: 48, height: 24, displayHeight: 22 },
];

export default function TrustStrip() {
  const MONTH_YEAR = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-400 mb-2.5">
        Built using official public salary datasets and verified market benchmarks
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {SOURCES.map(({ src, alt, width, height, displayHeight }) => (
          <Image
            key={alt}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="opacity-35 grayscale hover:opacity-55 transition-opacity"
            style={{ objectFit: "contain", height: `${displayHeight}px`, width: "auto" }}
          />
        ))}
        <span className="text-xs text-gray-300 font-medium">+ national statistics offices</span>
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
