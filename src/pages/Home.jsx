import { useState, useEffect } from "react"
import { fetchShows } from "../services/api"
import ShowCard from "../components/ShowCard"
import { Filters } from "../components/Filters"
import { LoadingSkeleton } from "../components/LoadingSkeleton"
import { SearchBar } from "../components/SearchBar"
import { FeaturedCarousel } from "../components/FeaturedCarousel"
import { fuzzySearch } from "../utils/fuzzySearch"

const Home = () => {
  const [shows, setShows] = useState([])
  const [filteredShows, setFilteredShows] = useState([])
  const [sortBy, setSortBy] = useState("title-asc")
  const [selectedGenres, setSelectedGenres] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShows()
      .then(({ data }) => {
        // Add a sample rating to each show
        const showsWithRatings = data.map((show) => ({
          ...show,
          rating: Math.floor(Math.random() * 3) + 7, // Random rating between 7-9
        }))
        setShows(showsWithRatings)
        setFilteredShows(showsWithRatings)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching shows:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (shows.length === 0) return

    // First apply search if there is a search term
    let filtered = shows

    if (searchTerm) {
      filtered = fuzzySearch(shows, searchTerm, ["title", "genres", "description"])
    }

    // Then apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((show) => show.genres.some((genre) => selectedGenres.includes(genre)))
    }

    // Finally apply sorting
    filtered.sort((a, b) => {
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

    setFilteredShows(filtered)
  }, [sortBy, selectedGenres, shows, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  if (loading) return <LoadingSkeleton type="show" count={8} />

  return (
    <main>
      <FeaturedCarousel shows={shows} />

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
          <h2>Search Results for "{searchTerm}"</h2>
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
    </main>
  )
}

export default Home
// Add CSS styles for the new components in your CSS file