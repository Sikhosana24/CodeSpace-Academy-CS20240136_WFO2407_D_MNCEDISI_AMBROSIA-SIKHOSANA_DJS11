import { Helmet } from "react-helmet-async"

export const MetaTags = () => {
  return (
    <Helmet>
      <title>AmbroCast - Improv Podcast Discovery</title>
      <meta
        name="description"
        content="Discover and listen to podcasts with AmbroCast. Improv-powered discovery, favorites, and instant play."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ambrocast.netlify.app/" />
      <meta property="og:title" content="AmbroCast - Improv Podcast Discovery" />
      <meta
        property="og:description"
        content="Discover and listen to podcasts with AmbroCast. Improv-powered discovery, favorites, and instant play."
      />
      <meta property="og:image" content="https://ambrocast.netlify.app/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ambrocast.netlify.app/" />
      <meta property="twitter:title" content="AmbroCast - Improv Podcast Discovery" />
      <meta
        property="twitter:description"
        content="Discover and listen to podcasts with AmbroCast. Improv-powered discovery, favorites, and instant play."
      />
      <meta property="twitter:image" content="https://ambrocast.netlify.app/og-image.jpg" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#0b0b12" />
    </Helmet>
  )
}

// export default MetaTags
