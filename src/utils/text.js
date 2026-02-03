const REPLACEMENTS = [
  ["â", "'"],
  ["â", "'"],
  ["â", "\""],
  ["â", "\""],
  ["â", "-"],
  ["â", "-"],
  ["â¦", "..."],
  ["Â ", " "],
  ["Â©", "(c)"],
  ["Â", ""],
  ["Ã©", "e"],
  ["Ã¨", "e"],
  ["Ãª", "e"],
  ["Ã¡", "a"],
  ["Ã ", "a"],
  ["Ã¢", "a"],
  ["Ã­", "i"],
  ["Ã³", "o"],
  ["Ã¶", "o"],
  ["Ãº", "u"],
  ["Ã¼", "u"],
  ["Ã±", "n"],
  ["&amp;", "&"],
  ["&quot;", "\""],
  ["&#39;", "'"],
  ["&apos;", "'"],
]

export const normalizeText = (value) => {
  if (typeof value !== "string") return value
  let normalized = value
  REPLACEMENTS.forEach(([from, to]) => {
    normalized = normalized.split(from).join(to)
  })
  return normalized
}
