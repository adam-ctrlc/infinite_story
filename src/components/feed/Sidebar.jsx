import Link from "next/link";

export default function Sidebar({ setCategoryFilter }) {
  const categories = [
    "Cyberpunk",
    "Sci-Fi",
    "Mystery",
    "Fantasy",
    "Horror",
    "Romance",
    "Thriller",
    "Dystopian",
  ];

  return (
    <aside className="sticky top-24 space-y-8">
      {/* Discover Section */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-4">
          Discover more
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 hover:text-white transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Links (Visual) */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 px-2">
        <Link href="#" className="hover:text-gray-400">
          Help
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Status
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Writers
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Blog
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Careers
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Privacy
        </Link>
        <Link href="#" className="hover:text-gray-400">
          Terms
        </Link>
        <Link href="#" className="hover:text-gray-400">
          About
        </Link>
      </div>
    </aside>
  );
}
