import { useState } from 'react'
import './App.css'

const categories = ['All games', 'Arcade', 'Action', 'Puzzle', 'Racing']

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All games')

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="El Chato Games home">
          <span className="brand-mark">EC</span>
          <span>EL CHATO <strong>GAMES</strong></span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="nav-active" href="#home">Home</a>
          <a href="#library">Games</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-button" href="#library">PLAY NOW <span aria-hidden="true">↗</span></a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow"><span className="status-dot" /> YOUR NEW FAVOURITE DISTRACTION</div>
            <h1>THE ARCADE<br />IS <span>OPEN.</span></h1>
            <p className="hero-copy">Big games. Zero downloads. Questionable amounts of fun.</p>
            <form className="search-form" onSubmit={(event) => event.preventDefault()}>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input aria-label="Search games" type="search" placeholder="Search for a game..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <button type="submit">SEARCH</button>
            </form>
            <p className="search-hint">No downloads. No fuss. Just press play.</p>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="arcade-card card-back">★</div>
            <div className="arcade-card card-front">
              <span className="card-top">INSERT COIN</span>
              <span className="pixel-face">:)</span>
              <span className="card-bottom">PLAYER 01</span>
            </div>
            <span className="spark spark-one">✳</span>
            <span className="spark spark-two">✦</span>
            <span className="spark spark-three">+</span>
          </div>
          <div className="hero-bottom"><span>EST. 2026</span><span>BUILT FOR THE BORED</span><span>SCROLL LESS. PLAY MORE.</span></div>
        </section>

        <section className="library-section" id="library">
          <div className="section-heading">
            <div>
              <div className="section-kicker">THE GOOD STUFF</div>
              <h2>FIND YOUR <span>NEXT GAME.</span></h2>
            </div>
            <span className="game-count">GAME LIBRARY <b>01 / SOON</b></span>
          </div>
          <div className="category-row" aria-label="Filter games by category">
            {categories.map((category) => (
              <button className={activeCategory === category ? 'category-chip selected' : 'category-chip'} key={category} onClick={() => setActiveCategory(category)} type="button">
                {category}
              </button>
            ))}
          </div>
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">＋</div>
            <div className="empty-kicker">IT'S A LITTLE QUIET IN HERE</div>
            <h3>{search ? 'NO GAMES FOUND. YET.' : 'THE GAMES ARE LOADING...'}</h3>
            <p>{search
              ? <>We couldn't find “{search}”. Try another search when the library is ready.</>
              : 'We’re setting up the arcade. Check back soon for games worth procrastinating over.'}</p>
            <span className="coming-soon">FIRST DROP: COMING SOON</span>
          </div>
        </section>
      </main>

      <footer id="about">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">EC</span><span>EL CHATO <strong>GAMES</strong></span></a>
        <span>THE INTERNET'S MOST QUESTIONABLE ARCADE.</span>
        <span>© 2026 EL CHATO GAMES</span>
      </footer>
    </div>
  )
}

export default App
