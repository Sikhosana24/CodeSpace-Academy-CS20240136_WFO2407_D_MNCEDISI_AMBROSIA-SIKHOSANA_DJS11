# AmbroCast - Podcast Discovery App

AmbroCast is a modern podcast discovery and listening application built with React and Vite. It allows users to browse, search, and listen to a variety of podcasts.

## Features

- **Browse Podcasts**: Discover podcasts from various genres
- **Search Functionality**: Find podcasts by title with fuzzy search support
- **Featured Carousel**: Rotating showcase of featured podcasts
- **Favorites**: Save your favorite episodes for easy access
- **Audio Player**: Listen to episodes with a full-featured audio player
- **Progress Tracking**: Resume episodes from where you left off
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React
- Vite
- React Router
- LocalForage for client-side storage
- Axios for API requests
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`
   git clone 
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To build the app for production:

\`\`\`
npm run build
\`\`\`

The build files will be in the `dist` directory.

## Deployment

This project is set up for easy deployment to Netlify. Simply connect your GitHub repository to Netlify and it will automatically deploy when you push changes.

\`\`\`

## Now, let's create a netlify.toml configuration file

```toml file="netlify.toml"
# netlify.toml

[build]
  command = "npm run build"
  publish = "dist"

# Redirect all routes to index.html for SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Set cache headers for assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Environment variables can be set here or in the Netlify UI
[build.environment]
  NODE_VERSION = "18"
