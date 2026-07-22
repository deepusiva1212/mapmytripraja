import { Plus, Minus, LocateFixed } from 'lucide-react';

/**
 * @param {{ onZoomIn: () => void, onZoomOut: () => void, onRecenter: () => void }} props
 */
export default function MapControls({ onZoomIn, onZoomOut, onRecenter }) {
  return (
    <div className="pointer-events-auto absolute bottom-28 right-4 z-20 flex flex-col gap-2 sm:bottom-6">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-lg backdrop-blur-md">
        <button
          onClick={onZoomIn}
          aria-label="Zoom in"
          className="p-3 text-[#0E2E2B] transition hover:bg-black/5"
        >
          <Plus size={18} />
        </button>
        <div className="h-px w-full bg-black/10" />
        <button
          onClick={onZoomOut}
          aria-label="Zoom out"
          className="p-3 text-[#0E2E2B] transition hover:bg-black/5"
        >
          <Minus size={18} />
        </button>
      </div>
      <button
        onClick={onRecenter}
        aria-label="Recenter on my location"
        className="rounded-2xl border border-white/60 bg-white/85 p-3 text-[#0E2E2B] shadow-lg backdrop-blur-md transition hover:bg-black/5"
      >
        <LocateFixed size={18} />
      </button>
    </div>
  );
}
