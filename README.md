# MyTripRaja — Interactive Trip Map

## 1. Why Mapbox GL JS (via `react-map-gl`), not Google Maps

| | Mapbox GL JS (`react-map-gl`) | Google Maps JS API |
|---|---|---|
| Custom vector styling | Full control in Mapbox Studio — retint roads/water/POIs to match brand | Limited "Cloud-based styling", clunkier JSON style editor |
| Custom marker performance | Marker/Popup are just React portals over a WebGL canvas — hundreds of animated markers stay smooth | DOM-overlay markers get janky past ~100 animated markers |
| Route rendering | Native `Source`/`Layer` GeoJSON line rendering, GPU-accelerated, easy gradient/casing effects | `Polyline` overlay is DOM/canvas hybrid, fewer styling hooks |
| Pricing at tourism-app scale | Generous free tier, pay-as-you-go per load | Per-load billing, historically pricier for maps-heavy apps |
| Ecosystem | `react-map-gl` is a thin, well-typed wrapper; pairs cleanly with Turf.js for geo-math | `@vis.gl/react-google-maps` is solid but younger, smaller plugin ecosystem |

**Recommendation:** Mapbox GL JS is the better fit for an Uber/Swiggy-style experience — the custom styling and smooth animated-marker requirements are exactly where it outperforms Google Maps. If your team already has heavy Google Cloud commitments or you need Google's search-quality Places autocomplete specifically, `@vis.gl/react-google-maps` is a reasonable fallback with a similar component shape (`Map`, `AdvancedMarker`, `InfoWindow` map roughly to `Map`, `Marker`, `Popup` here).

## 2. Architecture

```
src/
  config/mapConfig.js       # brand tokens, style URL, route paint, category metadata
  data/mockData.js          # Spot & Cab typedefs + mock records (swap for your API)
  hooks/useLiveTracking.js  # animates cabs along their route polyline (swap tick for real GPS pings)
  components/
    TripMapContainer.jsx    # orchestrator: owns viewport/filter/selection state
    MarkerIcons.jsx         # custom SVG pins per category + pulsing CabMarker
    FilterBar.jsx           # floating search input + category filter chips
    InfoCard.jsx            # glassmorphic popup card (photo/rating/price/CTAs)
    ETABanner.jsx           # bottom "boarding pass stub" ETA/distance banner
    MapControls.jsx         # zoom + recenter buttons
    TripDrawer.jsx          # mobile bottom sheet ⇄ desktop sidebar
  styles/index.css          # font imports, Tailwind directives, Mapbox popup overrides
```

Each visual concern is its own component so `TripMapContainer.jsx` stays a readable orchestrator — it wires state together and renders children, it doesn't itself define markup for cards, chips, or banners.

### Design tokens (see `mapConfig.js`)
- **ink** `#0E2E2B` — deep teal-black chrome (sidebar, banner)
- **marigold** `#F3A537` — primary accent, active filter chip, routes
- **vermilion** `#C13F2E` — live/urgency accent, cab marker, CTA button
- **sage** `#6B8F71` — hotel markers · **sky** `#3E7C8C` — attraction markers
- **mist** `#FAF6EF` — light surfaces
- Type: **Fraunces** (display/titles), **Inter** (UI/body), **JetBrains Mono** (ETA/distance figures)
- Signature element: the ETA banner is styled as a boarding-pass stub with a perforated divider — a travel-ticket motif instead of a generic stat card.

## 3. Setup

```bash
npm install react-map-gl mapbox-gl lucide-react
```

Tailwind (if not already set up in your Vite project):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Then import `src/styles/index.css` from your `main.jsx`:
```js
import './styles/index.css';
```

### Environment variables
1. Copy `.env.example` to `.env`.
2. Sign up at [mapbox.com](https://www.mapbox.com/), grab your **public** token (`pk.…`) from the account dashboard.
3. Set `VITE_MAPBOX_TOKEN=pk.…` in `.env`. Vite only exposes env vars prefixed `VITE_` to client code — this is expected and safe for a *public* Mapbox token; lock it down via **URL restrictions** in the Mapbox dashboard (not by hiding the token, which isn't possible for a browser map anyway).
4. `.env` is already git-ignored by Vite's default `.gitignore` — double check it's not committed.
5. Optional: build a custom style in Mapbox Studio, then set `VITE_MAPBOX_STYLE_URL` to its `mapbox://styles/...` URL.

### Run
```bash
npm run dev
```

## 4. Swapping mock data for real data
- Replace `SPOTS` / `CABS` in `mockData.js` with a fetch from your backend (Firestore, REST, etc.) — the shapes are documented via JSDoc typedefs at the top of that file, so any data source that matches them drops in without touching components.
- Replace the animation tick in `useLiveTracking.js` with real GPS pings (WebSocket message or `onSnapshot` listener) that call the same `setLiveCabs`-shaped update — the rest of the app doesn't need to change.
- `handleBook` / `handleDirections` in `TripMapContainer.jsx` are stubbed with `console.info` — wire these to your booking flow and turn-by-turn directions provider (Mapbox Directions API pairs naturally with the existing `Source`/`Layer` route rendering).
