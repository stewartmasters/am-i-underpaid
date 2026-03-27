import Link from "next/link";
import Image from "next/image";

// Only official government statistics sources actually used in the pipeline,
// under open data licences permitting attribution display.
// Glassdoor, Indeed, and Levels.fyi are NOT shown — they are not licensed for
// branding display and/or are not primary data sources.
const SOURCES = [
  { src: "/logos/eurostat.png", alt: "Eurostat", width: 120, height: 32 },
  { src: "/logos/ons.png",      alt: "ONS",      width: 80,  height: 32 },
  { src: "/logos/destatis.png", alt: "Destatis", width: 100, height: 32 },
  { src: "/logos/ine.png",      alt: "INE",      width: 60,  height: 32 },
  { src: "/logos/bfs.jpg",      alt: "BFS",      width: 80,  height: 32 },
  { src: "/logos/scb.png",      alt: "SCB",      width: 80,  height: 32 },
  { src: "/logos/istat.png",    alt: "Istat",    width: 80,  height: 32 },
  { src: "/logos/gus.png",      alt: "GUS",      width: 80,  height: 32 },
];

export default function TrustStrip() {
  const MONTH_YEAR = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-xs font-medium text-gray-500 mb-3">
        Built using official public salary datasets and verified market benchmarks
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-2">
        {SOURCES.map(({ src, alt, width, height }) => (
          <Image
            key={alt}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="opacity-40 grayscale hover:opacity-60 transition-opacity"
            style={{ objectFit: "contain", height: "32px", width: "auto" }}
          />
        ))}
        <span className="text-xs text-gray-400 font-medium">+ national statistical offices</span>
      </div>
      <p className="text-xs text-gray-400 mb-2.5">Coverage varies by role and location.</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-300">
          Updated {MONTH_YEAR} · Based on public benchmarks &amp; structured modelling
        </p>
        <Link href="/methodology" className="text-xs text-orange-500 hover:underline font-medium whitespace-nowrap ml-3">
          How we calculate →
        </Link>
      </div>
    </div>
  );
}
