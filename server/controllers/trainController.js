import Train from '../models/Train.js';

export const searchTrains = async (req, res) => {
  const { from, to } = req.query;

  const trains = await Train.find({
    'stops.station': { $all: [from, to] }
  });

  const results = [];

  for (const train of trains) {
    const fromIndex = train.stops.findIndex(s => s.station === from);
    const toIndex = train.stops.findIndex(s => s.station === to);

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      const subStops = train.stops.slice(fromIndex, toIndex + 1);
      const distance = subStops.reduce((sum, s, i) => i === 0 ? 0 : sum + s.distance, 0);
      const price = distance * 1.25;

      results.push({
        name: train.name,
        departure: train.stops[fromIndex].time,
        arrival: train.stops[toIndex].time,
        distance,
        price
      });
    }
  }

  res.json(results);
};
