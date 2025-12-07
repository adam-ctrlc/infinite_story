import { User, Lock } from "lucide-react";

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-4 sticky top-24 backdrop-blur-sm">
        <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 px-3 mt-2">
          Account
        </h3>
        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
              activeTab === "profile"
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            }`}
          >
            <User size={16} /> Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
              activeTab === "security"
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            }`}
          >
            <Lock size={16} /> Security
          </button>
        </nav>
      </div>
    </div>
  );
}
