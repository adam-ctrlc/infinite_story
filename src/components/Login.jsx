import { ArrowRight, Chrome } from "lucide-react";

export default function Login() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl shadow-blue-900/20 border border-gray-800 w-full max-w-md mx-auto relative overflow-hidden group">
      {/* Decorative gradient sheen */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>

      <h2 className="text-2xl font-bold text-center mb-8 text-white relative z-10">
        Welcome Back
      </h2>

      <div className="flex flex-col gap-5 relative z-10">
        <button className="flex items-center justify-center gap-3 w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg active:scale-95">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-bold uppercase tracking-wider">
            Or
          </span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <form method="POST" className="flex flex-col gap-5">
          <label htmlFor="username" className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Username
            </span>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="off"
              className="bg-gray-950/50 border border-gray-800 text-gray-200 text-sm font-medium rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-700"
              placeholder="Enter your username"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Password
            </span>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="off"
              className="bg-gray-950/50 border border-gray-800 text-gray-200 text-sm font-medium rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-700"
              placeholder="••••••••"
            />
          </label>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            id="submit"
            type="submit"
            name="submit"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-900/20 transform transition-all w-full cursor-pointer active:scale-95 hover:shadow-blue-900/40"
          >
            Sign In{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
