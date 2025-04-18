export const LoadingSkeleton = ({ type = "show", count = 4 }) => {
  if (type === "show") {
    return (
      <div className="show-grid">
        {Array(count)
          .fill()
          .map((_, index) => (
            <div key={index} className="show-card skeleton">
              <div className="skeleton-image" style={{ height: "200px" }}></div>
              <div className="skeleton-title" style={{ height: "24px", width: "80%", margin: "10px 0" }}></div>
              <div className="skeleton-meta" style={{ height: "16px", width: "60%", margin: "5px 0" }}></div>
              <div className="skeleton-meta" style={{ height: "16px", width: "40%", margin: "5px 0" }}></div>
            </div>
          ))}
      </div>
    )
  }

  if (type === "episode") {
    return (
      <div className="episode-list">
        {Array(count)
          .fill()
          .map((_, index) => (
            <div key={index} className="episode-card skeleton">
              <div className="skeleton-title" style={{ height: "24px", width: "90%", margin: "10px 0" }}></div>
              <div className="skeleton-description" style={{ height: "60px", width: "100%", margin: "10px 0" }}></div>
              <div className="skeleton-footer" style={{ height: "20px", width: "70%", margin: "10px 0" }}></div>
            </div>
          ))}
      </div>
    )
  }

  return null
}
