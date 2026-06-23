'use client'

import { useState } from 'react'
import SettingsSidebar from '@/components/organisms/SettingsSidebar'
import ProfileForm from '@/components/organisms/ProfileForm'
import SecuritySettings from '@/components/organisms/SecuritySettings'
import PrivacySettings from '@/components/organisms/PrivacySettings'

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="lg:col-span-3 min-h-96">
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
        </div>
      </div>
    </div>
  )
}
