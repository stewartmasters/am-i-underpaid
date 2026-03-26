"use client";

import { useState } from "react";
import { ROLES, LOCATIONS, calculateSalary, getConfidenceLevel, type SalaryResult, type ConfidenceLevel } from "@/lib/salary-data";
import SalaryResultComponent from "./SalaryResult";

interface Props {
  defaultRole?: string;
  defaultLocation?: string;
}

export default function SalaryTool({ defaultRole = "", defaultLocation = "" }: Props) {
  const [role, setRole] = useState(defaultRole);
  const [location, setLocation] = useState(defaultLocation);
  const [years, setYears] = useState(5);
  const [currentSalary, setCurrentSalary] = useState("");
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [meta, setMeta] = useState<{ roleLabel?: string; locationLabel?: string; confidence?: ConfidenceLevel }>({});
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!role) return setError("Please select a job title.");
    if (!location) return setError("Please select a location.");
    const salary = parseInt(currentSalary.replace(/[^0-9]/g, ""), 10);
    if (!salary || salary < 10000 || salary > 2000000) return setError("Please enter a valid annual salary.");
    const res = calculateSalary(role, location, years, salary);
    const rl = ROLES.find(r => r.slug === role)?.label;
    const ll = LOCATIONS.find(l => l.slug === location)?.label;
    setMeta({ roleLabel: rl, locationLabel: ll, confidence: getConfidenceLevel(role, location) });
    setResult(res);
  };

  const handleReset = () => {
    setResult(null);
    setCurrentSalary("");
    setError("");
    setMeta({});
  };

  if (result) {
    return (
      <SalaryResultComponent
        result={result}
        yearsOfExp={years}
        onReset={handleReset}
        roleLabel={meta.roleLabel}
        locationLabel={meta.locationLabel}
        confidenceLevel={meta.confidence}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">Job title</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer">
          <option value="">Select your role...</option>
          {ROLES.map((r) => <option key={r.slug} value={r.slug}>{r.label}</option>)}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer">
          <option value="">Select your location...</option>
          {LOCATIONS.map((l) => <option key={l.slug} value={l.slug}>{l.label}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-700">Years of experience</label>
          <span className="text-sm font-bold text-orange-500">{years === 0 ? "< 1 year" : years === 15 ? "15+ years" : `${years} years`}</span>
        </div>
        <input type="range" min={0} max={15} step={1} value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full accent-orange-500 cursor-pointer" />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0 yrs</span><span>5 yrs</span><span>10 yrs</span><span>15+ yrs</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">Current salary (annual, gross)</label>
        <input type="text" inputMode="numeric" placeholder="e.g. 65000" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
        <p className="text-xs text-gray-400">Gross annual base salary, before bonus or equity</p>
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-base shadow-sm shadow-orange-200">
        Am I underpaid? &#8594;
      </button>

      <p className="text-xs text-gray-400 text-center">No signup required. Results are instant and private.</p>
    </form>
  );
}
