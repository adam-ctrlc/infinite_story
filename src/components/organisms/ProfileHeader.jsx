import Avatar from '@/components/atoms/Avatar'
import StatGroup from '@/components/molecules/StatGroup'

export default function ProfileHeader({ user, stats }) {
  const name = user?.fullName || user?.firstName || user?.username || 'Anonymous'
  const username = user?.username || user?.id?.slice(0, 8) || 'user'
  const imageUrl = user?.imageUrl || null
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : ''

  return (
    <div className="border-b border-[#e6e6e6]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <Avatar name={name} imageUrl={imageUrl} size="2xl" />
          <div className="flex-1">
            <h1
              className="text-3xl font-bold text-[#242424] mb-1"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {name}
            </h1>
            <p className="text-[#6b6b6b] text-sm mb-1">@{username}</p>
            {joinedDate && <p className="text-[#6b6b6b] text-sm">Member since {joinedDate}</p>}
          </div>
          <StatGroup stats={stats.map((s) => ({ ...s, href: s.tab ? `#tab-${s.tab}` : undefined }))} />
        </div>
      </div>
    </div>
  )
}
