import { Search, X } from 'lucide-react';
import { CATEGORY_META } from '../config/mapConfig';

export default function FilterBar({ query, onQueryChange, activeCategory, onCategoryChange, onSearch }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center gap-3 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="pointer-events-auto w-full max-w-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_8px_30px_rgba(14,46,43,0.12)] backdrop-blur-md">
          <Search size={18} className="shrink-0 text-[#44524E]/60" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              // Trigger search when the Enter key is pressed
              if (e.key === 'Enter' && onSearch) {
                onSearch(query);
              }
            }}
            placeholder="Search temples, stays, food near you…"
            className="w-full bg-transparent text-sm text-[#0E2E2B] placeholder:text-[#44524E]/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                onQueryChange('');
                if (onSearch) onSearch(''); // Optional: Reset map view on clear
              }}
              aria-label="Clear search"
              className="rounded-full p-1 text-[#44524E]/60 transition hover:bg-black/5"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="pointer-events-auto flex w-full max-w-xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* We map over an array of keys instead of using Object.entries to ensure order if needed, but your code works fine too! */}
        {Object.entries(CATEGORY_META || {}).map(([key, meta]) => {
          if (meta === 'all') return null; // Small safeguard
          // If meta is an object with an id (from our mapConfig update)
          const categoryId = meta.id || key;
          const active = categoryId === activeCategory;
          
          return (
            <button
              key={categoryId}
              onClick={() => onCategoryChange(categoryId)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-150 ${
                active
                  ? 'border-transparent text-white shadow-md'
                  : 'border-white/60 bg-white/75 text-[#0E2E2B] hover:bg-white/90'
              }`}
              style={active ? { backgroundColor: '#0E2E2B' } : undefined} // Using your ink color for active state
            >
              {meta.label || meta}
            </button>
          );
        })}
      </div>
    </div>
  );
}