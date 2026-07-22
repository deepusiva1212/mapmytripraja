/**
 * MyTripRaja — Map & Brand Configuration
 * -----------------------------------------------------------------------
 * Central place for brand tokens, Mapbox style URL, and camera defaults.
 * Keeping this separate from components means a designer can retint the
 * whole map experience without touching any rendering logic.
 */

/** @typedef {{lng: number, lat: number}} LngLat */

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

/**
 * Custom Mapbox Studio style. Swap this for your own style URL once you've
 * retinted the base map in Mapbox Studio (roads, water, POI density) to
 * match the brand palette below. `mapbox://styles/mapbox/light-v11` is a
 * safe fallback that still looks clean if you haven't published one yet.
 */
export const MAP_STYLE_URL =
  import.meta.env.VITE_MAPBOX_STYLE_URL || 'mapbox://styles/mapbox/light-v11';

/** Default camera — centered on Tiruchengode / Sankagiri, Tamil Nadu */
export const DEFAULT_VIEWPORT = {
  longitude: 77.8951,
  latitude: 11.3861,
  zoom: 12.5,
  pitch: 45,
  bearing: 0,
};

/**
 * Brand tokens. Named, not generic — pulled from a kumkum-and-marigold
 * travel palette instead of a default "clay + cream" AI look.
 */
export const BRAND = {
  ink: '#0E2E2B', // deep teal-black — chrome, sidebar, bottom sheet
  inkSoft: '#163F3A',
  marigold: '#F3A537', // primary accent — CTAs, active filter chip
  marigoldDeep: '#D68A1F',
  vermilion: '#C13F2E', // live/ETA/pulse accent — cab markers, urgency
  sage: '#6B8F71', // hotel & stay markers
  sky: '#3E7C8C', // attraction/landmark markers
  mist: '#FAF6EF', // light surfaces, cards
  slate: '#44524E', // body text on light surfaces
  line: 'rgba(14,46,43,0.10)',
};

/** Route line paint — a soft marigold gradient rendered as a Mapbox layer */
export const ROUTE_LINE_PAINT = {
  'line-color': BRAND.marigold,
  'line-width': 5,
  'line-opacity': 0.9,
};

export const ROUTE_LINE_CASING_PAINT = {
  'line-color': BRAND.ink,
  'line-width': 9,
  'line-opacity': 0.12,
};

export const CATEGORY_META = {
  all: { label: 'All', color: BRAND.ink },
  cabs: { label: 'Cabs', color: BRAND.vermilion },
  attractions: { label: 'Attractions', color: BRAND.sky },
  hotels: { label: 'Hotels', color: BRAND.sage },
  food: { label: 'Food', color: BRAND.marigoldDeep },
};
