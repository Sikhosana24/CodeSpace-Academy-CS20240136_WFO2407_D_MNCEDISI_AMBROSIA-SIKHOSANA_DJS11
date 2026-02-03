export const SeasonSelector = ({ seasons, selectedSeason, setSelectedSeason }) => {
  return (
    <div className="season-selector">
      {seasons.map((season) => (
        <button
          key={season.season}
          className={`season-btn ${season.season === selectedSeason ? "active" : ""}`}
          onClick={() => setSelectedSeason(season.season)}
          type="button"
        >
          Season {season.season}
        </button>
      ))}
    </div>
  )
}
