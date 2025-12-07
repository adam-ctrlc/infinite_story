"use client";

import { useState } from "react";
import { Save, Edit2, X } from "lucide-react";

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "John Doe",
    username: "johndoe",
    bio: "Sci-fi enthusiast. Digital nomad. Exploring the infinite branches of storytelling.",
    email: "john@example.com",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Logic to save data would go here
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Reset form would happen here
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Edit Details
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

      <form onSubmit={handleSave} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="display_name"
              className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
            >
              Display Name
            </label>
            <input
              type="text"
              id="display_name"
              disabled={!isEditing}
              defaultValue={profileData.displayName}
              className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 transition-all ${
                isEditing
                  ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-700"
                  : "border-transparent cursor-not-allowed opacity-70"
              }`}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="username"
              className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                @
              </span>
              <input
                type="text"
                id="username"
                disabled={!isEditing}
                defaultValue={profileData.username}
                className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 pl-8 transition-all ${
                  isEditing
                    ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-700"
                    : "border-transparent cursor-not-allowed opacity-70"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="bio"
            className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows="4"
            disabled={!isEditing}
            className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 transition-all resize-none leading-relaxed ${
              isEditing
                ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-700"
                : "border-transparent cursor-not-allowed opacity-70"
            }`}
            defaultValue={profileData.bio}
          />
          {isEditing && (
            <p className="text-xs text-gray-600 text-right pr-2 animate-in fade-in">
              Max 160 characters
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            disabled={!isEditing}
            defaultValue={profileData.email}
            className={`w-full bg-gray-950/50 border text-white text-sm font-medium rounded-xl p-4 transition-all ${
              isEditing
                ? "border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-700"
                : "border-transparent cursor-not-allowed opacity-70"
            }`}
          />
        </div>

        {isEditing && (
          <div className="pt-6 flex justify-end border-t border-gray-800/50 mt-8 animate-in slide-in-from-bottom-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm transform hover:-translate-y-0.5"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </>
  );
}
