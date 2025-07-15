
export interface Station {
  id: string;
  name: string;
  code: string;
}

export interface TrainStop {
  stationId: string;
  stationName: string;
  distanceFromPrevious: number;
  cumulativeDistance: number;
  departureTime: string;
  arrivalTime?: string;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  stops: TrainStop[];
}

export interface DirectRoute {
  train: Train;
  fromStop: TrainStop;
  toStop: TrainStop;
  distance: number;
  price: number;
  duration: string;
}

export interface MultiTrainRoute {
  routes: DirectRoute[];
  totalDistance: number;
  totalPrice: number;
  totalDuration: string;
  transferStations: string[];
}

export interface SearchResult {
  directRoutes: DirectRoute[];
  multiTrainRoutes: MultiTrainRoute[];
}
