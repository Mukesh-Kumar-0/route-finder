
import { stations, trains } from '../data/mockData';
import { DirectRoute, MultiTrainRoute, SearchResult, Train, TrainStop } from '../types/train';

const PRICE_PER_KM = 1.25;

function calculateTimeDifference(startTime: string, endTime: string): string {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  let startMinutes = startHour * 60 + startMin;
  let endMinutes = endHour * 60 + endMin;
  
  // Handle next day scenarios
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }
  
  const diffMinutes = endMinutes - startMinutes;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}h ${minutes}m`;
}

function findDirectRoutes(fromStationId: string, toStationId: string): DirectRoute[] {
  const routes: DirectRoute[] = [];
  
  for (const train of trains) {
    const fromStopIndex = train.stops.findIndex(stop => stop.stationId === fromStationId);
    const toStopIndex = train.stops.findIndex(stop => stop.stationId === toStationId);
    
    // Check if both stations exist and from comes before to
    if (fromStopIndex !== -1 && toStopIndex !== -1 && fromStopIndex < toStopIndex) {
      const fromStop = train.stops[fromStopIndex];
      const toStop = train.stops[toStopIndex];
      const distance = toStop.cumulativeDistance - fromStop.cumulativeDistance;
      const price = Math.round(distance * PRICE_PER_KM * 100) / 100;
      const duration = calculateTimeDifference(fromStop.departureTime, toStop.arrivalTime || toStop.departureTime);
      
      routes.push({
        train,
        fromStop,
        toStop,
        distance,
        price,
        duration
      });
    }
  }
  
  return routes;
}

function findMultiTrainRoutes(fromStationId: string, toStationId: string): MultiTrainRoute[] {
  const multiRoutes: MultiTrainRoute[] = [];
  const maxConnections = 2; // Limit to 2 trains for simplicity
  
  // Find all possible intermediate stations
  const intermediateStations = new Set<string>();
  
  for (const train of trains) {
    const fromIndex = train.stops.findIndex(stop => stop.stationId === fromStationId);
    const toIndex = train.stops.findIndex(stop => stop.stationId === toStationId);
    
    if (fromIndex !== -1) {
      // Add all stations that come after the from station
      for (let i = fromIndex + 1; i < train.stops.length; i++) {
        intermediateStations.add(train.stops[i].stationId);
      }
    }
  }
  
  // Try to find connections through intermediate stations
  for (const intermediateId of intermediateStations) {
    if (intermediateId === toStationId) continue;
    
    const firstLeg = findDirectRoutes(fromStationId, intermediateId);
    const secondLeg = findDirectRoutes(intermediateId, toStationId);
    
    for (const leg1 of firstLeg) {
      for (const leg2 of secondLeg) {
        // Check if there's enough time for transfer (at least 30 minutes)
        const arrivalTime = leg1.toStop.arrivalTime || leg1.toStop.departureTime;
        const departureTime = leg2.fromStop.departureTime;
        
        const [arrHour, arrMin] = arrivalTime.split(':').map(Number);
        const [depHour, depMin] = departureTime.split(':').map(Number);
        
        let arrMinutes = arrHour * 60 + arrMin;
        let depMinutes = depHour * 60 + depMin;
        
        if (depMinutes < arrMinutes) {
          depMinutes += 24 * 60; // Next day
        }
        
        const transferTime = depMinutes - arrMinutes;
        
        if (transferTime >= 30) { // At least 30 minutes for transfer
          const totalDistance = leg1.distance + leg2.distance;
          const totalPrice = Math.round((leg1.price + leg2.price) * 100) / 100;
          const totalDuration = calculateTimeDifference(
            leg1.fromStop.departureTime,
            leg2.toStop.arrivalTime || leg2.toStop.departureTime
          );
          
          multiRoutes.push({
            routes: [leg1, leg2],
            totalDistance,
            totalPrice,
            totalDuration,
            transferStations: [intermediateId]
          });
        }
      }
    }
  }
  
  return multiRoutes;
}

export function searchTrains(fromStationId: string, toStationId: string): SearchResult {
  if (!fromStationId || !toStationId || fromStationId === toStationId) {
    return {
      directRoutes: [],
      multiTrainRoutes: []
    };
  }
  
  const directRoutes = findDirectRoutes(fromStationId, toStationId);
  const multiTrainRoutes = findMultiTrainRoutes(fromStationId, toStationId);
  
  return {
    directRoutes: directRoutes.sort((a, b) => a.price - b.price),
    multiTrainRoutes: multiTrainRoutes.sort((a, b) => a.totalPrice - b.totalPrice)
  };
}

export function getStationById(id: string) {
  return stations.find(station => station.id === id);
}

export function getStationByName(name: string) {
  return stations.find(station => station.name === name);
}
