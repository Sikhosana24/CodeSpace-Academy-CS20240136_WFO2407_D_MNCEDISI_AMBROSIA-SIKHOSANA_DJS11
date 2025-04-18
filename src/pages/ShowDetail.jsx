import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchShow } from "../services/api"
import { SeasonSelector } from "../components/SeasonSelector"
import { EpisodeList } from "../components/EpisodeList"
import { LoadingSkeleton } from "../components/LoadingSkeleton"

const ShowDetail = () => {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchShow(id)
      .then(({ data }) => {
        setShow(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching show details:", err)
        setError("Failed to load show details. Please try again later.")
        setLoading(false)
      })
  }, [id])

  if (loading) return <LoadingSkeleton type="episode" count={5} />
  if (error) return <div className="error">{error}</div>
  if (!show) return <div className="error">Show not found</div>

  const currentSeason = show.seasons.find((s) => s.season === selectedSeason)

  return (
    <div className="show-detail">
      <Link to="/" className="back-link">
        ← Back to Shows
      </Link>

      <img src={show.image || "/placeholder.svg"} alt={show.title} className="show-banner" />
      <h1>{show.title}</h1>
      <p className="description">{show.description}</p>

      <div className="show-meta">
        <p>Seasons: {show.seasons.length}</p>
        <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
        <div className="genres">
          {show.genres.map((genre) => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <SeasonSelector seasons={show.seasons} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />

      <div className="season-info">
        <h2>Season {selectedSeason}</h2>
        <p>{currentSeason.episodes.length} Episodes</p>
        {currentSeason.image && (
          <img
            src={currentSeason.image || "/placeholder.svg"}
            alt={`Season ${selectedSeason}`}
            className="season-image"
          />
        )}
      </div>

      <EpisodeList episodes={currentSeason.episodes} showId={id} seasonNumber={selectedSeason} showTitle={show.title} />
    </div>
  )
}

export default ShowDetail
