export interface MockBook {
  id: number
  titolo: string
  autore?: string | null
  prezzo: number
  imgCopertina?: {
    url: string
    alt: string
  } | null
}

export const mockBooks: MockBook[] = [
  {
    id: 1,
    titolo: "Il Nome della Rosa",
    autore: "Umberto Eco",
    prezzo: 16.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1033/400/600",
      alt: "Il Nome della Rosa di Umberto Eco"
    }
  },
  {
    id: 2,
    titolo: "1984",
    autore: "George Orwell",
    prezzo: 14.50,
    imgCopertina: {
      url: "https://picsum.photos/id/1073/400/600",
      alt: "1984 di George Orwell"
    }
  },
  {
    id: 3,
    titolo: "Il Barone Rampante",
    autore: "Italo Calvino",
    prezzo: 12.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1025/400/600",
      alt: "Il Barone Rampante di Italo Calvino"
    }
  },
  {
    id: 4,
    titolo: "Il Maestro e Margherita",
    autore: "Michail Bulgakov",
    prezzo: 15.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1015/400/600",
      alt: "Il Maestro e Margherita di Michail Bulgakov"
    }
  },
  {
    id: 5,
    titolo: "La Divina Commedia",
    autore: "Dante Alighieri",
    prezzo: 22.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1062/400/600",
      alt: "La Divina Commedia di Dante Alighieri"
    }
  },
  {
    id: 6,
    titolo: "Cent'anni di Solitudine",
    autore: "Gabriel García Márquez",
    prezzo: 18.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1043/400/600",
      alt: "Cent'anni di Solitudine di Gabriel García Márquez"
    }
  },
  {
    id: 7,
    titolo: "Se questo è un uomo",
    autore: "Primo Levi",
    prezzo: 13.50,
    imgCopertina: {
      url: "https://picsum.photos/id/1050/400/600",
      alt: "Se questo è un uomo di Primo Levi"
    }
  },
  {
    id: 8,
    titolo: "Il Fu Mattia Pascal",
    autore: "Luigi Pirandello",
    prezzo: 11.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1029/400/600",
      alt: "Il Fu Mattia Pascal di Luigi Pirandello"
    }
  },
  {
    id: 9,
    titolo: "Le Tigri di Mompracem",
    autore: "Emilio Salgari",
    prezzo: 9.90,
    imgCopertina: {
      url: "https://picsum.photos/id/1031/400/600",
      alt: "Le Tigri di Mompracem di Emilio Salgari"
    }
  },
  {
    id: 10,
    titolo: "L'Aleph",
    autore: "Jorge Luis Borges",
    prezzo: 14.00,
    imgCopertina: {
      url: "https://picsum.photos/id/1041/400/600",
      alt: "L'Aleph di Jorge Luis Borges"
    }
  },
  {
    id: 11,
    titolo: "Le Città Invisibili",
    autore: "Italo Calvino",
    prezzo: 12.50,
    imgCopertina: {
      url: "https://picsum.photos/id/1044/400/600",
      alt: "Le Città Invisibili di Italo Calvino"
    }
  },
  {
    id: 12,
    titolo: "Don Chisciotte della Mancia",
    autore: "Miguel de Cervantes",
    prezzo: 19.50,
    imgCopertina: {
      url: "https://picsum.photos/id/1059/400/600",
      alt: "Don Chisciotte della Mancia di Miguel de Cervantes"
    }
  }
];
