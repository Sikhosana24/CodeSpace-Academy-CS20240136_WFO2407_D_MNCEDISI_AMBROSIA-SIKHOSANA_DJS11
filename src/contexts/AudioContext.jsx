import { createContext, useContext, useState, useEffect } from "react"
import { getStorageItem, setStorageItem } from "../services/storage"

const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [history, setHistory] = useState([])
  const [timestamps, setTimestamps] = useState({})

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await getStorageItem("listeningHistory")
      if (savedHistory) setHistory(savedHistory)

      const savedTimestamps = await getStorageItem("episodeTimestamps")
      if (savedTimestamps) setTimestamps(savedTimestamps)
    }
    loadHistory()
  }, [])

  useEffect(() => {
    setStorageItem("listeningHistory", history)
  }, [history])

  useEffect(() => {
    setStorageItem("episodeTimestamps", timestamps)
  }, [timestamps])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault()
        e.returnValue = "Audio is currently playing. Are you sure you want to leave?"
        return e.returnValue
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isPlaying])

  const updateProgress = (episodeId, newProgress, currentTime = 0) => {
    setHistory((prev) => [
      ...prev.filter((item) => item.episodeId !== episodeId),
      { episodeId, progress: newProgress, timestamp: new Date() },
    ])

    // Save the exact timestamp
    setTimestamps((prev) => ({
      ...prev,
      [episodeId]: {
        currentTime,
        lastUpdated: new Date().toISOString(),
      },
    }))
  }

  const getTimestamp = (episodeId) => {
    return timestamps[episodeId] || { currentTime: 0, lastUpdated: null }
  }

  const resetHistory = () => {
    setHistory([])
    setTimestamps({})
  }

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        progress,
        history,
        timestamps,
        setCurrentEpisode,
        setIsPlaying,
        updateProgress,
        getTimestamp,
        resetHistory,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => useContext(AudioContext)
