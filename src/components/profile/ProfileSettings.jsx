"use client";

import { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import ProfileForm from "./ProfileForm";
import SecuritySettings from "./SecuritySettings";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Settings Navigation/Sidebar */}
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="lg:col-span-3">
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden min-h-[500px]">
          {/* Decorative sheen */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}
