
import React, { useState } from 'react';
import { Search, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { stations } from '../data/mockData';

interface TrainSearchFormProps {
  onSearch: (from: string, to: string) => void;
  isLoading?: boolean;
}

const TrainSearchForm: React.FC<TrainSearchFormProps> = ({ onSearch, isLoading = false }) => {
  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');

  const handleSearch = () => {
    if (fromStation && toStation && fromStation !== toStation) {
      onSearch(fromStation, toStation);
    }
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">From</label>
            <Select value={fromStation} onValueChange={setFromStation}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select departure station" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {stations.map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{station.name}</span>
                      <span className="text-xs text-gray-500">{station.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={handleSwapStations}
            disabled={!fromStation || !toStation}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">To</label>
            <Select value={toStation} onValueChange={setToStation}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select destination station" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {stations.map((station) => (
                  <SelectItem 
                    key={station.id} 
                    value={station.id}
                    disabled={station.id === fromStation}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{station.name}</span>
                      <span className="text-xs text-gray-500">{station.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSearch}
            disabled={!fromStation || !toStation || fromStation === toStation || isLoading}
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
            onKeyPress={handleKeyPress}
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? 'Searching...' : 'Search Trains'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainSearchForm;
