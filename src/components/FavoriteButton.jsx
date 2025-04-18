import { useEffect, useState } from "react"
import { useFavorites } from "../contexts/FavoritesContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"

export const FavoriteButton = ({ episode, showId, seasonNumber }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(favorites.some((f) => f.id === episode.id))
  }, [favorites, episode.id])

  const handleToggle = () => {
    if (isFavorite) {
      removeFavorite(episode.id)
    } else {
      addFavorite({ ...episode, showId, seasonNumber })
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}
