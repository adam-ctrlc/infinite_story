"use client";

import { useState } from "react";
import { Key, Edit2, X, Save } from "lucide-react";
import ConnectedAccounts from "./ConnectedAccounts";

export default function SecuritySettings() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Change Password Section */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Key size={18} className="text-blue-500" />
            Password
          </h2>
          <button
            onClick={toggleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isEditing
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {isEditing ? (
              <>
                <X size={14} /> Cancel
              </>
            ) : (
              <>
                <Edit2 size={14} /> Edit
              </>
            )}
          </button>
        </div>

        <form className="space-y-4">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              disabled={!isEditing}
              className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 transition-all ${
                isEditing
                  ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-600"
                  : "border-transparent cursor-not-allowed opacity-70"
              }`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                disabled={!isEditing}
                className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 transition-all ${
                  isEditing
                    ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-600"
                    : "border-transparent cursor-not-allowed opacity-70"
                }`}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                disabled={!isEditing}
                className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 transition-all ${
                  isEditing
                    ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-600"
                    : "border-transparent cursor-not-allowed opacity-70"
                }`}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          {isEditing && (
            <div className="pt-4 flex justify-end border-t border-gray-800/50 mt-4 animate-in slide-in-from-bottom-2">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm transform hover:-translate-y-0.5">
                <Save size={18} /> Update Password
              </button>
            </div>
          )}
        </form>
      </section>

      <ConnectedAccounts />
    </div>
  );
}
