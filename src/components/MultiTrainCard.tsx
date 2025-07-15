
import React from 'react';
import { Clock, IndianRupee, Route, ArrowRight, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MultiTrainRoute } from '../types/train';
import { getStationById } from '../utils/trainSearch';

interface MultiTrainCardProps {
  route: MultiTrainRoute;
}

const MultiTrainCard: React.FC<MultiTrainCardProps> = ({ route }) => {
  const { routes, totalDistance, totalPrice, totalDuration, transferStations } = route;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-orange-600" />
            <span className="text-lg font-bold">Multi-Train Journey</span>
            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
              {routes.length} Trains
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 flex items-center">
              <IndianRupee className="h-5 w-5" />
              {totalPrice}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {routes.map((leg, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-blue-600">
                  {leg.fromStop.departureTime}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {leg.fromStop.stationName}
                </div>
              </div>
              
              <div className="flex-1 mx-4 text-center">
                <div className="text-sm font-bold text-gray-700">
                  {leg.train.name}
                </div>
                <div className="text-xs text-gray-500">
                  {leg.train.number}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3" />
                  {leg.duration}
                </div>
              </div>
              
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-red-600">
                  {leg.toStop.arrivalTime || leg.toStop.departureTime}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {leg.toStop.stationName}
                </div>
              </div>
            </div>
            
            {index < routes.length - 1 && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  <ArrowRight className="h-3 w-3" />
                  <span>Change at {getStationById(transferStations[index])?.name}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Route className="h-4 w-4" />
              <span>{totalDistance} km</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{totalDuration}</span>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Multi-Train
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiTrainCard;
