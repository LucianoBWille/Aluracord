import Head from 'next/head'
import appConfig from '../config.json'

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */

      /* Works on Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: ${appConfig.theme.colors.neutrals['500']}
          ${appConfig.theme.colors.neutrals['800']};
      }

      /* Works on Chrome, Edge, and Safari */
      *::-webkit-scrollbar {
        width: 8px;
      }

      *::-webkit-scrollbar-track,
      *::-webkit-scrollbar-track-piece,
      *::-webkit-scrollbar-corner {
        background: ${appConfig.theme.colors.neutrals['800']};
      }

      *::-webkit-scrollbar-thumb {
        background-color: ${appConfig.theme.colors.neutrals['500']};
        // border-radius: 20px;
        // border: 3px solid ${appConfig.theme.colors.neutrals['800']};
      }
    `}</style>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>LucianoBWille's Aluracord</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
