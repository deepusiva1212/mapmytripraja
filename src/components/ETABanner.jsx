import { Clock, MapPinned, PhoneCall } from 'lucide-react';

/**
 * Signature element: a "boarding pass stub" — a perforated divider between
 * trip stats and the call-driver action, echoing a travel ticket rather
 * than a generic stat-card banner.
 *
 * @param {{ cab: import('../data/mockData').Cab }} props
 */
export default function ETABanner({ cab }) {
  if (!cab) return null;

  return (
    <div className="pointer-events-auto mx-auto flex w-full max-w-md overflow-hidden rounded-2xl border border-white/50 bg-[#0E2E2B]/95 text-white shadow-[0_-8px_30px_rgba(14,46,43,0.35)] backdrop-blur-md">
      <div className="flex flex-1 items-center gap-4 px-5 py-4">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wide text-white/50">ETA</span>
          <span className="flex items-center gap-1 font-mono text-lg font-semibold leading-none">
            <Clock size={15} className="text-[#F3A537]" />
            {cab.etaMinutes} min
          </span>
        </div>
        <div className="h-8 w-px bg-white/15" />
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wide text-white/50">Distance</span>
          <span className="flex items-center gap-1 font-mono text-lg font-semibold leading-none">
            <MapPinned size={15} className="text-[#F3A537]" />
            {cab.distanceKm} km
          </span>
        </div>
        <div className="ml-auto flex flex-col text-right">
          <span className="text-[11px] uppercase tracking-wide text-white/50">Driver</span>
          <span className="text-sm font-medium leading-tight">{cab.driverName}</span>
        </div>
      </div>

      {/* perforated divider */}
      <div className="relative flex w-0 items-center">
        <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-[#FAF6EF]" />
        <div className="h-full border-l-2 border-dashed border-white/25" />
        <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-[#FAF6EF]" />
      </div>

      <button
        aria-label="Call driver"
        className="flex w-16 flex-col items-center justify-center gap-1 bg-[#C13F2E] text-xs font-semibold transition hover:bg-[#a8362a]"
      >
        <PhoneCall size={16} />
        Call
      </button>
    </div>
  );
}
