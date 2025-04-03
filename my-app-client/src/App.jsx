import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import MyFooter from './homes/MyFooter'

function App() {

  return (
    <>
        <Navbar />
        <div className='min-h-screen'>
          <Outlet />
        </div>
        <MyFooter />
    </>
  )
}

export default App
