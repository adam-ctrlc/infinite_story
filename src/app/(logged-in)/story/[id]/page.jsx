import Link from "next/link";
import { getStoryById } from "@/data/stories";
import ContinuationList from "@/components/story/ContinuationList";
import { PenTool } from "lucide-react";

export default async function Page({ params }) {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-400">Story not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      {/* Read Section */}
      {/* Read Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Original Story
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-blue-900/50 to-transparent"></span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-tight">
          {story.title}
        </h1>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-10 shadow-2xl">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-serif">
              {story.snippet}
            </p>

            <div className="mt-10 flex items-center justify-between text-sm text-gray-400 border-t border-gray-800 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {story.author[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Started by
                  </span>
                  <strong className="text-gray-200 text-base">
                    @{story.author}
                  </strong>
                </div>
              </div>
              <span className="font-medium bg-gray-800/50 px-3 py-1 rounded-full">
                {story.timestamp}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Connector Line */}
      <div className="flex flex-col items-center -mt-12 mb-0 relative z-0">
        <div className="w-0.5 h-16 bg-gray-800"></div>
      </div>

      {/* Continuations Section */}
      <div className="mb-12">
        <ContinuationList continuations={story.continuations} />
      </div>

      {/* Action Section */}
      <div className="flex flex-col gap-10">
        {/* Continue Story - Primary Action */}
        {/* Continue Story - Primary Action */}
        {/* Continue Story - Primary Action */}
        <div className="bg-gray-900/20 border border-gray-800/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <PenTool size={16} />
            Add to the story
          </h2>

          <form className="flex flex-col gap-4">
            <textarea
              id="continuation"
              name="continuation"
              className="w-full h-32 bg-gray-950 border border-gray-800 text-gray-300 text-base rounded-lg p-4 focus:outline-none focus:border-blue-500/50 transition-all placeholder-gray-600 resize-none"
              placeholder="What happens next?"
            ></textarea>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-6 rounded-lg transition-all text-sm"
              >
                Append
              </button>
            </div>
          </form>
        </div>

        {/* Start New Story - Secondary Action */}
        <div className="flex flex-col gap-2 justify-between bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-300">
            Want to start something new?
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <p className="text-gray-500 text-sm">
              Begin a fresh journey and let others follow your lead.
            </p>
            <Link
              href="/story"
              className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all font-medium text-sm whitespace-nowrap"
            >
              Create New Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
