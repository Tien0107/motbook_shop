//create for me react page for sale book that book data is used by Book.js in my-app

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCards from '../Components/BookCards';
import { Link } from 'react-router-dom';

const DealBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/all');
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <br />
      <br />
      <br />
      <BookCards books={books} headline="Sách Đang Khuyến Mãi" />
    </div>
  );
};

export default DealBooks;