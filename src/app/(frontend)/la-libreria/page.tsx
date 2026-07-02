'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const photos = [
  '/assets/foto-libreria/1.jpg',
  '/assets/foto-libreria/2.jpg',
  '/assets/foto-libreria/3.jpg',
  '/assets/foto-libreria/4.jpg',
  '/assets/foto-libreria/5.jpg',
]

export default function LaLibreriaPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-8 flex flex-col gap-3">
      {/* Title with exact pt-3 page padding and mb-3 title margin */}
      <div className="mb-3 text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          La Nostra Storia
        </span>
      </div>

      {/* Left-aligned Slideshow with transparent card background */}
      <div className="relative w-full max-w-xl aspect-[3/2] rounded-xl overflow-hidden bg-transparent flex items-center justify-start self-start">
        {photos.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Interni Libreria ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={`object-contain transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            priority={index === 0}
          />
        ))}

        {/* Slide Indicator dots centered within the slideshow layout */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-orange-500' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Visualizza foto ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* Compact History Text with text-xs, color matching the homepage and reset paragraph vertical margins */}
      <div className="w-full flex flex-col gap-2 text-xs text-zinc-600 leading-relaxed font-sans opacity-95 [&_p]:my-0 mt-2">
        <p>
          Dal lontano 1932 la Libreria Nunnari e Sfameni è presente a Messina nella storica sede di Via Cannizzaro al centro della città, a due passi dall’università centrale e dal tribunale.
        </p>
        <p>
          Fondata dai Sig.ri Pasquale Sfameni e Rosario Nunnari, la ditta è stata rilevata nel 1982 da Rocco Guglielmo e successivamente trasferita ai figli, ed è una delle librerie più antiche della città e di tutta la Sicilia.
        </p>
        <p>
          La libreria è da generazioni punto di riferimento per tantissimi studenti sia universitari che scolastici.
        </p>
      </div>
    </div>
  )
}
