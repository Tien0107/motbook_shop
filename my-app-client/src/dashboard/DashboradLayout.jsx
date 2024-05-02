import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu'


const DashboradLayout = () => {
  return (
    <div className='flex gap-4 flex-col md:flex-row'>
      <SideMenu />
      <Outlet />
    </div>
  )
}

export default DashboradLayout