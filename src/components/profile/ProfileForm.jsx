'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Save, Edit2, X } from 'lucide-react'

export default function ProfileForm() {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  function handleEdit() {
    setFirstName(user?.firstName || '')
    setLastName(user?.lastName || '')
    setIsEditing(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      await user?.update({ firstName: firstName.trim(), lastName: lastName.trim() })
    } catch (_) {}
    setIsEditing(false)
  }

  const displayFirst = isEditing ? firstName : (user?.firstName || '')
  const displayLast = isEditing ? lastName : (user?.lastName || '')
  const username = user?.username || ''
  const email = user?.primaryEmailAddress?.emailAddress || ''

  const fieldClass = (editing) =>
    `w-full border rounded px-3 py-2 text-sm text-[#242424] bg-white outline-none transition-colors ${
      editing
        ? 'border-[#242424] focus:border-[#1a8917]'
        : 'border-[#e6e6e6] bg-[#fafafa] cursor-default text-[#6b6b6b]'
    }`

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-[#242424]">Profile Details</h2>
        {isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors"
          >
            <X size={14} /> Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors border border-[#e6e6e6] px-3 py-1.5 rounded hover:border-[#242424]"
          >
            <Edit2 size={13} /> Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="profile-first-name" className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">First Name</label>
            <input
              id="profile-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={displayFirst}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
              placeholder="First name"
              className={fieldClass(isEditing)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="profile-last-name" className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">Last Name</label>
            <input
              id="profile-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={displayLast}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
              placeholder="Last name"
              className={fieldClass(isEditing)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="profile-username" className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] text-sm">@</span>
            <input
              id="profile-username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              disabled
              className="w-full border border-[#e6e6e6] bg-[#fafafa] rounded px-3 py-2 pl-7 text-sm text-[#6b6b6b] cursor-default"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="profile-email" className="text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">Email</label>
          <input
            id="profile-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            disabled
            className="w-full border border-[#e6e6e6] bg-[#fafafa] rounded px-3 py-2 text-sm text-[#6b6b6b] cursor-default"
          />
          <p className="text-xs text-[#b3b3b3]">Managed through your Clerk account.</p>
        </div>

        {isEditing && (
          <div className="pt-4 border-t border-[#e6e6e6] flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-[#1a8917] text-white text-sm font-medium rounded-full hover:bg-[#157013] transition-colors"
            >
              <Save size={14} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </>
  )
}
