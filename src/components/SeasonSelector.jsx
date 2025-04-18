"use client"

export const SeasonSelector = ({ seasons, selectedSeason, setSelectedSeason }) => {
  return (
    <div className="season-selector">
      {seasons.map((season) => (
        <button
          key={season.season}
          className={`season-btn ${season.season === selectedSeason ? "active" : ""}`}
          onClick={() => setSelectedSeason(season.season)}
        >
          Season {season.season}
        </button>
      ))}
    </div>
  )
}
