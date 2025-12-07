import { Send, Sparkles } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        {/* Header Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={12} />
            New Narrative
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-blue-900/50 to-transparent"></span>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-10 shadow-2xl">
            <form className="flex flex-col gap-8">
              {/* Title Input */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
                >
                  Story Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="w-full bg-gray-950/50 border border-gray-800 text-gray-100 text-2xl md:text-3xl font-bold rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-700 font-serif"
                  type="text"
                  placeholder="The Chronicles of..."
                />
              </div>

              {/* Body Input */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="body-content"
                  className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
                >
                  Opening Scene
                </label>
                <textarea
                  id="body-content"
                  name="body"
                  className="w-full h-80 bg-gray-950/50 border border-gray-800 text-gray-100 text-lg rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-700 resize-none leading-relaxed font-serif"
                  placeholder="It started with a whisper..."
                ></textarea>
              </div>

              {/* Footer / Submit */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-800/50">
                <p className="text-sm text-gray-500 hidden md:block">
                  Your story will be the start of something infinite.
                </p>
                <button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1 active:translate-y-0 text-base flex items-center gap-2"
                >
                  <span>Publish Story</span>
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
