export const GENRE_OPTIONS = [
  { id: 1, name: "Personal Growth" },
  { id: 2, name: "True Crime" },
  { id: 3, name: "History" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Entertainment" },
  { id: 6, name: "Business" },
  { id: 7, name: "Fiction" },
  { id: 8, name: "News" },
  { id: 9, name: "Kids and Family" },
]

export const GENRE_MAP = GENRE_OPTIONS.reduce((acc, genre) => {
  acc[genre.id] = genre.name
  return acc
}, {})

export const getGenreName = (genre) => {
  if (typeof genre === "number") {
    return GENRE_MAP[genre] || `Genre ${genre}`
  }
  if (typeof genre === "string") {
    return genre
  }
  return "Unknown"
}

export const normalizeGenres = (genres = []) => genres.map(getGenreName)
