'use client';

import { Filter, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SearchAndFilter({ onFiltersChange, isLoading = false }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filters = {};
    if (search.trim()) filters.search = search.trim();
    if (status) filters.status = status;
    onFiltersChange(filters);
  }, [search, status, onFiltersChange]);

  const clearFilters = () => {
    setSearch('');
    setStatus('');
  };

  const hasActiveFilters = search.trim() || status;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-10 pr-4"
          disabled={isLoading}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="card p-4 space-y-3">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Status Filter
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
              disabled={isLoading}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
              {search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Search: "{search}"
                  <button
                    onClick={() => setSearch('')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {status && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Status: {status.replace('-', ' ')}
                  <button
                    onClick={() => setStatus('')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}