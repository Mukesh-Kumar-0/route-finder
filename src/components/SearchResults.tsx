
import React, { useState, useMemo } from 'react';
import { AlertCircle, Train as TrainIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SearchResult, DirectRoute, MultiTrainRoute } from '../types/train';
import TrainCard from './TrainCard';
import MultiTrainCard from './MultiTrainCard';
import SortControls, { SortOption } from './SortControls';

interface SearchResultsProps {
  results: SearchResult;
  isLoading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading = false }) => {
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');

  const sortedResults = useMemo(() => {
    const allRoutes: (DirectRoute | MultiTrainRoute)[] = [
      ...results.directRoutes,
      ...results.multiTrainRoutes
    ];

    return allRoutes.sort((a, b) => {
      const priceA = 'price' in a ? a.price : a.totalPrice;
      const priceB = 'price' in b ? b.price : b.totalPrice;
      
      const timeA = 'fromStop' in a ? a.fromStop.departureTime : a.routes[0].fromStop.departureTime;
      const timeB = 'fromStop' in b ? b.fromStop.departureTime : b.routes[0].fromStop.departureTime;

      switch (sortBy) {
        case 'price_asc':
          return priceA - priceB;
        case 'price_desc':
          return priceB - priceA;
        case 'time_asc':
          return timeA.localeCompare(timeB);
        case 'time_desc':
          return timeB.localeCompare(timeA);
        default:
          return 0;
      }
    });
  }, [results, sortBy]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Searching for trains...</span>
        </div>
      </div>
    );
  }

  const totalResults = results.directRoutes.length + results.multiTrainRoutes.length;

  if (totalResults === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                No trains available for selected route
              </h3>
              <p className="text-red-600">
                Please try selecting different stations or check back later for updated schedules.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <SortControls 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
        resultsCount={totalResults}
      />
      
      <div className="space-y-4">
        {sortedResults.map((route, index) => (
          <div key={index}>
            {'price' in route ? (
              <TrainCard route={route as DirectRoute} />
            ) : (
              <MultiTrainCard route={route as MultiTrainRoute} />
            )}
          </div>
        ))}
      </div>
      
      {results.multiTrainRoutes.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            <TrainIcon className="h-4 w-4" />
            Multi-train journeys include transfer time and may require platform changes
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
