import MainLayout from './layout/MainLayout/MainLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import { useEffect, useState } from 'react'

function App() {

  const [check, setCheck] = useState(true)

  const checkOrientation = () => {
    if (window.innerWidth < window.innerHeight) {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }

  useEffect(() => {
    checkOrientation()
    window.addEventListener('resize', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
    }
  }, [])

  if (check) return (
    <div
      style={{ backgroundImage: 'url(/khongtuoc-mb.jpg)' }}
      className="h-dvh w-dvw bg-top bg-cover"
    >
      <div className="size-full bg-black/80 grid place-content-center">
        <img className='h-[40dvh]' src="rotate.gif" alt="" />
      </div>
    </div>
  )

  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/game' element={<Game />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
