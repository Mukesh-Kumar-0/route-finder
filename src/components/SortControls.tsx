
import React from 'react';
import { ArrowUpDown, Clock, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type SortOption = 'price_asc' | 'price_desc' | 'time_asc' | 'time_desc';

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, onSortChange, resultsCount }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-gray-600">
        {resultsCount} {resultsCount === 1 ? 'train' : 'trains'} found
      </div>
      
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-gray-500" />
        <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Price: Low to High
              </div>
            </SelectItem>
            <SelectItem value="price_desc">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Price: High to Low
              </div>
            </SelectItem>
            <SelectItem value="time_asc">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Departure: Early to Late
              </div>
            </SelectItem>
            <SelectItem value="time_desc">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Departure: Late to Early
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortControls;
