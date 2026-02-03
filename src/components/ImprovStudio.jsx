import { useMemo, useState } from "react"
import { FaBolt, FaDice, FaPlay } from "react-icons/fa"
import ShowCard from "./ShowCard"
import { buildImprovMix, IMPROV_MOODS } from "../utils/improv"

export const ImprovStudio = ({ shows, onPlaySurprise }) => {
  const [moodId, setMoodId] = useState("focus")
  const [energy, setEnergy] = useState(55)
  const [chaos, setChaos] = useState(35)
  const [seed, setSeed] = useState(Date.now())

  const improvMix = useMemo(
    () => buildImprovMix(shows, { moodId, energy, chaos, seed, size: 6 }),
    [shows, moodId, energy, chaos, seed],
  )

  return (
    <section id="improv" className="improv-studio">
      <div className="improv-header">
        <div>
          <p className="eyebrow">Improv Studio</p>
          <h2>Let the vibe lead the playlist</h2>
          <p className="subtext">
            Dial in a mood, spin the chaos, and let AmbroCast improvise a surprise mix tuned to your energy.
          </p>
        </div>
        <div className="improv-actions">
          <button className="btn-secondary" onClick={() => setSeed(Date.now())} type="button">
            <FaDice /> Regenerate
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              if (improvMix[0]) onPlaySurprise(improvMix[0])
            }}
            type="button"
          >
            <FaPlay /> Play Surprise
          </button>
        </div>
      </div>

      <div className="improv-controls">
        <label className="control-card">
          <span>Mood</span>
          <select value={moodId} onChange={(e) => setMoodId(e.target.value)}>
            {IMPROV_MOODS.map((mood) => (
              <option key={mood.id} value={mood.id}>
                {mood.label}
              </option>
            ))}
          </select>
        </label>
        <label className="control-card">
          <span>Energy</span>
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
          />
          <div className="control-meta">
            <span>Chill</span>
            <FaBolt />
            <span>Charged</span>
          </div>
        </label>
        <label className="control-card">
          <span>Chaos</span>
          <input
            type="range"
            min="0"
            max="100"
            value={chaos}
            onChange={(e) => setChaos(Number(e.target.value))}
          />
          <div className="control-meta">
            <span>Safe</span>
            <span>Wild</span>
          </div>
        </label>
      </div>

      <div className="improv-grid">
        {improvMix.length > 0 ? (
          improvMix.map((show) => (
            <ShowCard key={show.id} show={show} variant="improv" onQuickPlay={() => onPlaySurprise(show)} />
          ))
        ) : (
          <p className="no-results">Load the catalog to start improvising.</p>
        )}
      </div>
    </section>
  )
}
