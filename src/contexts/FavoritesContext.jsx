import { createContext, useContext, useState, useEffect } from "react"
import { getStorageItem, setStorageItem } from "../services/storage"

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = await getStorageItem("favorites")
      if (savedFavorites) setFavorites(savedFavorites)
    }
    loadFavorites()
  }, [])

  useEffect(() => {
    setStorageItem("favorites", favorites)
  }, [favorites])

  const addFavorite = (episode) => {
    setFavorites((prev) => [
      ...prev,
      {
        ...episode,
        dateAdded: new Date().toISOString(),
      },
    ])
  }

  const removeFavorite = (episodeId) => {
    setFavorites((prev) => prev.filter((f) => f.id !== episodeId))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
