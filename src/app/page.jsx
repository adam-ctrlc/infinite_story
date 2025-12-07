import Login from "@/components/Login";
import { BookOpen } from "lucide-react";

export default function page() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30 flex flex-col items-center justify-center p-4">
      {/* Ambient Effect Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Brand Header */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl shadow-blue-900/20 mb-6">
            <BookOpen className="text-white h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="text-white">Infinite</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Story
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-light">
            Collaborative storytelling for the digital age.
          </p>
        </div>

        {/* Login Card Container */}
        <div className="w-full relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {/* Glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg opacity-75"></div>
          <Login />
        </div>

        <div className="mt-12 text-center text-sm text-gray-600 animate-in fade-in duration-1000 delay-300">
          © 2024 Infinite Story. All rights reserved.
        </div>
      </div>
    </main>
  );
}
