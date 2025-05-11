import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCard from '../pages/homes/BannerCard';

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Đã tìm kiếm:", searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* Phần bên trái */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>
            Mua và Bán Sách <span className='text-blue-700'>với Giá Tốt Nhất</span>
          </h2>
          <p className='md:w-4/5'>
            Sách là người bạn thầm lặng và bền vững nhất; chúng dễ tiếp cận, khôn ngoan và kiên nhẫn trong việc dạy dỗ chúng ta.
          </p>
          <form onSubmit={handleSearch} className="flex">
            <input
              type='search'
              name='search'
              id='search'
              placeholder='Tìm kiếm sách...'
              className='py-2 px-4 rounded-l-sm outline-none border border-gray-300'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-r-sm'
            >
              Tìm kiếm
            </button>
          </form>
        </div>
        
        {/* Phần bên phải */}
        <div className='mr-15'>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;