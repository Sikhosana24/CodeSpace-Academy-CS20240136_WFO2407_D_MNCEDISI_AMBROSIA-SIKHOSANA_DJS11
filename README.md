# AmbroCast - Improv Podcast Discovery

AmbroCast is a modern podcast discovery and listening app built with React and Vite. It lets listeners browse, search, and play podcasts while an Improv Studio generates surprise mixes based on mood, energy, and chaos.

## Features

- **Improv Studio**: Mood, energy, and chaos controls to generate a surprise mix
- **Browse + Search**: Filter and fuzzy search across the catalog
- **Featured Carousel**: Rotating showcase of highlighted shows
- **Favorites**: Save and sort favorite episodes
- **Audio Player**: Full playback with progress tracking and resume
- **Responsive Design**: Optimized for desktop and mobile
- **Offline Fallback**: Cached shows display if the API is unavailable

## Technologies Used

- React
- Vite
- React Router
- React Helmet Async
- LocalForage (client-side storage)
- Axios
- React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser at `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

The build output is generated in the `dist` directory.

## Deployment (Netlify)

This project is ready for Netlify. Connect the GitHub repo and set:

- Build command: `npm run build`
- Publish directory: `dist`

For SPA routing, add a redirect rule to `netlify.toml` (optional):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
