'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

interface Settore {
  id: string | number
  nome: string
}

export function Header({ settori = [] }: { settori?: Settore[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)

  const links = [
    { name: 'Accedi', href: '/accedi' },
    { name: 'La libreria', href: '/la-libreria' },
    { name: 'Dove siamo', href: '/dove-siamo' },
    { name: 'Settori', href: '/settori', isDropdown: true },
    { name: 'Carta docente', href: '/carta-docente' },
    { name: 'Carte cultura', href: '/carte-cultura' },
    { name: 'Contattaci', href: '/contattaci' },
  ]

  return (
    <header className="w-full bg-transparent text-zinc-900 relative">
      {/* Fixed max-width container for desktop */}
      <div className="w-full max-w-[1152px] mx-auto px-4 py-3 flex items-center justify-between">
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
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex md:block justify-center z-20 shrink-0">
          <Link href="/" className="flex items-center select-none shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Libreria Nunnari & Sfameni"
              width={180}
              height={50}
              className="h-8 sm:h-9 w-auto object-contain shrink-0"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-7 shrink-0">
          {links.map((link) => {
            if (link.isDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setIsDesktopDropdownOpen(true)}
                  onMouseLeave={() => setIsDesktopDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                    className="text-sm font-medium tracking-wide text-zinc-700 hover:text-orange-600 transition-colors duration-200 cursor-pointer flex items-center gap-1 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-600 group-hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-600 transition-transform duration-300 ${
                        isDesktopDropdownOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>
                </div>
              )
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-zinc-700 hover:text-orange-600 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Megamenu Full Width Dropdown (Positioned relative to full header width) */}
      <div
        onMouseEnter={() => setIsDesktopDropdownOpen(true)}
        onMouseLeave={() => setIsDesktopDropdownOpen(false)}
        className={`absolute top-full left-0 right-0 w-full bg-white border-y border-zinc-200 shadow-xl transition-all duration-300 z-50 py-8 px-6 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-[''] ${
          isDesktopDropdownOpen
            ? 'opacity-100 visible pointer-events-auto translate-y-0'
            : 'opacity-0 invisible pointer-events-none -translate-y-1'
        }`}
      >
        <div className="w-full max-w-[1152px] mx-auto grid grid-cols-4 gap-6 px-4">
          {settori.map((settore: any) => {
            const slug = settore.slug || (settore.nome ? settore.nome.toLowerCase().replace(/\s+/g, '-') : '')
            const displayName = settore.nomeVisualizzato || settore.nome
            return (
              <Link
                key={settore.id}
                href={`/settori/${slug}`}
                className="text-sm font-semibold text-zinc-700 hover:text-orange-600 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-orange-50 font-sans"
                onClick={() => setIsDesktopDropdownOpen(false)}
              >
                {displayName}
              </Link>
            )
          })}
          {settori.length === 0 && (
            <div className="col-span-4 text-center text-xs text-zinc-400 font-sans py-4">
              Nessun settore disponibile.
            </div>
          )}
        </div>
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
            <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
              {links.map((link) => {
                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="flex flex-col border-b border-zinc-100 py-1.5">
                      <button
                        type="button"
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="w-full text-base font-semibold text-zinc-800 hover:text-orange-600 transition-colors py-1.5 font-sans flex justify-between items-center text-left"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180 text-orange-600' : ''}`} />
                      </button>

                      {mobileDropdownOpen && (
                        <div className="flex flex-col pl-4 gap-1 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          {settori.map((settore: any) => {
                            const slug = settore.slug || (settore.nome ? settore.nome.toLowerCase().replace(/\s+/g, '-') : '')
                            return (
                              <Link
                                key={settore.id}
                                href={`/settori/${slug}`}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-zinc-600 hover:text-orange-600 transition-colors py-2 font-sans"
                              >
                                {settore.nome}
                              </Link>
                            )
                          })}
                          {settori.length === 0 && (
                            <span className="text-xs text-zinc-400 py-1 font-sans">Nessun settore disponibile.</span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold text-zinc-800 hover:text-orange-600 transition-colors py-3 border-b border-zinc-100 last:border-0 font-sans"
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
