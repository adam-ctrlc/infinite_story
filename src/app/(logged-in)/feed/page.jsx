"use client";

import { useState, useMemo } from "react";
import FeedList from "@/components/feed/FeedList";
import Sidebar from "@/components/feed/Sidebar";
import FeedFilters from "@/components/feed/FeedFilters";
import Pagination from "@/components/feed/Pagination";
import { stories } from "@/data/stories";

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and Sort Logic
  const filteredStories = useMemo(() => {
    let result = [...stories];

    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (story) =>
          story.title.toLowerCase().includes(q) ||
          story.snippet.toLowerCase().includes(q) ||
          story.author.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (categoryFilter) {
      result = result.filter(
        (story) => story.category && story.category === categoryFilter
      );
    }

    // 3. Sort/Tabs
    if (activeFilter === "Newest") {
      // Mock date sorting (assuming higher ID is newer for now, or using timestamp string simpler logic)
      // Real app would parse date strings. For now, let's reverse generic 'stories' array order if "Newest"
      // or keep "Relevance" as is if search is active.
      // Let's implement simple mock sort:
      // Newest: Preserve default order (assuming mock data is somewhat ordered)
      // Trending: Sort by likes
    } else if (activeFilter === "Trending") {
      result.sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [searchQuery, categoryFilter, activeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter(null);
    setActiveFilter("Newest");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feed Column */}
        <div className="lg:col-span-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
              Latest Stories
            </h1>
            <p className="text-gray-400">
              Discover worlds created by the community
            </p>
          </div>

          <FeedFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {categoryFilter && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtering by:</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-2">
                {categoryFilter}
                <button
                  onClick={() => setCategoryFilter(null)}
                  className="hover:text-white"
                >
                  &times;
                </button>
              </span>
            </div>
          )}

          <FeedList stories={paginatedStories} />

          {filteredStories.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}

          {filteredStories.length === 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={resetFilters}
                className="text-blue-500 hover:text-blue-400 text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 border-l border-gray-800/50 pl-0 lg:pl-12 hidden lg:block">
          <Sidebar setCategoryFilter={setCategoryFilter} />
        </div>
      </div>
    </div>
  );
}
