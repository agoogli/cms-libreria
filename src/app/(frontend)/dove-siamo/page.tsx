import React from 'react'

export const metadata = {
  title: 'Dove Siamo - Libreria Nunnari & Sfameni',
  description: 'Vieni a trovarci a Messina in Via T. Cannizzaro 112.',
}

export default function DoveSiamoPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Title */}
      <div className="w-full text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Dove Siamo
        </span>
      </div>

      {/* Description matching home page card description size & color */}
      <div className="text-[11px] text-zinc-600 leading-relaxed font-sans opacity-95">
        <p className="font-bold text-zinc-800 text-xs mb-1">Libreria Nunnari &amp; Sfameni</p>
        <p>Via Tommaso Cannizzaro 112, 98122 Messina</p>
        <p className="mt-2 text-zinc-500">Ci troviamo a due passi dal tribunale e dall'università centrale, facilmente raggiungibile a piedi o con i mezzi pubblici.</p>
      </div>

      {/* Map Embed Card */}
      <div className="w-full overflow-hidden rounded-xl border border-zinc-200/80 shadow-md bg-white p-2">
        <iframe
          title="Mappa Libreria Nunnari & Sfameni"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3135.5397441584994!2d15.54924767675549!3d38.19163297188737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1314349635b7ec3b%3A0xc3f60b457e5e3fd!2sVia%20Tommaso%20Cannizzaro%2C%20112%2C%2098122%20Messina%20ME%2C%20Italy!5e0!3m2!1sen!2sit!4v1719600000000!5m2!1sen!2sit"
          className="w-full h-80 sm:h-96 rounded-lg border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
