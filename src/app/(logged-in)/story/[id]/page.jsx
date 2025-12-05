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
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          {story.title}
        </h1>
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <p className="text-base text-gray-300 leading-relaxed">
            {story.snippet}
          </p>
          <div className="mt-8 flex items-center justify-between text-sm text-gray-500 border-t border-gray-800 pt-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 block"></span>
              <span>
                Started by{" "}
                <strong className="text-gray-300">@{story.author}</strong>
              </span>
            </div>
            <span>{story.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Continuations Section */}
      <div className="mb-12">
        <ContinuationList continuations={story.continuations} />
      </div>

      {/* Action Section */}
      <div className="flex flex-col gap-10">
        {/* Continue Story - Primary Action */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
            Continue the Narrative
          </h2>

          <form className="flex flex-col gap-6">
            <div className="relative">
              <textarea
                id="continuation"
                name="continuation"
                className="w-full h-64 bg-gray-950/80 border border-gray-800 text-gray-100 text-base rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600 resize-none leading-relaxed shadow-inner"
                placeholder="The story is in your hands. What happens next?"
              ></textarea>
              <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                Markdown supported
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20 transform hover:-translate-y-1 active:translate-y-0 text-base flex items-center gap-2"
              >
                <span>Append to Story</span>
                <PenTool size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Start New Story - Secondary Action */}
        <div className="flex items-center justify-between bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
          <div>
            <h3 className="text-lg font-bold text-gray-300">
              Want to start something new?
            </h3>
            <p className="text-gray-500 text-sm">
              Begin a fresh journey and let others follow your lead.
            </p>
          </div>
          <Link
            href="/story"
            className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all font-medium text-sm whitespace-nowrap"
          >
            Create New Story
          </Link>
        </div>
      </div>
    </div>
  );
}
