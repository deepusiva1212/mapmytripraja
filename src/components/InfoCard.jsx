import { Star, X, Navigation2, CalendarCheck } from 'lucide-react';

/**
 * @param {{
 *   spot: import('../data/mockData').Spot,
 *   onClose: () => void,
 *   onBook: (spot: import('../data/mockData').Spot) => void,
 *   onDirections: (spot: import('../data/mockData').Spot) => void,
 * }} props
 */
export default function InfoCard({ spot, onClose, onBook, onDirections }) {
  if (!spot) return null;

  return (
    <div className="pointer-events-auto w-72 overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-[0_20px_50px_rgba(14,46,43,0.25)] backdrop-blur-xl">
      <div className="relative h-32 w-full">
        <img src={spot.photo} alt={spot.name} className="h-full w-full object-cover" />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          <X size={14} />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-base font-semibold leading-snug text-[#0E2E2B]">
            {spot.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#F3A537]/15 px-2 py-0.5 text-xs font-semibold text-[#D68A1F]">
            <Star size={12} className="fill-[#D68A1F] text-[#D68A1F]" />
            {spot.rating}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-[#44524E]/85">{spot.description}</p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-[#0E2E2B]">{spot.priceLabel}</span>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onDirections(spot)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#0E2E2B]/15 bg-white/70 px-3 py-2 text-xs font-semibold text-[#0E2E2B] transition hover:bg-white"
          >
            <Navigation2 size={14} />
            Directions
          </button>
          <button
            onClick={() => onBook(spot)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#C13F2E] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a8362a]"
          >
            <CalendarCheck size={14} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
