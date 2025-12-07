import { Cloud, Github } from "lucide-react";

export default function ConnectedAccounts() {
  return (
    <section className="relative z-10 pt-6 border-t border-gray-800/50">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
        <Cloud size={18} className="text-blue-500" />
        Connected Accounts
      </h2>
      <div className="space-y-4">
        {/* Google Account */}
        <div className="flex items-center justify-between p-4 bg-gray-950/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 opacity-70 grayscale"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Google</h4>
              <p className="text-xs text-gray-500">Not connected</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold transition-all border border-gray-700">
            Connect
          </button>
        </div>

        {/* GitHub Account */}
        <div className="flex items-center justify-between p-4 bg-gray-900/30 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
              <Github size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">GitHub</h4>
              <p className="text-xs text-green-500/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Connected as johndoe
              </p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all border border-red-500/10">
            Disconnect
          </button>
        </div>
      </div>
    </section>
  );
}
