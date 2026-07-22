import { Car, Landmark, Hotel, UtensilsCrossed, MapPin } from 'lucide-react';
import { BRAND } from '../config/mapConfig';

/**
 * Pin shape shared by every static marker — a teardrop with a flattened
 * shoulder, closer to a temple bell silhouette than the default map-pin
 * teardrop, so MyTripRaja markers read as their own shape at a glance.
 * @param {{ color: string, children: React.ReactNode, size?: number }} props
 */
function PinShape({ color, children, size = 40 }) {
  return (
    <div
      className="relative flex items-center justify-center drop-shadow-lg transition-transform duration-150 ease-out hover:-translate-y-1 hover:scale-105"
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 40 46"
        width={size}
        height={size * 1.15}
        className="absolute inset-0"
      >
        <path
          d="M20 1C9.5 1 1 9.2 1 19.4c0 13.6 15.8 23.4 18 24.9.6.4 1.4.4 2 0 2.2-1.5 18-11.3 18-24.9C39 9.2 30.5 1 20 1Z"
          fill={color}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
      </svg>
      <div className="relative z-10 mb-3 text-white">{children}</div>
    </div>
  );
}

export function AttractionMarker(props) {
  return (
    <PinShape color={BRAND.sky} {...props}>
      <Landmark size={16} strokeWidth={2.25} />
    </PinShape>
  );
}

export function HotelMarker(props) {
  return (
    <PinShape color={BRAND.sage} {...props}>
      <Hotel size={16} strokeWidth={2.25} />
    </PinShape>
  );
}

export function FoodMarker(props) {
  return (
    <PinShape color={BRAND.marigoldDeep} {...props}>
      <UtensilsCrossed size={16} strokeWidth={2.25} />
    </PinShape>
  );
}

export function PickupMarker(props) {
  return (
    <PinShape color={BRAND.ink} {...props}>
      <MapPin size={16} strokeWidth={2.25} />
    </PinShape>
  );
}

/** Live cab marker — pulsing ring + rotated car glyph following `bearing` */
export function CabMarker({ bearing = 0, size = 38 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ backgroundColor: BRAND.vermilion, opacity: 0.35 }}
      />
      <div
        className="relative z-10 flex items-center justify-center rounded-full border-2 border-white shadow-lg"
        style={{
          width: size * 0.78,
          height: size * 0.78,
          backgroundColor: BRAND.vermilion,
          transform: `rotate(${bearing}deg)`,
        }}
      >
        <Car size={16} className="text-white" strokeWidth={2.5} style={{ transform: `rotate(${-bearing}deg)` }} />
      </div>
    </div>
  );
}

export const MARKER_BY_TYPE = {
  attraction: AttractionMarker,
  hotel: HotelMarker,
  food: FoodMarker,
  pickup: PickupMarker,
  dropoff: PickupMarker,
};
