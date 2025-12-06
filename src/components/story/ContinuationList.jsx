import { GitBranch, Heart } from "lucide-react";

export default function ContinuationList({ continuations }) {
  if (!continuations || continuations.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-gray-200 flex items-center justify-center gap-2 pb-4">
        <div className="p-2 rounded-full bg-gray-900 border border-gray-800 z-10">
          <GitBranch className="text-blue-500" size={20} />
        </div>
        <span className="sr-only">Narrative Paths</span>
      </h3>
      <div className="text-center -mt-6 mb-6 text-gray-500 text-sm font-medium uppercase tracking-wider">
        Narrative Paths
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {continuations.map((continuation) => (
          <div
            key={continuation.id}
            className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all cursor-pointer group"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
              {continuation.content}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800/50 pt-3">
              <span className="text-blue-400 font-medium">
                @{continuation.author}
              </span>
              <div className="flex items-center gap-3">
                <span>{continuation.timestamp}</span>
                <span className="flex items-center gap-1 group-hover:text-pink-500 transition-colors">
                  <Heart size={12} /> {continuation.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
