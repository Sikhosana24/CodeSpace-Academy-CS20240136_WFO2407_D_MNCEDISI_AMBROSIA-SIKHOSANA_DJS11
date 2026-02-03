import { useState } from "react"
import { FaSearch } from "react-icons/fa"

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="search"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        aria-label="Search podcasts"
        autoComplete="off"
        spellCheck="false"
      />
      {searchTerm && (
        <button
          className="search-clear"
          onClick={() => {
            setSearchTerm("")
            onSearch("")
          }}
          type="button"
          aria-label="Clear search"
        >
          x
        </button>
      )}
    </div>
  )
}
