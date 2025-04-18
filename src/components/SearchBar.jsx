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
        type="text"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {searchTerm && (
        <button
          className="search-clear"
          onClick={() => {
            setSearchTerm("")
            onSearch("")
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
