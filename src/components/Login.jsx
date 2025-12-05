export default function Login() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
        Welcome Back
      </h2>
      <form method="POST" className="flex flex-col gap-5">
        <label htmlFor="username" className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Username
          </span>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="off"
            className="bg-gray-950/50 border border-gray-800 text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600"
            placeholder="Enter your username"
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Password
          </span>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="off"
            className="bg-gray-950/50 border border-gray-800 text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600"
            placeholder="••••••••"
          />
        </label>
        <button
          id="submit"
          type="submit"
          name="submit"
          className="mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-900/20 transform transition w-full cursor-pointer active:scale-95"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
