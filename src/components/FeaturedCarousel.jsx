import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { normalizeText } from "../utils/text"

export const FeaturedCarousel = ({ shows }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [featuredShows, setFeaturedShows] = useState([])

  useEffect(() => {
    if (shows && shows.length > 0) {
      // Select 5 random shows for the featured carousel
      const shuffled = [...shows].sort(() => 0.5 - Math.random())
      setFeaturedShows(shuffled.slice(0, 5))
      setCurrentIndex(0)
    }
  }, [shows])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredShows.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredShows.length) % featuredShows.length)
  }

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    if (featuredShows.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredShows.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredShows.length])

  if (featuredShows.length === 0) return null

  return (
    <div className="featured-carousel">
      <h2 className="featured-title">Featured Podcasts</h2>
      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={prevSlide}
          aria-label="Previous featured show"
          type="button"
        >
          <FaChevronLeft />
        </button>

        <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {featuredShows.map((show) => (
            <div key={show.id} className="carousel-slide">
              <Link to={`/shows/${show.id}`} className="carousel-link">
                <div className="carousel-content">
                  <img
                    src={show.image || "/placeholder.svg"}
                    alt={normalizeText(show.title)}
                    className="carousel-image"
                  />
                  <div className="carousel-info">
                    <h3>{normalizeText(show.title)}</h3>
                    <p className="carousel-description">{normalizeText(show.description)?.substring(0, 120)}...</p>
                    <div className="carousel-genres">
                      {(show.genreNames || show.genres || []).slice(0, 3).map((genre) => (
                        <span key={genre} className="genre-tag">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          className="carousel-button next"
          onClick={nextSlide}
          aria-label="Next featured show"
          type="button"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="carousel-indicators">
        {featuredShows.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to featured slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
