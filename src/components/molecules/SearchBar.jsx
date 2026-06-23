import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search stories...' }) {
  return (
    <div className="relative w-full sm:w-56">
      <label htmlFor="feed-search" className="sr-only">Search stories</label>
      <input
        id="feed-search"
        name="search"
        type="search"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#fafafa] border border-[#e6e6e6] rounded-full py-2 pl-9 pr-4 text-sm text-[#242424] placeholder-[#b3b3b3] focus:outline-none focus:border-[#242424] transition-colors"
      />
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]" />
    </div>
  )
}
