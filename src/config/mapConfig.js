export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export const MAP_STYLE_URL =
  import.meta.env.VITE_MAPBOX_STYLE_URL ||
  'https://api.maptiler.com/maps/streets-v2/style.json?key=' + MAPBOX_TOKEN;

export const DEFAULT_VIEWPORT = {
  longitude: 76.9558,
  latitude: 11.0168,
  zoom: 12,
  pitch: 30,
  bearing: 0,
};

export const BRAND = {
  ink: '#0E2E2B',       // Deep teal-black chrome
  marigold: '#F3A537',  // Primary accent / routes
  vermilion: '#C13F2E', // Live tracking / urgency accent
  sage: '#6B8F71',      // Hotel markers
  sky: '#3E7C8C',       // Attraction markers
  mist: '#FAF6EF',      // Light surface background
};

// Alias export to satisfy components importing BRAND_COLORS directly
export const BRAND_COLORS = BRAND;

export const CATEGORY_TO_TYPES = {
  all: ['attraction', 'hotel', 'food', 'cab'],
  attractions: ['attraction'],
  hotels: ['hotel'],
  food: ['food'],
  cabs: ['cab'],
};

// Add this missing export to fix the FilterBar error
export const CATEGORY_META = [
  { id: 'all', label: 'All', iconName: 'Compass' },
  { id: 'attractions', label: 'Spots', iconName: 'Camera' },
  { id: 'hotels', label: 'Stays', iconName: 'Hotel' },
  { id: 'food', label: 'Eats', iconName: 'Utensils' },
  { id: 'cabs', label: 'Cabs', iconName: 'Car' },
];

export const ROUTE_LINE_PAINT = {
  'line-color': BRAND.marigold,
  'line-width': 5,
  'line-opacity': 0.85,
};

export const ROUTE_LINE_CASING_PAINT = {
  'line-color': BRAND.ink,
  'line-width': 8,
  'line-opacity': 0.3,
};