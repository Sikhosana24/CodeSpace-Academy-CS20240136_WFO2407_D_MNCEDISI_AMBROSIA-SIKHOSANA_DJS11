import { FaPlay, FaCheck, FaPause } from "react-icons/fa"
import { useAudio } from "../contexts/AudioContext"
import { FavoriteButton } from "./FavoriteButton"
import { ProgressBar } from "./ProgressBar"
import { formatDuration, formatDate } from "../utils/format"
import { normalizeText } from "../utils/text"

const EpisodeCard = ({ episode, showId, seasonNumber, showTitle }) => {
  const { setCurrentEpisode, setIsPlaying, currentEpisode, history, getTimestamp, isPlaying } = useAudio()

  const episodeProgress = history.find((h) => h.episodeId === episode.id)?.progress || 0
  const isCompleted = episodeProgress > 95
  const isCurrentlyPlaying = currentEpisode && currentEpisode.id === episode.id

  // Get saved timestamp
  const { currentTime, lastUpdated } = getTimestamp(episode.id) || { currentTime: 0, lastUpdated: null }

  const formatTimestamp = (seconds) => {
    if (!seconds) return "Not started"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const formatLastPlayed = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return `Last played: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
  }

  const handlePlay = () => {
    if (isCurrentlyPlaying) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentEpisode({
        ...episode,
        showId,
        seasonNumber,
        showTitle,
      })
      setIsPlaying(true)
    }
  }

  return (
    <div className="episode-card">
      <div className="episode-header">
        <h3 className="episode-title">{normalizeText(episode.title)}</h3>
        <FavoriteButton episode={episode} showId={showId} seasonNumber={seasonNumber} showTitle={showTitle} />
      </div>

      <p className="episode-description">{normalizeText(episode.description)}</p>

      {episodeProgress > 0 && episodeProgress < 95 && (
        <>
          <ProgressBar progress={episodeProgress} />
          {currentTime > 0 && (
            <div className="timestamp-info">
              <span className="timestamp">Timestamp: {formatTimestamp(currentTime)}</span>
              <span className="last-played">{formatLastPlayed(lastUpdated)}</span>
            </div>
          )}
        </>
      )}

      <div className="episode-footer">
        <div className="episode-meta">
          <span>{formatDate(episode.date)}</span>
          <span>{formatDuration(episode.duration)}</span>
          {isCompleted && (
            <span className="episode-completed">
              <FaCheck /> Completed
            </span>
          )}
        </div>

        <button onClick={handlePlay} className="play-episode-btn" type="button">
          {isCurrentlyPlaying ? (
            <>
              <FaPause /> Pause
            </>
          ) : (
            <>
              <FaPlay /> Play
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default EpisodeCard
