# Cartella Asset Statici (Libreria Antigravità)

Inserisci in questa directory tutti gli asset statici del sito, come il logo, icone o immagini locali.

## Esempio di utilizzo nel codice Next.js:
Se carichi qui un file chiamato `logo.svg` (quindi nel percorso `public/assets/logo.svg`), potrai utilizzarlo nei tuoi componenti in questo modo:

```tsx
import Image from 'next/image'

export function MioComponente() {
  return (
    <Image 
      src="/assets/logo.svg" 
      alt="Logo Libreria" 
      width={150} 
      height={50} 
    />
  )
}
```

*Nota: Next.js serve automaticamente tutti i file all'interno della cartella `public` alla radice del sito web.*
