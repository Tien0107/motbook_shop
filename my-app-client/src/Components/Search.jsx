import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { searchBooks } from '../features/search/services/searchService';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      console.log('Đang tìm kiếm với từ khóa:', query);
      
      searchBooks(query)
        .then(data => {
          console.log('Kết quả nhận được:', data);
          setSearchResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Chi tiết lỗi:', err);
          setError(err.message || 'Không thể tìm kiếm kết quả');
          setSearchResults([]);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h1 className="text-5xl my-12 font-bold text-center">Kết quả tìm kiếm cho <span>"{query}"</span></h1>
      
      {loading && <p className="text-center">Đang tìm kiếm...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {searchResults.length > 0 ? (
        <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
          {searchResults.map(book => (
            <Card key={book._id} className="shadow-2xl w-60">
              <img
                src={book.images && book.images[0]?.url || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="w-full h-60 object-cover"
              />
              <h5 className="text-lg font-bold tracking-tight text-gray-900 mx-3 mt-2">
                {book.title}
              </h5>
              <p className="font-normal text-gray-500 mx-3 my-2 text-sm">
                {book.description?.substring(0, 100) || 'Không có mô tả'}
                {book.description?.length > 100 ? '...' : ''}
              </p>
              <button className="bg-blue-700 font-semibold text-white py-2 rounded mx-3 my-3 hover:bg-black w-[90%]">
                Mua ngay
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {query ? (loading ? 'Đang tìm kiếm...' : `Không tìm thấy kết quả cho "${query}"`) : 'Vui lòng nhập từ khóa tìm kiếm'}
        </p>
      )}
    </div>
  );
};

export default SearchPage;