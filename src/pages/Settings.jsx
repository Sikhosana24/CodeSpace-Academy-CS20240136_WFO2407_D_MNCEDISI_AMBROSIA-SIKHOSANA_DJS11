import { useState } from "react"
import { useAudio } from "../contexts/AudioContext"
import { useFavorites } from "../contexts/FavoritesContext"

const Settings = () => {
  const { resetHistory, history } = useAudio()
  const { favorites } = useFavorites()
  const [resetConfirm, setResetConfirm] = useState(false)

  const handleResetHistory = () => {
    if (resetConfirm) {
      resetHistory()
      setResetConfirm(false)
    } else {
      setResetConfirm(true)
    }
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Listening History</h2>
        <p>You have listened to {history.length} episodes.</p>

        <button onClick={handleResetHistory} className={resetConfirm ? "btn-danger" : "btn-outline"}>
          {resetConfirm ? "Confirm Reset History" : "Reset Listening History"}
        </button>

        {resetConfirm && (
          <p className="confirm-text">This will remove all your listening progress. This action cannot be undone.</p>
        )}
      </div>

      <div className="settings-section">
        <h2>Favorites</h2>
        <p>You have {favorites.length} favorite episodes.</p>
      </div>

      <div className="settings-section">
        <h2>About AmbroCast</h2>
        <p>Version 1.0.0</p>
        <p>(c) 2026 AmbroCast</p>
      </div>
    </div>
  )
}

export default Settings
