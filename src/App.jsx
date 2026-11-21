import { useState } from 'react'
import './App.css'

const categories = ['All games', 'Arcade', 'Action', 'Puzzle', 'Racing']

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All games')

  return (
    <div className="site-shell">
      <div className="notice-bar">A SMALL CORNER OF THE INTERNET FOR BIG TIME-WASTING. <span>✳</span> MADE FOR FUN.</div>

      <header className="topbar">
        <a className="brand" href="/" aria-label="El Chato Games home">
          <span className="brand-mark">EC!</span>
          <span>el chato <strong>games</strong></span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="nav-active" href="#home">home</a>
          <a href="#library">the games</a>
          <a href="#about">about</a>
        </nav>
        <a className="header-button" href="#library">go play ↓</a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">HEY. YOU LOOK BORED.</div>
            <h1>Got a minute?<br /><em>Lose an hour.</em></h1>
            <p className="hero-copy">A growing pile of games to play when you should probably be doing something else.</p>
            <form className="search-form" onSubmit={(event) => event.preventDefault()}>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input aria-label="Search games" type="search" placeholder="Find something to play..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <button type="submit">find it</button>
            </form>
            <p className="search-hint">Free to play. No downloads. No weird stuff.</p>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="sticker">EL CHATO<br /><b>ARCADE</b></div>
            <div className="handheld">
              <div className="screen"><span>PRESS<br />START</span><i>▶</i></div>
              <div className="controls"><span className="dpad">✚</span><span className="buttons">●　●</span></div>
            </div>
            <span className="scribble scribble-one">✳</span>
            <span className="scribble scribble-two">★</span>
            <span className="art-note">PLAYER 1<br />IS THAT YOU?</span>
          </div>
          <div className="hero-bottom"><span>NO ACCOUNT NEEDED</span><span>JUST PICK A GAME</span><span>EST. 2026</span></div>
        </section>

        <section className="library-section" id="library">
          <div className="section-heading">
            <div>
              <div className="section-kicker">TAKE YOUR PICK</div>
              <h2>The <span>game shelf.</span></h2>
            </div>
            <span className="game-count">CURRENTLY GETTING STOCKED <b>↙</b></span>
          </div>
          <div className="category-row" aria-label="Filter games by category">
            {categories.map((category) => (
              <button className={activeCategory === category ? 'category-chip selected' : 'category-chip'} key={category} onClick={() => setActiveCategory(category)} type="button">
                {category}
              </button>
            ))}
          </div>
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">☻</div>
            <div className="empty-kicker">WELL, THIS IS AWKWARD</div>
            <h3>{search ? 'Nothing by that name.' : 'The shelves are still empty.'}</h3>
            <p>{search
              ? <>We couldn't find “{search}”. Try again once more games arrive.</>
              : 'We’re adding the first games right now. Pop back soon — this place won’t stay quiet for long.'}</p>
            <span className="coming-soon">FIRST GAMES COMING SOON</span>
          </div>
        </section>
      </main>

      <footer id="about">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">EC!</span><span>el chato <strong>games</strong></span></a>
        <span>Made with a keyboard and questionable free time.</span>
        <span>© 2026</span>
      </footer>
    </div>
  )
}

export default App
