
import React from 'react';
import { Clock, IndianRupee, Route, Train as TrainIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DirectRoute } from '../types/train';

interface TrainCardProps {
  route: DirectRoute;
}

const TrainCard: React.FC<TrainCardProps> = ({ route }) => {
  const { train, fromStop, toStop, distance, price, duration } = route;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrainIcon className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-bold">{train.name}</span>
            <Badge variant="secondary" className="text-xs">
              {train.number}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 flex items-center">
              <IndianRupee className="h-5 w-5" />
              {price}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {fromStop.departureTime}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {fromStop.stationName}
            </div>
            <div className="text-xs text-gray-500">Departure</div>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="flex items-center justify-center relative">
              <div className="w-full h-px bg-gray-300"></div>
              <div className="absolute bg-white px-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {duration}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {toStop.arrivalTime || toStop.departureTime}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {toStop.stationName}
            </div>
            <div className="text-xs text-gray-500">Arrival</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Route className="h-4 w-4" />
              <span>{distance} km</span>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Direct Train
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
