import { User, Calendar, Book, Heart, Edit3 } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="relative mb-12 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="h-40 w-40 rounded-full border-4 border-[#020617] bg-gray-900 flex items-center justify-center shadow-2xl relative group shrink-0">
            <div className="h-full w-full rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-4xl font-bold text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              JD
            </div>
            <button className="absolute bottom-2 right-2 bg-gray-900 p-2.5 rounded-full border border-gray-700 hover:bg-gray-800 hover:border-gray-500 text-gray-400 hover:text-white transition-all shadow-lg">
              <Edit3 size={16} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              John Doe
            </h1>
            <p className="text-gray-400 max-w-lg mb-6 leading-relaxed text-sm md:text-base mx-auto md:mx-0 font-medium">
              Sci-fi enthusiast. Digital nomad. Exploring the infinite branches
              of storytelling.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-medium text-gray-400 uppercase tracking-wide">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800/80">
                <User size={12} className="text-blue-500" />
                <span>@johndoe</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800/80">
                <Calendar size={12} className="text-purple-500" />
                <span>Joined Dec 2025</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex md:flex-col gap-6 w-full md:w-auto bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 shadow-xl justify-between md:justify-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-white">
                12
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Stories
              </span>
            </div>
            <div className="w-px h-8 bg-gray-800 md:w-8 md:h-px md:mx-auto"></div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-white">
                45
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Edits
              </span>
            </div>
            <div className="w-px h-8 bg-gray-800 md:w-8 md:h-px md:mx-auto"></div>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold text-white">
                1.2k
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
