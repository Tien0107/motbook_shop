import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h1 className="text-5xl my-12 font-bold text-center">All Books are here</h1>
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full max-w-md rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          Search
        </button>
      </div>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map(book => (
          <Card key={book._id} className="shadow-2xl w-60">
            <img
              src={book.images[0].url}
              alt={book.title}
              className="w-full h-60 object-cover"
            />
            <h5 className="text-lg font-bold tracking-tight text-gray-900 mx-3 mt-2">
              {book.title}
            </h5>
            <p className="font-normal text-gray-500 mx-3 my-2 text-sm">
              {book.description}
            </p>
            <button className="bg-blue-700 font-semibold text-white py-2 rounded mx-3 my-3 hover:bg-black w-[90%]">
              Buy Now
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;