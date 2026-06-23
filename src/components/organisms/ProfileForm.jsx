'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Save, Edit2, X } from 'lucide-react'

export default function ProfileForm() {
  const { user, isLoaded } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  if (!isLoaded) return <div className="text-[#6b6b6b] text-sm">Loading...</div>

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const formData = new FormData(e.target)
    try {
      await user.update({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        username: formData.get('username'),
      })
      setIsEditing(false)
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Failed to save changes.')
    }
    setSaving(false)
  }

  const inputCls = (active) =>
    `w-full border text-[#242424] text-sm rounded-sm p-3 transition-colors ${
      active
        ? 'border-[#e6e6e6] bg-[#fafafa] focus:outline-none focus:border-[#242424]'
        : 'border-[#e6e6e6] bg-[#f7f7f7] cursor-not-allowed text-[#6b6b6b]'
    }`

  const labelCls = 'text-xs font-medium text-[#6b6b6b] mb-1.5 block'

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-xl font-bold text-[#242424]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          Profile Details
        </h2>
        <button
          onClick={() => { setIsEditing(!isEditing); setError(null) }}
          className="flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors"
        >
          {isEditing ? <><X size={13} /> Cancel</> : <><Edit2 size={13} /> Edit</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>First Name</label>
            <input
              name="firstName"
              type="text"
              disabled={!isEditing}
              defaultValue={user?.firstName || ''}
              className={inputCls(isEditing)}
            />
          </div>
          <div>
            <label className={labelCls}>Last Name</label>
            <input
              name="lastName"
              type="text"
              disabled={!isEditing}
              defaultValue={user?.lastName || ''}
              className={inputCls(isEditing)}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] text-sm">@</span>
            <input
              name="username"
              type="text"
              disabled={!isEditing}
              defaultValue={user?.username || ''}
              className={`${inputCls(isEditing)} pl-7`}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            disabled
            defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
            className={inputCls(false)}
          />
          <p className="text-xs text-[#6b6b6b] mt-1.5">Managed through your Clerk account.</p>
        </div>

        {error && <p className="text-[#c94c4c] text-sm">{error}</p>}

        {isEditing && (
          <div className="pt-4 flex justify-end border-t border-[#e6e6e6] mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#242424] text-white text-sm font-medium rounded-full hover:bg-[#3d3d3d] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </>
  )
}
