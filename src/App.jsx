import { useEffect, useRef, useState } from 'react'
import './App.css'

const categories = ['All games', 'Arcade', 'Action', 'Puzzle', 'Racing']
const GRID_SIZE = 20
const START_SNAKE = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }]

function SnakeGame({ onBack }) {
  const [snake, setSnake] = useState(START_SNAKE)
  const [food, setFood] = useState({ x: 14, y: 10 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [status, setStatus] = useState('ready')
  const [score, setScore] = useState(0)
  const directionRef = useRef(direction)

  useEffect(() => { directionRef.current = direction }, [direction])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keys = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      }
      const next = keys[event.key]
      if (!next) return
      event.preventDefault()
      const current = directionRef.current
      if (!(next.x === -current.x && next.y === -current.y)) {
        directionRef.current = next
        setDirection(next)
      }
      if (status === 'ready') setStatus('playing')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [status])

  useEffect(() => {
    if (status !== 'playing') return undefined
    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = {
          x: currentSnake[0].x + directionRef.current.x,
          y: currentSnake[0].y + directionRef.current.y,
        }
        const eating = head.x === food.x && head.y === food.y
        const body = eating ? currentSnake : currentSnake.slice(0, -1)
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE ||
          body.some((part) => part.x === head.x && part.y === head.y)) {
          setStatus('over')
          return currentSnake
        }
        const nextSnake = [head, ...currentSnake]
        if (!eating) nextSnake.pop()
        else {
          setScore((value) => value + 1)
          setFood(() => {
            let nextFood
            do {
              nextFood = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) }
            } while (nextSnake.some((part) => part.x === nextFood.x && part.y === nextFood.y))
            return nextFood
          })
        }
        return nextSnake
      })
    }, 125)
    return () => window.clearInterval(timer)
  }, [status, food])

  const restart = () => {
    setSnake(START_SNAKE)
    setFood({ x: 14, y: 10 })
    directionRef.current = { x: 1, y: 0 }
    setDirection({ x: 1, y: 0 })
    setScore(0)
    setStatus('playing')
  }

  return (
    <section className="snake-page">
      <div className="snake-topline">
        <button className="back-button" onClick={onBack}>← back to games</button>
        <span className="snake-label">EL CHATO ORIGINAL · #001</span>
      </div>
      <div className="snake-heading">
        <div><div className="section-kicker">A CLASSIC, WITH A TWIST</div><h2>El Chato <span>Snake.</span></h2></div>
        <div className="snake-score"><small>SCORE</small><strong>{score.toString().padStart(3, '0')}</strong></div>
      </div>
      <div className="snake-layout">
        <div className="snake-board-wrap">
          <div className="snake-board" role="img" aria-label="Snake game board">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
              const x = index % GRID_SIZE
              const y = Math.floor(index / GRID_SIZE)
              const snakeIndex = snake.findIndex((part) => part.x === x && part.y === y)
              const isFood = food.x === x && food.y === y
              return <div key={index} className={snakeIndex === 0 ? 'snake-cell snake-head' : snakeIndex > 0 ? 'snake-cell snake-body' : isFood ? 'snake-cell snake-food' : 'snake-cell'} />
            })}
            {status !== 'playing' && (
              <div className="snake-overlay">
                <strong>{status === 'over' ? 'GAME OVER' : 'READY?'}</strong>
                <span>{status === 'over' ? 'That was a good run.' : 'Grab the snacks. Avoid yourself.'}</span>
                <button onClick={restart}>{status === 'over' ? 'play again' : 'start game'}</button>
              </div>
            )}
          </div>
          <div className="snake-board-foot"><span>↑ ↓ ← → or WASD</span><span>DON'T HIT THE WALL</span></div>
        </div>
        <aside className="snake-instructions">
          <div className="instruction-sticker">PLAYER 1<br /><b>GO!</b></div>
          <h3>How to play</h3>
          <p>Eat the little red squares to grow. The longer you get, the harder it gets.</p>
          <ul><li>Arrow keys or WASD to move</li><li>Don't hit the walls</li><li>Don't run into yourself</li></ul>
          <button className="restart-button" onClick={restart}>↻ restart run</button>
        </aside>
      </div>
    </section>
  )
}


const games = [
  {
    id: 'snake',
    title: 'El Chato Snake',
    description: 'Eat. Grow. Try not to bonk into yourself.',
    category: 'Arcade',
    type: 'local',
    component: SnakeGame,
  },
  // Add browser games here with type: 'embed' and a playable game URL.
]

