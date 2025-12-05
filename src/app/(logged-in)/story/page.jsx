import { Send } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen flex justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Begin a New Narrative
          </h1>
          <p className="text-gray-400 text-base">
            Plant the seed of a story for the world to grow. Start something
            unforgettable.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <form className="flex flex-col gap-8 relative z-10" action="">
            <div id="header" className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-xs font-bold text-blue-500 uppercase tracking-wider"
              >
                Story Title
              </label>
              <input
                id="title"
                name="title"
                className="w-full bg-gray-950/50 border border-gray-800 text-gray-100 text-xl font-bold rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-700"
                type="text"
                placeholder="The Chronicles of..."
              />
            </div>

            <div id="body" className="flex-grow flex flex-col gap-2">
              <label
                htmlFor="body-content"
                className="text-xs font-bold text-blue-500 uppercase tracking-wider"
              >
                Opening Scene
              </label>
              <textarea
                id="body-content"
                name="body"
                className="w-full h-80 bg-gray-950/50 border border-gray-800 text-gray-100 text-base rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-700 resize-none leading-relaxed"
                placeholder="It started with a whisper..."
              ></textarea>
            </div>

            <div
              id="footer"
              className="flex justify-end pt-2 border-t border-gray-800/50"
            >
              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-6 rounded-xl shadow-lg shadow-blue-900/20 transform transition cursor-pointer active:scale-95 text-base flex items-center gap-2"
              >
                <span>Publish to the World</span>
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
