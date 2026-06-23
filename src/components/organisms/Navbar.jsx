'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'
import { PenLine, Menu, X } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'

const navItems = [
  { name: 'Feed', href: '/feed' },
  { name: 'Write', href: '/story' },
  { name: 'Profile', href: '/profile' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { signOut } = useClerk()
  const { user } = useUser()

  const name = user?.username || user?.firstName || 'User'
  const imageUrl = user?.imageUrl || null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e6e6e6]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/feed" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-[#242424] rounded-sm flex items-center justify-center text-white">
              <PenLine size={14} />
            </div>
            <span
              className="text-lg font-bold text-[#242424] tracking-tight"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              Infinite Story
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isActive ? 'text-[#242424] font-medium' : 'text-[#6b6b6b] hover:text-[#242424]'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}

            <div className="h-4 w-px bg-[#e6e6e6]" />

            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              className="text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors"
            >
              Sign out
            </button>

            <Link href="/profile" aria-label="Profile">
              <Avatar name={name} imageUrl={imageUrl} size="sm" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#6b6b6b] hover:text-[#242424] p-1"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#e6e6e6]">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm ${isActive ? 'text-[#242424] font-medium' : 'text-[#6b6b6b]'}`}
                >
                  {item.name}
                </Link>
              )
            })}
            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              className="block text-sm text-[#6b6b6b]"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
