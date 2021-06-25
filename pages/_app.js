import '../styles/globals.css'
import Link from "next/link";

// This file encompasses the entire nextJS app

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="header">
        <div>
          <Link href="/">
            <a> Your Kitchen 👨🏼‍🍳 </a>
          </Link>
        </div>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
