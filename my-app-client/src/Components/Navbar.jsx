import { useEffect, useState } from 'react'
import { FaBarsStaggered, FaBlog, FaXmark, FaUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import useAuthStore from '../features/auth/stores/authStore';

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {user, logout} = useAuthStore()
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false);
    navigate('/')
  }

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100){
        setIsSticky(true);
      }
      else{
        setIsSticky(false);
      }
    }
    window.addEventListener("scroll",handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    }
  }, []);
  
  // nav items
  const navItems = [
    {link: "Home",path: '/'},
    {link: "About",path: '/about'},
    {link: "Shop",path: '/shop'},
    {link: "Cart",path: '/cart'},  // Thêm Cart
    {link: "Sell Your Book",path: '/admin/dashboard'},
    {link: "Blog",path: '/blog'}
  ]
  return (
    <header  className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
        {/* logo */}
        <div className='flex justify-between items-center text-base gap-8'>
          <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog  className='inline-block'/>Books</Link>

          {/*Nav items for large devices*/}

          <ul className='md:flex space-x-12 hidden'>
            {
              navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
            }
          </ul>
          <div className='space-x-12 hidden lg:flex items-center'>
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <FaShoppingCart className="w-5 h-5 text-black hover:text-blue-700" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </Link>
                <div className="relative">
                  <button 
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 text-black hover:text-blue-700"
                  >
                    <FaUser className="w-5 h-5"/>
                    <span>{user.username}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative">
                  <FaShoppingCart className="w-5 h-5 text-black hover:text-blue-700" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </Link>
                <Link to="/login" className="text-black hover:text-blue-700">
                  Login
                </Link>
              </>
            )}
            <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
          </div>

          {/* menu btn for the mobile devices */}

          <div className='md:hidden'>
            <button  onClick={toggleMenu} className='text-black focus:outline-none'>
              {
                isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5 w-5 text-black'/>
              }
            </button>
          </div>
        </div> 
        {/*navItems for  small devices*/}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {
            navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>)
          }
          {user ? (
            <>
              <Link to="/profile" className='block text-base text-white uppercase cursor-pointer'>Profile</Link>
              <button onClick={handleLogout} className='block text-base text-white uppercase cursor-pointer'>Logout</button>
            </>
          ) : (
            <Link to="/login" className='block text-base text-white uppercase cursor-pointer'>Login</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar