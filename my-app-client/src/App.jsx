import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MyFooter from './pages/homes/MyFooter';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet /> {/* 👉 Route con sẽ hiển thị ở đây */}
      </div>
      <MyFooter />
    </>
  );
}

export default App;
