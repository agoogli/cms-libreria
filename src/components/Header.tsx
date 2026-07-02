'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'La libreria', href: '/la-libreria' },
    { name: 'Dove siamo', href: '/dove-siamo' },
    { name: 'Settori', href: '/settori' },
    { name: 'Carta docente', href: '/carta-docente' },
    { name: 'Carte cultura', href: '/carte-cultura' },
    { name: 'Contattaci', href: '/contattaci' },
  ]

  return (
    <header className="w-full bg-transparent text-zinc-900">
      {/* 60% width container on desktop, relative positioning for absolute mobile menu positioning */}
      <div className="w-full lg:w-[60%] mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Mobile menu button (left aligned, normal flow, z-index to stay above content) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none z-30 relative"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6 pointer-events-none" />
        </button>

        {/* Logo (Centered on mobile, left-aligned on desktop) */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex md:block justify-center z-20">
          <Link href="/" className="flex items-center select-none">
            <Image
              src="/assets/logo.png"
              alt="Libreria Antigravità"
              width={180}
              height={50}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-zinc-700 hover:text-orange-600 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-600 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer (Slides in from the left to the right) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Dark backdrop overlay with fade transition */}
          <div
            className="fixed inset-0 bg-black/45 transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Menu Panel sliding in from left to right */}
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col p-6 z-50 border-r border-zinc-200 animate-in slide-in-from-left duration-300 ease-in-out">
            {/* Header of Drawer */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans font-bold text-xs tracking-widest uppercase text-orange-600">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 transition-colors"
                aria-label="Chiudi menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-zinc-800 hover:text-orange-600 transition-colors py-2.5 border-b border-zinc-100 last:border-0 font-sans"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
