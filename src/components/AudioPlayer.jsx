import { useEffect, useRef, useState } from "react"
import { useAudio } from "../contexts/AudioContext"
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import { ProgressBar } from "./ProgressBar"

export const AudioPlayer = () => {
  const { currentEpisode, isPlaying, setIsPlaying, updateProgress, getTimestamp } = useAudio()
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, setIsPlaying])

  useEffect(() => {
    if (!currentEpisode) return

    const audio = audioRef.current
    setCurrentTime(0)
    setDuration(0)
    audio.src =
      currentEpisode.file ||
      "https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3"
    audio.load()

    // Restore timestamp if available
    if (currentEpisode.id) {
      const { currentTime: savedTime } = getTimestamp(currentEpisode.id)
      if (savedTime > 0) {
        audio.currentTime = savedTime
      }
    }

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    }
  }, [currentEpisode, isPlaying, setIsPlaying, getTimestamp])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateAudioTime = () => setCurrentTime(audio.currentTime)
    const updateAudioDuration = () => setDuration(Number.isNaN(audio.duration) ? 0 : audio.duration)

    audio.addEventListener("timeupdate", updateAudioTime)
    audio.addEventListener("durationchange", updateAudioDuration)
    audio.addEventListener("loadedmetadata", updateAudioDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateAudioTime)
      audio.removeEventListener("durationchange", updateAudioDuration)
      audio.removeEventListener("loadedmetadata", updateAudioDuration)
    }
  }, [])

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (!currentEpisode) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="audio-player">
      <div className="player-controls">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="play-button"
          aria-label={isPlaying ? "Pause" : "Play"}
          type="button"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="episode-info">
          <h4>{currentEpisode.title}</h4>
          {currentEpisode.showTitle && <div className="episode-subtitle">{currentEpisode.showTitle}</div>}
          <div className="time-display" aria-live="polite">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <ProgressBar
            progress={progress}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percent = (e.clientX - rect.left) / rect.width
              if (audioRef.current && !isNaN(duration)) {
                audioRef.current.currentTime = percent * duration
              }
            }}
          />

          <audio
            ref={audioRef}
            preload="metadata"
            onTimeUpdate={(e) => {
              if (!e.target.duration || Number.isNaN(e.target.duration)) return
              const progress = (e.target.currentTime / e.target.duration) * 100
              if (currentEpisode && currentEpisode.id) {
                updateProgress(currentEpisode.id, progress, e.target.currentTime)
              }
            }}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        <div className="volume-controls">
          <button
            onClick={toggleMute}
            className="volume-button"
            aria-label={isMuted ? "Unmute" : "Mute"}
            type="button"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}
// CSS styles for the audio player
