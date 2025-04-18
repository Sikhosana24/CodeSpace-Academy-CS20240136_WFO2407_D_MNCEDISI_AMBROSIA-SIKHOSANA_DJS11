import { GenreFilter } from "./GenreFilter"
import { SortDropdown } from "./SortDropdown"

export const Filters = ({ sortBy, onSortChange, selectedGenres, onGenreChange, sortOptions }) => {
  return (
    <div className="filters-container">
      <SortDropdown currentSort={sortBy} onSortChange={onSortChange} options={sortOptions} />
      <GenreFilter selectedGenres={selectedGenres} onGenreChange={onGenreChange} />
    </div>
  )
}