function GamePlayer({ game, onBack }) {
  if (game.type === 'embed') {
    return (
      <section className="embedded-game-page">
        <div className="snake-topline">
          <button className="back-button" onClick={onBack}>← back to games</button>
          <span className="snake-label">EL CHATO GAMES · NOW PLAYING</span>
        </div>
        <div className="embedded-game-heading">
          <div><div className="section-kicker">{game.category}</div><h2>{game.title}</h2></div>
          <button className="fullscreen-button" onClick={() => document.querySelector('.embedded-game-frame')?.requestFullscreen?.()}>⛶ fullscreen</button>
        </div>
        <div className="embedded-game-frame">
          <iframe
            src={game.url}
            title={game.title}
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="embed-note">This game is hosted by another website. If it doesn't load, that site may not allow embedding.</p>
      </section>
    )
  }

  const LocalGame = game.component
  return <LocalGame onBack={onBack} />
}

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All games')
  const [selectedGame, setSelectedGame] = useState(null)

  const showSnake = !search.trim() || 'el chato snake snake arcade'.includes(search.trim().toLowerCase())
  const showGame = activeCategory === 'All games' || activeCategory === 'Arcade'

  return (
    <div className="site-shell">
      <div className="notice-bar">A SMALL CORNER OF THE INTERNET FOR BIG TIME-WASTING. <span>✳</span> MADE FOR FUN.</div>
      <header className="topbar">
        <a className="brand" href="/" aria-label="El Chato Games home"><span className="brand-mark">EC!</span><span>el chato <strong>games</strong></span></a>
        <nav className="top-nav" aria-label="Main navigation"><a className="nav-active" href="#home">home</a><a href="#library">the games</a><a href="#about">about</a></nav>
        <a className="header-button" href="#library">go play ↓</a>
      </header>
      <main id="home">
        {selectedGame ? <GamePlayer game={selectedGame} onBack={() => setSelectedGame(null)} /> : <>
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
              <div className="handheld"><div className="screen"><span>PRESS<br />START</span><i>▶</i></div><div className="controls"><span className="dpad">✚</span><span className="buttons">●　●</span></div></div>
              <span className="scribble scribble-one">✳</span><span className="scribble scribble-two">★</span><span className="art-note">PLAYER 1<br />IS THAT YOU?</span>
            </div>
            <div className="hero-bottom"><span>NO ACCOUNT NEEDED</span><span>JUST PICK A GAME</span><span>EST. 2026</span></div>
          </section>
          <section className="library-section" id="library">
            <div className="section-heading"><div><div className="section-kicker">TAKE YOUR PICK</div><h2>The <span>game shelf.</span></h2></div><span className="game-count">{games.length} GAME{games.length === 1 ? '' : 'S'} ON THE SHELF <b>↙</b></span></div>
            <div className="category-row" aria-label="Filter games by category">
              {categories.map((category) => <button className={activeCategory === category ? 'category-chip selected' : 'category-chip'} key={category} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
            </div>
            {showSnake && showGame ? (
              <button className="game-card" onClick={() => setSelectedGame(games[0])} type="button">
                <div className="game-card-art"><div className="pixel-snake"><i /><i /><i /><i /><b /></div><span className="game-number">NO. 001</span><span className="play-stamp">PLAY ↗</span></div>
                <div className="game-card-info"><div><h3>El Chato Snake</h3><p>Eat. Grow. Try not to bonk into yourself.</p></div><span className="game-tag">ARCADE</span></div>
              </button>
            ) : (
              <div className="empty-state"><div className="empty-icon" aria-hidden="true">☻</div><div className="empty-kicker">NOTHING HERE (YET)</div><h3>{search ? 'No games found.' : 'No games in this section.'}</h3><p>{search ? <>We couldn't find “{search}”. Try another search.</> : 'More games are on the way. Check back soon.'}</p><button className="clear-filters" onClick={() => { setSearch(''); setActiveCategory('All games') }}>show all games</button></div>
            )}
          </section>
        </>}
      </main>
      <footer id="about"><a className="brand footer-brand" href="#home"><span className="brand-mark">EC!</span><span>el chato <strong>games</strong></span></a><span>Made with a keyboard and questionable free time.</span><span>© 2026</span></footer>
    </div>
  )
}

export default App
