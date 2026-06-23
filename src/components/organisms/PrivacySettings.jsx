'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-[#f2f2f2] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#242424]">{label}</p>
        <p className="text-xs text-[#6b6b6b] mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-10 h-5 rounded-full transition-colors ${checked ? 'bg-[#242424]' : 'bg-[#e6e6e6]'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
        />
      </button>
    </div>
  )
}

export default function PrivacySettings() {
  const { user } = useUser()
  const [settings, setSettings] = useState({ hideFollowers: false, hideFollowing: false })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    fetch(`/api/user/${user.id}/settings`)
      .then((r) => r.json())
      .then((d) => setSettings({ hideFollowers: !!d.hideFollowers, hideFollowing: !!d.hideFollowing }))
  }, [user])

  async function save(patch) {
    const next = { ...settings, ...patch }
    setSettings(next)
    setSaving(true)
    await fetch(`/api/user/${user.id}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-[#242424] mb-1">Privacy</h2>
      <p className="text-sm text-[#6b6b6b] mb-6">Control what others can see on your public profile.</p>

      <div className="mb-8">
        <Toggle
          checked={settings.hideFollowers}
          onChange={(v) => save({ hideFollowers: v })}
          label="Hide follower count"
          description="Visitors won't see how many people follow you."
        />
        <Toggle
          checked={settings.hideFollowing}
          onChange={(v) => save({ hideFollowing: v })}
          label="Hide following count"
          description="Visitors won't see how many people you follow."
        />
      </div>

      <div className="rounded-lg border border-[#e6e6e6] p-4 bg-[#fafafa]">
        <p className="text-xs font-semibold text-[#242424] uppercase tracking-wide mb-1">Story visibility</p>
        <p className="text-xs text-[#6b6b6b]">
          You can set individual stories to private from your <strong>Stories</strong> tab below.
          Branches you write on others' stories are always public.
        </p>
      </div>

      {(saving || saved) && (
        <p className="text-xs text-[#6b6b6b] mt-4">{saving ? 'Saving…' : 'Saved'}</p>
      )}
    </div>
  )
}
