import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthPage from './pages/AuthPage'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sessions from './pages/Sessions'
import Offers from './pages/Offers'
import Navbar from './components/navbar/Navbar'
import AboutUs from './pages/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>        
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/sessoes' element={<Sessions/>}></Route>
        <Route path='/promocoes' element={<Offers/>}></Route>
        <Route path='/sobre' element={<AboutUs/>}></Route>
      </Routes>
    </>
  )
}

export default App
