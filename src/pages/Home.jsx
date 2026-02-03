import { useState, useEffect, useMemo } from "react"
import { fetchShows, fetchShow } from "../services/api"
import ShowCard from "../components/ShowCard"
import { Filters } from "../components/Filters"
import { LoadingSkeleton } from "../components/LoadingSkeleton"
import { SearchBar } from "../components/SearchBar"
import { FeaturedCarousel } from "../components/FeaturedCarousel"
import { fuzzySearch } from "../utils/fuzzySearch"
import { useAudio } from "../contexts/AudioContext"
import { ImprovStudio } from "../components/ImprovStudio"
import { normalizeGenres } from "../utils/genres"
import { normalizeText } from "../utils/text"
import { getStorageItem, setStorageItem } from "../services/storage"

const Home = () => {
  const [shows, setShows] = useState([])
  const [sortBy, setSortBy] = useState("title-asc")
  const [selectedGenres, setSelectedGenres] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [improvStatus, setImprovStatus] = useState("")
  const { setCurrentEpisode, setIsPlaying } = useAudio()

  const loadShows = async () => {
    setLoading(true)
    setError("")
    setWarning("")
    try {
      const { data } = await fetchShows()
      const showsWithRatings = data.map((show) => ({
        ...show,
        title: normalizeText(show.title),
        description: normalizeText(show.description),
        rating: Math.floor(Math.random() * 2) + 8,
        genreNames: normalizeGenres(show.genres),
        seasonsCount: show.seasons,
      }))
      setShows(showsWithRatings)
      await setStorageItem("cachedShows", showsWithRatings)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching shows:", error)
      const cachedShows = await getStorageItem("cachedShows")
      if (cachedShows?.length) {
        setShows(cachedShows)
        setWarning("Live data is unavailable. Showing saved shows.")
        setLoading(false)
        return
      }
      setError("Unable to load shows. Please refresh and try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    loadShows()
  }, [])

  useEffect(() => {
    if (!improvStatus || improvStatus.startsWith("Loading")) return
    const timer = setTimeout(() => setImprovStatus(""), 4000)
    return () => clearTimeout(timer)
  }, [improvStatus])

  const filteredShows = useMemo(() => {
    if (shows.length === 0) return []

    let filtered = searchTerm
      ? fuzzySearch(shows, searchTerm, ["title", "genreNames", "description"])
      : [...shows]

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((show) => show.genreNames.some((genre) => selectedGenres.includes(genre)))
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "date-new":
          return new Date(b.updated) - new Date(a.updated)
        case "date-old":
          return new Date(a.updated) - new Date(b.updated)
        default:
          return 0
      }
    })
  }, [sortBy, selectedGenres, shows, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const trendingShows = useMemo(() => {
    return [...shows].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 4)
  }, [shows])

  const deepCatalogShows = useMemo(() => {
    return [...shows].sort((a, b) => (b.seasonsCount || 0) - (a.seasonsCount || 0)).slice(0, 4)
  }, [shows])

  const handleImprovPlay = async (show) => {
    if (!show?.id) return
    setImprovStatus("Loading your surprise episode...")
    try {
      const { data: showDetail } = await fetchShow(show.id)

      if (!showDetail?.seasons?.length) {
        setImprovStatus("No episodes available for this show.")
        return
      }

      const randomSeason = showDetail.seasons[Math.floor(Math.random() * showDetail.seasons.length)]
      if (!randomSeason?.episodes?.length) {
        setImprovStatus("No episodes available for this show.")
        return
      }
      const randomEpisode = randomSeason.episodes[Math.floor(Math.random() * randomSeason.episodes.length)]

      const episodeId = `${showDetail.id}-s${randomSeason.season}-e${randomEpisode.episode}`
      setCurrentEpisode({
        id: episodeId,
        title: normalizeText(randomEpisode.title),
        description: normalizeText(randomEpisode.description),
        file: randomEpisode.file,
        showId: showDetail.id,
        seasonNumber: randomSeason.season,
        showTitle: normalizeText(showDetail.title),
      })
      setIsPlaying(true)
      setImprovStatus(`Now playing: ${normalizeText(showDetail.title)}`)
    } catch (err) {
      console.error("Error loading improv episode:", err)
      setImprovStatus("Unable to load a surprise episode. Please try again.")
    }
  }

  if (loading) return <LoadingSkeleton type="show" count={8} />
  if (error)
    return (
      <div className="error">
        <p>{error}</p>
        <button className="btn-secondary" type="button" onClick={loadShows}>
          Retry
        </button>
      </div>
    )

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">AmbroCast</p>
          <h1>Discover your next obsession in minutes</h1>
          <p className="hero-subtitle">
            Curated podcast discovery with a live improv engine. Search fast, save favorites, and let the mix surprise
            you.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#improv">
              Try Improv Mode
            </a>
            <a className="btn-secondary" href="#browse">
              Browse Shows
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-label">Shows</span>
              <span className="stat-value">{shows.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Genres</span>
              <span className="stat-value">9</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Improv Mix</span>
              <span className="stat-value">Live</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb" />
          <div className="hero-card">
            <h3>Tonight's Spotlight</h3>
            <p>Fresh drops with a touch of chaos. Let the show decide the next episode.</p>
            <div className="chip-row">
              <span className="chip">Fresh</span>
              <span className="chip">Curated</span>
              <span className="chip">Surprise</span>
            </div>
          </div>
        </div>
      </section>

      <ImprovStudio shows={shows} onPlaySurprise={handleImprovPlay} />
      {improvStatus && <div className="improv-status">{improvStatus}</div>}
      {warning && <div className="warning-banner">{warning}</div>}

      <section className="section">
        <div className="section-header">
          <h2>Trending now</h2>
          <p className="subtext">Fresh updates and big back catalogs, perfect for a deep listen.</p>
        </div>
        <div className="show-grid">
          {trendingShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>

      <FeaturedCarousel shows={shows} />

      <section className="section">
        <div className="section-header">
          <h2>Deep catalog picks</h2>
          <p className="subtext">Plenty of seasons to binge whenever you are ready.</p>
        </div>
        <div className="show-grid">
          {deepCatalogShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>

      <section id="browse" className="section">
        <div className="section-header">
          <h2>Browse everything</h2>
          <p className="subtext">Search, filter, and sort through the full library.</p>
        </div>
        <div className="search-and-filters">
          <SearchBar onSearch={handleSearch} />
          <Filters
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedGenres={selectedGenres}
            onGenreChange={setSelectedGenres}
          />
        </div>

        {searchTerm && (
          <div className="search-results-header">
            <h2>Search results for "{searchTerm}"</h2>
            <span>{filteredShows.length} shows found</span>
          </div>
        )}

        <div className="show-grid">
          {filteredShows.length > 0 ? (
            filteredShows.map((show) => <ShowCard key={show.id} show={show} />)
          ) : (
            <p className="no-results">No shows found matching your filters.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
