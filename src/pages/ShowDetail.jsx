import { useState, useEffect, useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchShow } from "../services/api"
import { SeasonSelector } from "../components/SeasonSelector"
import { EpisodeList } from "../components/EpisodeList"
import { LoadingSkeleton } from "../components/LoadingSkeleton"
import { normalizeText } from "../utils/text"
import { formatDate } from "../utils/format"
import { normalizeGenres } from "../utils/genres"

const ShowDetail = () => {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchShow(id)
      .then(({ data }) => {
        const normalizedShow = {
          ...data,
          title: normalizeText(data.title),
          description: normalizeText(data.description),
          genres: normalizeGenres(data.genres),
        }
        setShow(normalizedShow)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching show details:", err)
        setError("Failed to load show details. Please try again later.")
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    if (show?.seasons?.length) {
      setSelectedSeason(show.seasons[0].season)
    }
  }, [show])

  if (loading) return <LoadingSkeleton type="episode" count={5} />
  if (error) return <div className="error">{error}</div>
  if (!show) return <div className="error">Show not found</div>

  const currentSeason = useMemo(() => {
    if (!show?.seasons?.length) return null
    return show.seasons.find((season) => season.season === selectedSeason) || show.seasons[0]
  }, [show, selectedSeason])

  const episodesWithIds = useMemo(() => {
    if (!currentSeason?.episodes?.length) return []
    return currentSeason.episodes.map((episode) => ({
      ...episode,
      id: `${show.id}-s${currentSeason.season}-e${episode.episode}`,
      title: normalizeText(episode.title),
      description: normalizeText(episode.description),
    }))
  }, [currentSeason, show?.id])

  return (
    <div className="show-detail">
      <Link to="/" className="back-link">
        &larr; Back to Shows
      </Link>

      <img src={show.image || "/placeholder.svg"} alt={show.title} className="show-banner" />
      <h1>{show.title}</h1>
      <p className="description">{show.description}</p>

      <div className="show-meta">
        <p>Seasons: {show.seasons.length}</p>
        <p>Last Updated: {formatDate(show.updated)}</p>
        <div className="genres">
          {show.genres.map((genre) => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <SeasonSelector
        seasons={show.seasons}
        selectedSeason={currentSeason?.season}
        setSelectedSeason={setSelectedSeason}
      />

      <div className="season-info">
        <h2>Season {currentSeason?.season}</h2>
        <p>{currentSeason?.episodes?.length || 0} Episodes</p>
        {currentSeason?.image && (
          <img
            src={currentSeason.image || "/placeholder.svg"}
            alt={`Season ${currentSeason.season}`}
            className="season-image"
          />
        )}
      </div>

      <EpisodeList
        episodes={episodesWithIds}
        showId={id}
        seasonNumber={currentSeason?.season}
        showTitle={show.title}
      />
    </div>
  )
}

export default ShowDetail
