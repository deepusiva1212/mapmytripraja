import { useCallback, useMemo, useRef, useState } from 'react';
import Map, { Marker, Popup, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import {
  MAPBOX_TOKEN,
  MAP_STYLE_URL,
  DEFAULT_VIEWPORT,
  ROUTE_LINE_PAINT,
  ROUTE_LINE_CASING_PAINT,
  CATEGORY_TO_TYPES,
} from '../config/mapConfig';
import { SPOTS, CABS } from '../data/mockData';
import { useLiveTracking } from '../hooks/useLiveTracking';
import { MARKER_BY_TYPE, CabMarker } from './MarkerIcons';
import FilterBar from './FilterBar';
import InfoCard from './InfoCard';
import ETABanner from './ETABanner';
import MapControls from './MapControls';
import TripDrawer from './TripDrawer';

/**
 * Top-level map experience for MyTripRaja. Owns viewport, filter, and
 * selection state; delegates rendering of each concern to a focused child
 * component so this file stays a readable orchestrator rather than a
 * 500-line God component.
 */
export default function TripMapContainer() {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Cabs animate continuously along their mock routes; swap the hook's
  // internals for a WebSocket/Firestore subscription in production.
  const liveCabs = useLiveTracking(CABS, { speedMetersPerSecond: 6 });
  const trackedCab = liveCabs[0];

  const visibleSpots = useMemo(() => {
    const allowedTypes = CATEGORY_TO_TYPES[category];
    return SPOTS.filter((spot) => {
      const matchesCategory = category === 'all' || allowedTypes.includes(spot.type);
      const matchesQuery = spot.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const showCabs = category === 'all' || category === 'cabs';

  const routeGeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: liveCabs.map((cab) => ({
        type: 'Feature',
        properties: { id: cab.id },
        geometry: { type: 'LineString', coordinates: cab.route },
      })),
    }),
    [liveCabs]
  );

  const handleRecenter = useCallback(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setViewport((v) => ({
          ...v,
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          zoom: 14,
        }));
      },
      () => setViewport(DEFAULT_VIEWPORT) // permission denied → fall back to default city center
    );
  }, []);

  const handleZoom = useCallback((delta) => {
    setViewport((v) => ({ ...v, zoom: Math.min(20, Math.max(2, v.zoom + delta)) }));
  }, []);

  const handleBook = useCallback((spot) => {
    // Wire this up to your booking flow / router push.
    console.info('Book now:', spot.id);
  }, []);

  const handleDirections = useCallback((spot) => {
    setViewport((v) => ({ ...v, longitude: spot.coords[0], latitude: spot.coords[1], zoom: 15 }));
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAF6EF] p-6 text-center text-sm text-[#44524E]">
        Missing <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5">VITE_MAPBOX_TOKEN</code> —
        add it to your <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5">.env</code> file.
      </div>
    );
  }

  const handleLocationSearch = async (searchValue) => {
    if (!searchValue) return;
    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${searchValue}.json?key=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 13,
          duration: 2000, 
        });
      }
    } catch (error) {
      console.error("Geocoding search failed:", error);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden font-sans">
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE_URL}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" showCompass={false} style={{ display: 'none' }} />

        {/* Route polylines */}
        <Source id="routes" type="geojson" data={routeGeoJSON}>
          <Layer id="route-casing" type="line" paint={ROUTE_LINE_CASING_PAINT} />
          <Layer id="route-line" type="line" paint={ROUTE_LINE_PAINT} />
        </Source>

        {/* Static spot markers */}
        {visibleSpots.map((spot) => {
          const MarkerIcon = MARKER_BY_TYPE[spot.type];
          return (
            <Marker
              key={spot.id}
              longitude={spot.coords[0]}
              latitude={spot.coords[1]}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedSpot(spot);
                setDrawerOpen(true);
              }}
            >
              <button aria-label={spot.name} className="cursor-pointer">
                <MarkerIcon />
              </button>
            </Marker>
          );
        })}

        {/* Live cab markers */}
        {showCabs &&
          liveCabs.map((cab) => (
            <Marker key={cab.id} longitude={cab.coords[0]} latitude={cab.coords[1]} anchor="center">
              <CabMarker bearing={cab.bearing} />
            </Marker>
          ))}

        {/* Popup card for the selected spot */}
        {selectedSpot && (
          <Popup
            longitude={selectedSpot.coords[0]}
            latitude={selectedSpot.coords[1]}
            anchor="bottom"
            offset={44}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setSelectedSpot(null)}
            className="mytripraja-popup"
          >
            <InfoCard
              spot={selectedSpot}
              onClose={() => setSelectedSpot(null)}
              onBook={handleBook}
              onDirections={handleDirections}
            />
          </Popup>
        )}
      </Map>

      <FilterBar 
        query={searchQuery} 
        onQueryChange={setSearchQuery} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
        onSearch={handleLocationSearch} 
      />

      <MapControls
        onZoomIn={() => handleZoom(1)}
        onZoomOut={() => handleZoom(-1)}
        onRecenter={handleRecenter}
      />

      <TripDrawer open={drawerOpen} onToggle={() => setDrawerOpen((o) => !o)} spot={selectedSpot} cab={trackedCab} />

      {trackedCab && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 px-4 sm:bottom-6 sm:left-84 sm:px-6">
          <ETABanner cab={trackedCab} />
        </div>
      )}
    </div>
  );
}
