export default function StatGroup({ stats }) {
  return (
    <div className="flex gap-8 md:gap-12">
      {stats.map((stat) => {
        const inner = (
          <>
            <span
              className="text-2xl font-bold text-[#242424]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {stat.value}
            </span>
            <span className="text-xs text-[#6b6b6b] mt-0.5">{stat.label}</span>
          </>
        )

        if (stat.href) {
          return (
            <a key={stat.label} href={stat.href} className="flex flex-col items-center hover:opacity-70 transition-opacity">
              {inner}
            </a>
          )
        }

        return (
          <div key={stat.label} className="flex flex-col items-center">
            {inner}
          </div>
        )
      })}
    </div>
  )
}
