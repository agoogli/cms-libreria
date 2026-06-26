import React from 'react'
import { Phone, Mail, MessageCircle } from 'lucide-react'

export function TopBar() {
  return (
    <div className="w-full bg-[#363537] text-zinc-300 py-2 px-4 border-b border-zinc-700 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <a
          href="tel:+390123456789"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
        >
          <Phone className="w-3.5 h-3.5 text-orange-500" />
          <span>+39 012 3456789</span>
        </a>
        <a
          href="mailto:info@libreriaantigravita.it"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
        >
          <Mail className="w-3.5 h-3.5 text-orange-500" />
          <span>info@libreriaantigravita.it</span>
        </a>
        <a
          href="https://wa.me/390123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
        >
          <MessageCircle className="w-3.5 h-3.5 text-orange-500" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
