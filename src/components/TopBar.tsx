import React from 'react'
import { Phone, Mail } from 'lucide-react'

export function TopBar() {
  return (
    <div className="w-full bg-[#363537] text-zinc-300 py-1.5 px-4 border-b border-zinc-700 text-[11px] sm:text-xs font-sans font-normal tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <a
          href="tel:+39090710469"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
        >
          <Phone className="w-3.5 h-3.5 text-orange-500" />
          <span>090 71 0469</span>
        </a>
        <a
          href="mailto:librerianunnari@gmail.com"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
        >
          <Mail className="w-3.5 h-3.5 text-orange-500" />
          <span>librerianunnari@gmail.com</span>
        </a>
        <a
          href="https://wa.me/393276687839"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
        >
          {/* Official WhatsApp Logo SVG */}
          <svg 
            className="w-3.5 h-3.5 fill-orange-500" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.012 2.004c-5.513 0-10.002 4.49-10.002 10.002 0 1.83.497 3.626 1.44 5.21L2.006 22l4.916-1.412a9.96 9.96 0 0 0 5.09 1.418h.005c5.514 0 10.003-4.49 10.003-10.002a9.94 9.94 0 0 0-2.93-7.072 9.94 9.94 0 0 0-7.078-2.93zm0 1.636c4.614 0 8.366 3.75 8.367 8.366a8.307 8.307 0 0 1-2.453 5.922 8.307 8.307 0 0 1-5.914 2.456c-1.572 0-3.11-.427-4.453-1.236l-.32-.19-3.03.87.886-2.952-.208-.33a8.312 8.312 0 0 1-1.278-4.453c0-4.615 3.753-8.367 8.367-8.367zm-3.666 4.79c-.198-.01-.41-.01-.61-.01-.264 0-.69.1-.968.397-.333.357-1.272 1.242-1.272 3.03 0 1.788 1.3 3.514 1.48 3.755.182.242 2.56 3.91 6.2 5.485.867.375 1.543.598 2.068.764.928.295 1.77.253 2.44.153.745-.11 2.294-.744 2.62-1.46.326-.718.326-1.334.228-1.46-.098-.126-.358-.2-.797-.42-.44-.22-2.294-1.13-2.65-1.26-.358-.125-.617-.188-.876.2-.258.39-.997 1.257-1.222 1.517-.226.26-.452.29-.89.07-.44-.22-1.855-.683-3.535-2.18-1.306-1.163-2.188-2.6-2.446-3.04-.258-.44-.027-.678.19-.895.197-.196.44-.51.66-.765.22-.256.294-.438.44-.73.147-.293.073-.548-.037-.768-.11-.22-.968-2.333-1.327-3.2z"/>
          </svg>
          <span>327 66 87 839</span>
        </a>
      </div>
    </div>
  )
}
