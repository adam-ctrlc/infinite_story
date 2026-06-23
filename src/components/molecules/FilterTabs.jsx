export default function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`text-sm font-medium pb-4 border-b-2 transition-colors whitespace-nowrap ${
            active === tab
              ? 'border-[#242424] text-[#242424]'
              : 'border-transparent text-[#6b6b6b] hover:text-[#242424]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
