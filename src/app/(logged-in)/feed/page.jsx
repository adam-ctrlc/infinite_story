'use client'

import { useState, useMemo, useEffect } from 'react'
import { X, Users } from 'lucide-react'
import FeedList from '@/components/organisms/FeedList'
import FeedSidebar from '@/components/organisms/FeedSidebar'
import FeedFilters from '@/components/organisms/FeedFilters'
import Pagination from '@/components/organisms/Pagination'

const ITEMS_PER_PAGE = 8

export default function FeedPage() {
  const [stories, setStories] = useState([])
  const [followingStories, setFollowingStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Newest') // default; Following shows after user follows someone
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('/api/stories')
      .then((r) => r.json())
      .then((data) => { setStories(data); setLoading(false) })
  }, [])

  // Fetch following stories when that tab is selected
  useEffect(() => {
    if (activeFilter === 'Following') {
      fetch('/api/stories?following=true')
        .then((r) => r.json())
        .then(setFollowingStories)
    }
  }, [activeFilter])

  const filtered = useMemo(() => {
    if (activeFilter === 'Following') return followingStories

    let result = [...stories]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          s.content?.toLowerCase().includes(q) ||
          (typeof s.author === 'string' ? s.author : s.author?.name)?.toLowerCase().includes(q)
      )
    }
    if (categoryFilter) result = result.filter((s) => s.category === categoryFilter)
    if (activeFilter === 'Trending') result.sort((a, b) => b.likes - a.likes)
    else if (activeFilter === 'Most Discussed') result.sort((a, b) => (b.commentCount ?? 0) - (a.commentCount ?? 0))
    else if (activeFilter === 'Most Branched') result.sort((a, b) => (b.branchCount ?? 0) - (a.branchCount ?? 0))
    else if (activeFilter === 'Top Rated') result.sort((a, b) => (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0))
    return result
  }, [stories, followingStories, searchQuery, categoryFilter, activeFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const trendingStories = [...stories].sort((a, b) => b.likes - a.likes).slice(0, 5)

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter(null)
    setActiveFilter('Newest')
    setCurrentPage(1)
  }

  const isFollowingTab = activeFilter === 'Following'

  return (
    <div className="min-h-screen bg-white pt-14 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-10">

          {/* Main feed column */}
          <div className="lg:col-span-8">
            <FeedFilters
              activeFilter={activeFilter}
              setActiveFilter={(f) => { setActiveFilter(f); setCurrentPage(1) }}
              searchQuery={searchQuery}
              setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1) }}
            />

            {!isFollowingTab && categoryFilter && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-[#6b6b6b]">Genre:</span>
                <span className="px-3 py-1 rounded-full bg-[#f2f2f2] text-[#242424] text-xs font-medium flex items-center gap-2">
                  {categoryFilter}
                  <button onClick={() => setCategoryFilter(null)} className="hover:text-[#c94c4c]">
                    <X size={11} />
                  </button>
                </span>
              </div>
            )}

            {loading ? (
              <div className="space-y-8 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="py-8 border-b border-[#e6e6e6]">
                    <div className="h-4 bg-[#f2f2f2] rounded w-32 mb-4 animate-pulse" />
                    <div className="h-6 bg-[#f2f2f2] rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-[#f2f2f2] rounded w-full mb-1 animate-pulse" />
                    <div className="h-4 bg-[#f2f2f2] rounded w-5/6 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : isFollowingTab && filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Users size={36} className="text-[#e6e6e6] mb-4" />
                <p className="text-[#242424] font-medium mb-2">No stories yet</p>
                <p className="text-sm text-[#6b6b6b] max-w-xs">
                  Follow authors on their story pages to see their latest work here.
                </p>
              </div>
            ) : (
              <FeedList stories={paginated} onClearFilters={resetFilters} />
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 hidden lg:block border-l border-[#e6e6e6] pl-10">
            <FeedSidebar
              activeCategory={categoryFilter}
              onCategorySelect={(cat) => { setCategoryFilter(cat); setCurrentPage(1) }}
              trendingStories={trendingStories}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
