import React from 'react';
import { SORT_OPTIONS } from '../interfaces';

const SearchAndFilter = ({ searchQuery, onSearch, sortBy, onSort, resultCount }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09A94]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Kitap veya yazar ara..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="input-field pl-9"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09A94] hover:text-[#1A1611] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSort(e.target.value)}
          className="input-field w-auto pr-8 cursor-pointer appearance-none bg-[#F7F0E3]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6560' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <span className="text-xs text-[#A09A94] font-mono whitespace-nowrap shrink-0">
          {resultCount} sonuç
        </span>
      </div>
    </div>
  );
};

export default SearchAndFilter;
