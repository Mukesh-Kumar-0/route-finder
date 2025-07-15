
import React, { useState } from 'react';
import { Train, Search } from 'lucide-react';
import TrainSearchForm from '../components/TrainSearchForm';
import SearchResults from '../components/SearchResults';
import { SearchResult } from '../types/train';
import { searchTrains, getStationById } from '../utils/trainSearch';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult>({ directRoutes: [], multiTrainRoutes: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInfo, setSearchInfo] = useState<{ from: string; to: string } | null>(null);

  const handleSearch = async (fromStationId: string, toStationId: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    const fromStation = getStationById(fromStationId);
    const toStation = getStationById(toStationId);
    
    setSearchInfo({
      from: fromStation?.name || '',
      to: toStation?.name || ''
    });

    // Simulate API delay for better UX
    setTimeout(() => {
      const results = searchTrains(fromStationId, toStationId);
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Train className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TrainSearch</h1>
            </div>
            <div className="text-sm text-gray-600 hidden md:block">
              Find the perfect train for your journey
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Train Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search and compare train routes, timings, and prices. Find direct trains or multi-train journeys to reach your destination.
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <TrainSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Search Info */}
        {hasSearched && searchInfo && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border">
              <Search className="h-4 w-4 text-blue-600" />
              <span className="text-gray-700">
                Showing trains from <span className="font-semibold text-blue-600">{searchInfo.from}</span> to <span className="font-semibold text-blue-600">{searchInfo.to}</span>
              </span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && (
          <SearchResults results={searchResults} isLoading={isLoading} />
        )}

        {/* Features Section */}
        {!hasSearched && (
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">Find direct routes and multi-train connections for any destination across the network.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Train className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Pricing</h3>
              <p className="text-gray-600">Transparent pricing based on distance traveled at ₹1.25 per kilometer.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-purple-600 font-bold text-lg">⚡</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Comparison</h3>
              <p className="text-gray-600">Sort by price or departure time to find the best option for your schedule.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 TrainSearch. Built with modern web technologies for efficient train booking.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
