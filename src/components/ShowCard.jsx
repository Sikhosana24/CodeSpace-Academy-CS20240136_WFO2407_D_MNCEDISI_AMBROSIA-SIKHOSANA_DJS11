import { Link } from "react-router-dom"
import { FaPlay } from "react-icons/fa"
import { formatDate } from "../utils/format"
import { normalizeText } from "../utils/text"

const ShowCard = ({ show, variant = "default", onQuickPlay }) => {
  const rating = show.rating || 8
  const genres = (show.genreNames || show.genres || []).slice(0, 3)

  return (
    <div className={`show-card ${variant === "improv" ? "show-card-improv" : ""}`}>
      <Link to={`/shows/${show.id}`} className="show-card-link">
        <div className="show-card-media">
          <img src={show.image || "/placeholder.svg"} alt={normalizeText(show.title)} className="show-image" />
          {variant === "improv" && (
            <div className="improv-reason">
              {show.improvReason || "Improv pick"}
            </div>
          )}
        </div>
        <div className="show-meta">
          <h3>{normalizeText(show.title)}</h3>
          <div className="show-details">
            <span>{show.seasonsCount || show.seasons} seasons</span>
            <span>Updated {formatDate(show.updated)}</span>
          </div>
          <div className="show-genres">
            {genres.map((genre) => (
              <span key={`${show.id}-${genre}`} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
          <div className="rating-badge">{rating}</div>
        </div>
      </Link>
      {variant === "improv" && (
        <button className="btn-improv-play" onClick={onQuickPlay} type="button">
          <FaPlay /> Quick Play
        </button>
      )}
    </div>
  )
}

export default ShowCard
