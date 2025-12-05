import Link from "next/link";
import { MessageSquare, Heart, Share2 } from "lucide-react";

export default function FeedCard({ story }) {
  return (
    <Link href={`/story/${story.id}`}>
      <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 h-full flex flex-col cursor-pointer">
        <div className="p-6 flex flex-col items-start gap-4 flex-grow">
          <div className="w-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                {story.title}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {story.timestamp}
              </span>
            </div>
            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
              {story.snippet}
            </p>
          </div>

          <div className="w-full flex items-center justify-between text-gray-500 text-sm mt-auto pt-4 border-t border-gray-800/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
              <span className="text-gray-300 font-medium">@{story.author}</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-blue-400 transition-colors z-10">
                <Heart size={16} />
                <span>{story.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-400 transition-colors z-10">
                <MessageSquare size={16} />
                <span>{story.comments}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
