import EpisodeCard from "./EpisodeCard"

export const EpisodeList = ({ episodes, showId, seasonNumber, showTitle }) => {
  if (!episodes || episodes.length === 0) {
    return <div className="no-episodes">No episodes available</div>
  }

  return (
    <div className="episode-list">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          showId={showId}
          seasonNumber={seasonNumber}
          showTitle={showTitle}
        />
      ))}
    </div>
  )
}
