"use client"

import { useEffect, useState } from "react"
import { useFavorites } from "../contexts/FavoritesContext"
import EpisodeCard from "../components/EpisodeCard" // This is correct - importing the default export
import { SortDropdown } from "../components/SortDropdown"

const Favorites = () => {
  const { favorites } = useFavorites()
  const [sortedFavorites, setSortedFavorites] = useState([])
  const [sortBy, setSortBy] = useState("date-added")

  useEffect(() => {
    const sorted = [...favorites].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "date-added":
          return new Date(b.dateAdded) - new Date(a.dateAdded)
        case "date-added-old":
          return new Date(a.dateAdded) - new Date(b.dateAdded)
        default:
          return 0
      }
    })
    setSortedFavorites(sorted)
  }, [favorites, sortBy])

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Favorites ({favorites.length})</h1>
        <SortDropdown
          currentSort={sortBy}
          onSortChange={setSortBy}
          options={[
            { value: "date-added", label: "Recently Added" },
            { value: "date-added-old", label: "Oldest Added" },
            { value: "title-asc", label: "Title A-Z" },
            { value: "title-desc", label: "Title Z-A" },
          ]}
        />
      </div>

      <div className="favorites-grid">
        {sortedFavorites.length > 0 ? (
          sortedFavorites.map((fav) => (
            <EpisodeCard key={fav.id} episode={fav} showId={fav.showId} seasonNumber={fav.seasonNumber} />
          ))
        ) : (
          <p className="no-favorites">You haven't added any favorites yet.</p>
        )}
      </div>
    </div>
  )
}

export default Favorites
