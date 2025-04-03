import React, { useContext } from 'react'
import { AuthContext } from '../contects/AuthProider'
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
  const {logout} = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  
  const handleLogout = () => {
    logout().then(() => {
      alert('Sign-out successfully!')
      navigate(from, {replace: true})
    }).catch((error) => {

    })
  }
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
      <button className='bg-blue-600 rounded text-white px-8 py-2' onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Logout