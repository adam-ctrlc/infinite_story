'use client'

import { ExternalLink, Key } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'

export default function SecuritySettings() {
  const { openUserProfile } = useClerk()

  return (
    <div>
      <h2
        className="text-xl font-bold text-[#242424] mb-2"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      >
        Security
      </h2>
      <p className="text-[#6b6b6b] text-sm mb-6 leading-relaxed">
        Manage your password, two-factor authentication, and connected accounts through the Clerk account portal.
      </p>
      <button
        type="button"
        onClick={() => openUserProfile()}
        className="flex items-center gap-2 px-5 py-2 border border-[#e6e6e6] rounded-full text-sm text-[#242424] hover:border-[#242424] transition-colors font-medium"
      >
        <ExternalLink size={14} /> Open Account Settings
      </button>
    </div>
  )
}
