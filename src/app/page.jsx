import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="min-h-screen bg-white flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#fafafa] border-r border-[#e6e6e6] p-16">
        <div>
          <span
            className="text-2xl font-bold text-[#242424] tracking-tight"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            Infinite Story
          </span>
        </div>
        <div>
          <blockquote
            className="text-5xl font-bold text-[#242424] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            "Start a story. Pass the pen. See where the world takes it."
          </blockquote>
          <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-md">
            A collaborative canvas where every paragraph is an invitation.
            Write the opening line. Someone else writes the next.
          </p>
        </div>
        <p className="text-sm text-[#6b6b6b]">© 2025 Infinite Story</p>
      </div>

      {/* Right panel — sign in */}
      <div className="flex flex-col items-center justify-center flex-1 p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <h1
              className="text-3xl font-bold text-[#242424] mb-2"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              Infinite Story
            </h1>
            <p className="text-[#6b6b6b]">Collaborative storytelling for the digital age.</p>
          </div>

          <SignIn
            routing="hash"
            appearance={{
              variables: {
                colorPrimary: '#1a8917',
                colorBackground: '#ffffff',
                colorInputBackground: '#fafafa',
                colorInputText: '#242424',
                colorText: '#242424',
                colorTextSecondary: '#6b6b6b',
                colorNeutral: '#6b6b6b',
                borderRadius: '0.25rem',
                fontFamily: 'var(--font-geist-sans), -apple-system, sans-serif',
              },
              elements: {
                card: 'shadow-none border-0 bg-white',
                headerTitle: 'text-[#242424] font-bold',
                headerSubtitle: 'text-[#6b6b6b]',
                socialButtonsBlockButton: 'border border-[#e6e6e6] bg-white hover:bg-[#fafafa] text-[#242424]',
                dividerLine: 'bg-[#e6e6e6]',
                dividerText: 'text-[#6b6b6b]',
                formFieldLabel: 'text-[#6b6b6b] text-xs font-medium',
                formFieldInput: 'border-[#e6e6e6] bg-[#fafafa] text-[#242424] focus:border-[#242424]',
                formButtonPrimary: 'bg-[#1a8917] hover:bg-[#157013] text-white',
                footerActionLink: 'text-[#1a8917] hover:text-[#157013]',
              },
            }}
          />
        </div>
      </div>
    </main>
  )
}
