import { User, Lock, ShieldCheck } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
]

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-widest mb-4">Account</h3>
      <nav className="flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-sm transition-colors text-left ${
              activeTab === tab.id
                ? 'bg-[#f2f2f2] text-[#242424]'
                : 'text-[#6b6b6b] hover:text-[#242424] hover:bg-[#fafafa]'
            }`}
          >
            <tab.icon size={15} /> {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
