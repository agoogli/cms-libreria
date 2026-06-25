'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Homepage', href: '/' },
    { name: 'La libreria', href: '/la-libreria' },
    { name: 'Dove siamo', href: '/dove-siamo' },
    { name: 'Contattaci', href: '/contattaci' },
    { name: 'Pagamenti', href: '/pagamenti' },
    { name: 'Spedizioni', href: '/spedizioni' },
  ]

  return (
    <header className="w-full bg-black text-white">
      {/* 80% width container on desktop */}
      <div className="w-full lg:w-[80%] mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col select-none group">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-orange-400 transition-colors duration-200">
            ANTIGRAVITÀ
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 -mt-1 font-sans">
            Libreria &amp; Cultura
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-zinc-300 hover:text-orange-400 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-900 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-orange-400 transition-colors duration-150 py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
