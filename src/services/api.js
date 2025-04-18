import axios from "axios"

const API_BASE = "https://podcast-api.netlify.app"

export const fetchShows = () => axios.get(`${API_BASE}/shows`)
export const fetchShow = (id) => axios.get(`${API_BASE}/id/${id}`)
export const fetchGenre = (id) => axios.get(`${API_BASE}/genre/${id}`)
