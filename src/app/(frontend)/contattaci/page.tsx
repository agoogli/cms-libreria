import React from 'react'
import { Phone, MessageCircle, Mail } from 'lucide-react'

export const metadata = {
  title: 'Contattaci - Libreria Nunnari & Sfameni',
  description: 'Mettiti in contatto con noi: telefono, email e canali social.',
}

export default function ContattaciPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 flex flex-col">
      {/* Title with exact pt-3 page padding */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Contattaci
        </span>
      </div>

      {/* Catchy Subtitle matching home description style (text-xs) */}
      <p className="text-xs text-zinc-500 leading-relaxed font-sans opacity-95">
        Siamo sempre a tua disposizione per informazioni sulla disponibilità dei libri, le prenotazioni scolastiche e i consigli sugli acquisti. Scegli il metodo che preferisci.
      </p>

      {/* Grid of Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
        {/* Telephone */}
        <a
          href="tel:+39090710469"
          className="group flex flex-col items-center text-center p-5 bg-white rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all duration-300"
        >
          <div className="p-3 bg-orange-50 rounded-full text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
            <Phone className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-zinc-800 mt-3 font-sans">Telefono Fisso</span>
          <span className="text-xs text-zinc-600 mt-1 font-sans">090 71 0469</span>
          <span className="text-[10px] text-zinc-400 mt-2 font-sans group-hover:text-orange-500 transition-colors">Chiama ora</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/393276687839"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center text-center p-5 bg-white rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-green-500/40 transition-all duration-300"
        >
          <div className="p-3 bg-green-50 rounded-full text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-zinc-800 mt-3 font-sans">WhatsApp</span>
          <span className="text-xs text-zinc-600 mt-1 font-sans">327 66 87 839</span>
          <span className="text-[10px] text-zinc-400 mt-2 font-sans group-hover:text-green-500 transition-colors">Invia un messaggio</span>
        </a>

        {/* Email */}
        <a
          href="mailto:librerianunnari@gmail.com"
          className="group flex flex-col items-center text-center p-5 bg-white rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all duration-300"
        >
          <div className="p-3 bg-orange-50 rounded-full text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
            <Mail className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs text-zinc-800 mt-3 font-sans">E-mail</span>
          <span className="text-xs text-zinc-600 mt-1 font-sans break-all max-w-full px-1">librerianunnari@gmail.com</span>
          <span className="text-[10px] text-zinc-400 mt-2 font-sans group-hover:text-orange-500 transition-colors">Scrivici una mail</span>
        </a>
      </div>
    </div>
  )
}
