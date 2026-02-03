const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const createRng = (seed) => {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export const IMPROV_MOODS = [
  { id: "focus", label: "Focus", genres: ["Business", "History", "Personal Growth", "News"] },
  { id: "laughs", label: "Laughs", genres: ["Comedy", "Entertainment"] },
  { id: "mystery", label: "Mystery", genres: ["True Crime", "History"] },
  { id: "cozy", label: "Cozy", genres: ["Kids and Family", "Fiction", "Personal Growth"] },
  { id: "bold", label: "Bold", genres: ["News", "True Crime", "Business"] },
]

const ENERGY_GENRES = {
  high: ["Comedy", "Entertainment", "News", "True Crime"],
  low: ["History", "Personal Growth", "Kids and Family", "Fiction"],
}

const getRecencyScore = (updated) => {
  if (!updated) return 0.2
  const days = Math.max(1, (Date.now() - new Date(updated).getTime()) / 86400000)
  return clamp(1 / (1 + days / 45), 0, 1)
}

const getSeasonScore = (seasons) => clamp((seasons || 1) / 20, 0.2, 1)

const pickReason = ({ moodLabel, genreMatch, recencyScore, seasonScore }) => {
  if (genreMatch > 0) return `Mood match: ${moodLabel}`
  if (recencyScore > 0.65) return "Freshly updated"
  if (seasonScore > 0.7) return "Deep catalog"
  return "Left-field discovery"
}

export const buildImprovMix = (shows, options = {}) => {
  const {
    moodId = "focus",
    energy = 55,
    chaos = 35,
    size = 6,
    seed = Date.now(),
  } = options

  const mood = IMPROV_MOODS.find((item) => item.id === moodId) || IMPROV_MOODS[0]
  const rng = createRng(seed)
  const energyWeight = clamp(energy / 100, 0, 1)
  const chaosWeight = clamp(chaos / 100, 0, 1)

  const scored = (shows || []).map((show) => {
    const genres = show.genreNames || show.genres || []
    const genreMatch = genres.filter((genre) => mood.genres.includes(genre)).length
    const energyGenres = energyWeight > 0.55 ? ENERGY_GENRES.high : ENERGY_GENRES.low
    const energyMatch = genres.filter((genre) => energyGenres.includes(genre)).length

    const recencyScore = getRecencyScore(show.updated)
    const seasonScore = getSeasonScore(show.seasonsCount || show.seasons || 1)
    const genreScore = mood.genres.length ? genreMatch / mood.genres.length : 0
    const energyScore = energyGenres.length ? energyMatch / energyGenres.length : 0
    const chaosScore = rng() * chaosWeight

    const totalScore =
      recencyScore * 0.35 +
      seasonScore * 0.2 +
      genreScore * 0.25 +
      energyScore * 0.15 +
      chaosScore * 0.25

    return {
      ...show,
      improvScore: totalScore,
      improvReason: pickReason({
        moodLabel: mood.label,
        genreMatch,
        recencyScore,
        seasonScore,
      }),
    }
  })

  return scored
    .sort((a, b) => b.improvScore - a.improvScore)
    .slice(0, size)
}
