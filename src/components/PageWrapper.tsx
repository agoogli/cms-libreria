import React from 'react'

interface PageWrapperProps {
  title: string
  children: React.ReactNode
}

export function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <div className="w-full max-w-[1152px] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Page Title in orange, aligned left */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          {title}
        </span>
      </div>

      {/* Page Body Content */}
      <div className="mt-1 flex flex-col gap-6">
        {children}
      </div>
    </div>
  )
}
