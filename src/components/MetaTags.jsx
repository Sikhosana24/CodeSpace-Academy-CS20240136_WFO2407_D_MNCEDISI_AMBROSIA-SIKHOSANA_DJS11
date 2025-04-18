import { Helmet } from "react-helmet"

export const MetaTags = () => {
  return (
    <Helmet>
      <title>AmbroCast - Discover Amazing Podcasts</title>
      <meta
        name="description"
        content="Discover and listen to amazing podcasts on AmbroCast. Your new favorite podcast app."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ambrocast.netlify.app/" />
      <meta property="og:title" content="AmbroCast - Discover Amazing Podcasts" />
      <meta
        property="og:description"
        content="Discover and listen to amazing podcasts on AmbroCast. Your new favorite podcast app."
      />
      <meta property="og:image" content="https://ambrocast.netlify.app/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ambrocast.netlify.app/" />
      <meta property="twitter:title" content="AmbroCast - Discover Amazing Podcasts" />
      <meta
        property="twitter:description"
        content="Discover and listen to amazing podcasts on AmbroCast. Your new favorite podcast app."
      />
      <meta property="twitter:image" content="https://ambrocast.netlify.app/og-image.jpg" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

// export default MetaTags
