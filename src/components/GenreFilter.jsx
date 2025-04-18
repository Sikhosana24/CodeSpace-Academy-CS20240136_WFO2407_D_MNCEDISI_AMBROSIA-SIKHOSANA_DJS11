"use client"

import { useState, useEffect } from "react"

export const GenreFilter = ({ selectedGenres, onGenreChange }) => {
  const [allGenres, setAllGenres] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Hardcoded genres - in a real app, these would come from the API
    setAllGenres([
      "Personal Growth",
      "True Crime",
      "History",
      "Comedy",
      "Entertainment",
      "Business",
      "Fiction",
      "News",
      "Kids and Family",
    ])
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
      <button className="filter-toggle" onClick={() => setIsOpen(!isOpen)}>
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
