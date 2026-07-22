import { ChevronDown, Star, MapPin } from 'lucide-react';

/**
 * On mobile this renders as a draggable-feeling bottom sheet (CSS-only
 * expand/collapse, no drag lib needed for the basic case). On >=sm screens
 * it docks as a left sidebar instead, matching how Uber/Swiggy reflow trip
 * details from sheet to sidebar at wider breakpoints.
 *
 * @param {{
 *   open: boolean,
 *   onToggle: () => void,
 *   spot: import('../data/mockData').Spot | null,
 *   cab: import('../data/mockData').Cab | null,
 * }} props
 */
export default function TripDrawer({ open, onToggle, spot, cab }) {
  const hasContent = Boolean(spot || cab);

  return (
    <>
      {/* Mobile bottom sheet */}
      <div
        className={`pointer-events-auto fixed inset-x-0 bottom-0 z-30 rounded-t-3xl border-t border-white/60 bg-[#FAF6EF] shadow-[0_-10px_40px_rgba(14,46,43,0.2)] transition-transform duration-300 ease-out sm:hidden ${
          open ? 'translate-y-0' : 'translate-y-[calc(100%-3.25rem)]'
        }`}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wide text-[#44524E]"
        >
          <span className="h-1 w-10 rounded-full bg-[#44524E]/30" />
        </button>
        <div className="max-h-[55vh] overflow-y-auto px-5 pb-6">
          <DrawerBody spot={spot} cab={cab} hasContent={hasContent} />
        </div>
        <ChevronDown
          size={16}
          className={`absolute right-4 top-3.5 text-[#44524E]/50 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Desktop sidebar */}
      <div className="pointer-events-auto absolute bottom-0 left-0 top-0 z-20 hidden w-80 border-r border-black/5 bg-[#FAF6EF]/95 p-5 shadow-xl backdrop-blur-md sm:block">
        <h2 className="mb-4 font-serif text-lg font-semibold text-[#0E2E2B]">Trip details</h2>
        <DrawerBody spot={spot} cab={cab} hasContent={hasContent} />
      </div>
    </>
  );
}

function DrawerBody({ spot, cab, hasContent }) {
  if (!hasContent) {
    return (
      <p className="text-sm text-[#44524E]/70">
        Tap a pin on the map to see attraction details, or track your assigned cab here.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {cab && (
        <div className="rounded-2xl border border-black/5 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#44524E]/60">
            Your ride
          </p>
          <p className="mt-1 font-serif text-base font-semibold text-[#0E2E2B]">
            {cab.vehicleLabel}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs text-[#44524E]/80">
            <Star size={12} className="fill-[#D68A1F] text-[#D68A1F]" />
            {cab.rating} · {cab.driverName}
          </div>
        </div>
      )}
      {spot && (
        <div className="rounded-2xl border border-black/5 bg-white/70 p-4">
          <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#44524E]/60">
            <MapPin size={12} />
            Selected spot
          </div>
          <p className="mt-1 font-serif text-base font-semibold text-[#0E2E2B]">{spot.name}</p>
          <p className="mt-1 text-xs text-[#44524E]/80">{spot.description}</p>
        </div>
      )}
    </div>
  );
}
