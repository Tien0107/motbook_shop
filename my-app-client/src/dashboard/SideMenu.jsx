import React, { useContext } from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import userImg from "../assets/profile.jpg"
import { AuthContext } from '../contects/AuthProider';

const SideMenu = () => {
  const {user} = useContext(AuthContext)
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo href="/" img={user?.photoURL} imgAlt="Flowbite logo" className='w-16 h-12 rounded'>
       {
        user?.displayName || "Demo User"
       }
      </Sidebar.Logo>
    <div>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="/admin/dashboard" icon={HiChartPie} className='mt-4 hover:bg-gray-200'>
         <p className='ml-3'>DashBoard</p>
        </Sidebar.Item>
        <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload} className='mt-3 hover:bg-gray-200'>
          <p className='ml-3'>
            Upload Book
          </p>
        </Sidebar.Item>
        <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox} className=' mt-3 hover:bg-gray-200'>
          <p className='ml-3'>
            Manage Books
          </p>
        </Sidebar.Item>
        <Sidebar.Item href="/admin/dashboard/profile" icon={HiUser} className=' mt-3 hover:bg-gray-200'>
          <p className='ml-3'>
            User
          </p>
        </Sidebar.Item>
        <Sidebar.Item href="/admin/dashboard/details" icon={HiShoppingBag} className=' mt-3 hover:bg-gray-200'>
          <p className='ml-3'>
            Details
          </p>
        </Sidebar.Item>
        <Sidebar.Item href="/login" icon={HiArrowSmRight} className=' mt-3 hover:bg-gray-200'>
          <p className='ml-3'>
            Sign In
          </p>
        </Sidebar.Item>
        <Sidebar.Item href="/logout" icon={HiTable} className='mt-3 hover:bg-gray-200'>
          <p className='ml-3'>
            Log Out
          </p>
        </Sidebar.Item>
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="#" icon={HiChartPie} className='mt-3 hover:bg-gray-200'>
          <p className='ml-3'>Upgrade to Pro</p>
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiViewBoards} className='mt-3  hover:bg-gray-200'>
          <p className='ml-3'>Documentation</p>
        </Sidebar.Item>
        <Sidebar.Item href="/" icon={HiSupport} className='mt-3  hover:bg-gray-200'>
          <p className='ml-3'>Home</p>
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
    </div>
  </Sidebar>
  )
}

export default SideMenu