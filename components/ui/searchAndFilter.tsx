// components/SearchAndFilter.tsx
"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const SearchAndFilter: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
}) => {
  const filters = ["All", "Fire", "Water", "Grass", "Electric", "Psychic"];

  return (
    <div className="flex justify-center h-50 items-center">
      <div className="w-5xl flex flex-col md:flex-row items-center justify-between gap-4 bgColor p-4 rounded-xl shadow-lg mx-4">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2 flex items-center gap-10">
          <div className="flex items-center bg-black rounded-lg w-full h-14 focus-within:ring-2 focus-within:ring-yellow-500">
            <div className="w-12 flex justify-center items-center text-gray-400">
              <Search />
            </div>
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full md:w-1/4">
          <div className="flex items-center bg-black text-white rounded-lg h-14 focus-within:ring-2 focus-within:ring-yellow-500">
            <div className="w-12 flex justify-center items-center text-white pointer-events-none">
              <Filter />
            </div>
            <select
              title="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 h-full bg-black text-white focus:outline-none pl-8 appearance-none"
            >
              {filters.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
