"use client"

export const SortDropdown = ({ currentSort, onSortChange, options }) => {
  const defaultOptions = [
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
    { value: "date-new", label: "Recently Updated" },
    { value: "date-old", label: "Oldest Updated" },
  ]

  const sortOptions = options || defaultOptions

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
