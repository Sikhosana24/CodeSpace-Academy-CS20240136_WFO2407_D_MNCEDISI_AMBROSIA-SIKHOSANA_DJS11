import { Link } from "react-router-dom"

const ShowCard = ({ show }) => {
  // Add a default rating of 8 to match the design
  const rating = show.rating || 8

  return (
    <div className="show-card">
      <Link to={`/shows/${show.id}`}>
        <img src={show.image || "/placeholder.svg"} alt={show.title} className="show-image" />
        <div className="show-meta">
          <h3>{show.title}</h3>
          <p>Seasons: {show.seasons}</p>
          <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
          <div className="rating-badge">{rating}</div>
        </div>
      </Link>
    </div>
  )
}

export default ShowCard
