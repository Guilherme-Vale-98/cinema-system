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
import Footer from './components/footer/Footer'
import SessionDetails from './components/sessionDetails/SessionDetails'
import Account from './pages/Account'
import UserProfile from './pages/UserProfile'
import { useAppSelector } from './redux/hooks'
import { RootState } from './redux/store'
import AdminProfile from './pages/AdminProfile'

function App() {
  const user = useAppSelector((state: RootState) => state.userState.user);
  
  return (
    <>        
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/sessoes' element={<Sessions/>}></Route>
        <Route path='/promocoes' element={<Offers/>}></Route>
        <Route path='/sobre' element={<AboutUs/>}></Route>
        <Route path='/conta' element={<Account/>}></Route>
        <Route path='/perfil' 
            element={user?.roles.includes("ROLE_ADMIN")? <AdminProfile/> : <UserProfile/>}></Route>
        <Route path="/sessoes/:movieTitle/:sessionId" element={<SessionDetails/>} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
