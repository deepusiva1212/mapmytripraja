/**
 * Mock data — replace with your real API/Firestore queries.
 * Shapes are documented via JSDoc typedefs so the rest of the app
 * has clear contracts even without TypeScript.
 */

/**
 * @typedef {Object} Spot
 * @property {string} id
 * @property {'attraction'|'hotel'|'food'|'pickup'|'dropoff'} type
 * @property {string} name
 * @property {string} photo
 * @property {number} rating
 * @property {string} priceLabel
 * @property {[number, number]} coords - [lng, lat]
 * @property {string} description
 */

/**
 * @typedef {Object} Cab
 * @property {string} id
 * @property {string} driverName
 * @property {string} vehicleLabel
 * @property {number} rating
 * @property {[number, number]} coords - current [lng, lat], mutated by the tracking hook
 * @property {[number, number][]} route - full polyline the cab is following, [lng, lat][]
 * @property {number} etaMinutes
 * @property {number} distanceKm
 */

export const SPOTS /** @type {Spot[]} */ = [
  {
    id: 'spot-arulmigu-kailasanathar',
    type: 'attraction',
    name: 'Arulmigu Kailasanathar Temple',
    photo:
      'https://images.unsplash.com/photo-1602214905625-9a1b3b5f0f6d?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    priceLabel: 'Free entry',
    coords: [77.8951, 11.3838],
    description:
      'Hilltop shrine on the Sankagiri ridge with panoramic views of the surrounding paddy fields.',
  },
  {
    id: 'spot-sankagiri-fort',
    type: 'attraction',
    name: 'Sankagiri Fort',
    photo:
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    priceLabel: '₹20 entry',
    coords: [77.8749, 11.4762],
    description: 'A 16th-century hill fort with three concentric walls and a short trek to the top.',
  },
  {
    id: 'spot-heritage-stay',
    type: 'hotel',
    name: 'Raja Heritage Residency',
    photo:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    priceLabel: '₹3,200 / night',
    coords: [77.9021, 11.3901],
    description: 'Boutique stay with a courtyard restaurant, 6 minutes from the bus stand.',
  },
  {
    id: 'spot-lake-view-inn',
    type: 'hotel',
    name: 'Lakeview Inn Tiruchengode',
    photo:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    rating: 4.2,
    priceLabel: '₹1,800 / night',
    coords: [77.8887, 11.3792],
    description: 'Budget-friendly rooms overlooking the temple tank, walking distance to the hill.',
  },
  {
    id: 'spot-thattu-kadai',
    type: 'food',
    name: 'Amma Thattu Kadai',
    photo:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    priceLabel: '₹80 avg / person',
    coords: [77.8965, 11.3872],
    description: 'Roadside stall famous for parotta and kothu, open till midnight.',
  },
  {
    id: 'spot-pickup-bus-stand',
    type: 'pickup',
    name: 'Tiruchengode Bus Stand — Pickup Point',
    photo:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    rating: 4.0,
    priceLabel: 'Zone A',
    coords: [77.8940, 11.3799],
    description: 'Main pickup zone for tour cabs — look for the MyTripRaja signage near gate 2.',
  },
];

export const CABS /** @type {Cab[]} */ = [
  {
    id: 'cab-001',
    driverName: 'Murugan S.',
    vehicleLabel: 'Swift Dzire · TN 33 AZ 4521',
    rating: 4.9,
    coords: [77.8940, 11.3799],
    route: [
      [77.8940, 11.3799],
      [77.8951, 11.3812],
      [77.8958, 11.3826],
      [77.8951, 11.3838],
    ],
    etaMinutes: 6,
    distanceKm: 2.1,
  },
  {
    id: 'cab-002',
    driverName: 'Kavitha R.',
    vehicleLabel: 'Ertiga · TN 28 BQ 1187',
    rating: 4.7,
    coords: [77.9021, 11.3901],
    route: [
      [77.9021, 11.3901],
      [77.8995, 11.3888],
      [77.8965, 11.3872],
    ],
    etaMinutes: 4,
    distanceKm: 1.3,
  },
];

/** Convenience lookup used by the category filter bar */
export const CATEGORY_TO_TYPES = {
  all: ['attraction', 'hotel', 'food', 'pickup', 'dropoff'],
  cabs: [], // cabs render from CABS, not SPOTS
  attractions: ['attraction'],
  hotels: ['hotel'],
  food: ['food'],
};
