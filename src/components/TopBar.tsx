import React from 'react'
import { Phone, Mail, MessagesSquare } from 'lucide-react'

export function TopBar() {
  return (
    <div className="w-full bg-[#363537] text-zinc-300 py-1.5 px-4 border-b border-zinc-700 text-[9px] sm:text-xs font-sans font-normal tracking-wide">
      <div className="w-full max-w-[1152px] mx-auto flex flex-row justify-center items-center gap-3 sm:gap-8">
        <a
          href="tel:+39090710469"
          className="flex items-center gap-1.5 hover:text-orange-400 transition-colors duration-200"
        >
          <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
          <span>090710469</span>
        </a>
        <a
          href="mailto:librerianunnari@gmail.com"
          className="flex items-center gap-1.5 hover:text-orange-400 transition-colors duration-200"
        >
          <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
          <span className="hidden sm:inline">librerianunnari@gmail.com</span>
          <span className="inline sm:hidden">librerianunnari@gmail.com</span>
        </a>
        <a
          href="https://wa.me/393276687839"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-orange-400 transition-colors duration-200"
        >
          <MessagesSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
          <span>3276687839</span>
        </a>
      </div>
    </div>
  )
}
