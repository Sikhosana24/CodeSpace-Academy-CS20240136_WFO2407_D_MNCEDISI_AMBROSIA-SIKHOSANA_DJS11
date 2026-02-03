import { useState, useEffect } from "react"
import { GENRE_OPTIONS } from "../utils/genres"

export const GenreFilter = ({ selectedGenres, onGenreChange }) => {
  const [allGenres, setAllGenres] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setAllGenres(GENRE_OPTIONS.map((genre) => genre.name))
  }, [])

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      onGenreChange(selectedGenres.filter((g) => g !== genre))
    } else {
      onGenreChange([...selectedGenres, genre])
    }
  }

  return (
    <div className="genre-filter">
      <button className="filter-toggle" onClick={() => setIsOpen(!isOpen)} type="button">
        Genres {selectedGenres.length > 0 && `(${selectedGenres.length})`}
      </button>

      {isOpen && (
        <div className="genre-dropdown">
          {allGenres.map((genre) => (
            <label key={genre} className="genre-option">
              <input type="checkbox" checked={selectedGenres.includes(genre)} onChange={() => toggleGenre(genre)} />
              {genre}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
