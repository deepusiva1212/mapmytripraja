import { useEffect, useRef, useState } from 'react';

/**
 * Linear interpolation between two [lng, lat] points.
 * @param {[number, number]} a
 * @param {[number, number]} b
 * @param {number} t 0..1
 * @returns {[number, number]}
 */
function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

/** Haversine distance in meters — used to keep speed roughly constant across segments of different length */
function segmentDistance([lng1, lat1], [lng2, lat2]) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/**
 * Animates a set of cabs along their route polylines, looping continuously.
 * In production, swap the animation tick for real GPS pings (e.g. via a
 * WebSocket or Firestore onSnapshot) and feed coordinates straight through —
 * the returned shape stays the same either way.
 *
 * @param {import('../data/mockData').Cab[]} cabs
 * @param {{ speedMetersPerSecond?: number }} [options]
 * @returns {import('../data/mockData').Cab[]} cabs with live-updated `coords` and `bearing`
 */
export function useLiveTracking(cabs, { speedMetersPerSecond = 8 } = {}) {
  const [liveCabs, setLiveCabs] = useState(
    cabs.map((cab) => ({ ...cab, bearing: 0, progress: 0 }))
  );
  const frameRef = useRef();
  const lastTsRef = useRef(performance.now());

  useEffect(() => {
    function tick(ts) {
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      setLiveCabs((prev) =>
        prev.map((cab) => {
          const route = cab.route;
          if (!route || route.length < 2) return cab;

          const totalDist = route.reduce(
            (sum, pt, i) => (i === 0 ? 0 : sum + segmentDistance(route[i - 1], pt)),
            0
          );
          const distanceThisFrame = speedMetersPerSecond * dt;
          const traveled = ((cab._traveled || 0) + distanceThisFrame) % totalDist;

          let acc = 0;
          let coords = route[0];
          let bearing = cab.bearing;
          for (let i = 1; i < route.length; i++) {
            const segDist = segmentDistance(route[i - 1], route[i]);
            if (traveled <= acc + segDist) {
              const t = segDist === 0 ? 0 : (traveled - acc) / segDist;
              coords = lerp(route[i - 1], route[i], t);
              const [x1, y1] = route[i - 1];
              const [x2, y2] = route[i];
              bearing = (Math.atan2(x2 - x1, y2 - y1) * 180) / Math.PI;
              break;
            }
            acc += segDist;
          }

          return { ...cab, coords, bearing, _traveled: traveled };
        })
      );

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speedMetersPerSecond]);

  return liveCabs;
}
