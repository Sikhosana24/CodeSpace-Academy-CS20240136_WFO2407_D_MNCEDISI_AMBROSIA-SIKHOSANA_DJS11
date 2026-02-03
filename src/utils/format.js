export const formatDate = (value) => {
  if (!value) return "Unknown"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Unknown"
  return date.toLocaleDateString()
}

export const formatDuration = (value) => {
  if (value === undefined || value === null) return "Unknown length"
  if (typeof value === "number" && Number.isFinite(value)) {
    const mins = Math.floor(value / 60)
    const secs = Math.floor(value % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value
  }
  return "Unknown length"
}
