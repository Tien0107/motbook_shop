import React, { useEffect, useState } from 'react'
import BookCards from '../../Components/BookCards';

const OtherBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:3000/api/books").then(res => res.json()).then(data => setBooks(data.data.slice(0,7)))
  }, []);
  
  return (
    <div>
      <BookCards books={books} headline="Other Books"/>
    </div>
  )
}

export default OtherBooks