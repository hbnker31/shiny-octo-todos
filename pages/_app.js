import '../styles/globals.css'
import Script from 'next/script'
function MyApp({ Component, pageProps }) {
  <Script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0-beta1/js/bootstrap.min.js' />
  return <Component {...pageProps} />
}

export default MyApp
