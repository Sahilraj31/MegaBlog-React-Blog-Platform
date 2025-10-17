import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect((userData) => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .catch((error)=> {
      console.error("Error fetching Current User : ", error)
      dispatch(logout())
    })
    .finally(()=> setLoading(false))
  })

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center min-h-screen bg-gray-400'>
      <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'>
        Loading....
      </div>
    </div>
  )
}

export default App
