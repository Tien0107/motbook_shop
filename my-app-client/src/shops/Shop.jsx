import React, { useState,useEffect } from 'react'
import { Card } from "flowbite-react";
import Image from "../assets/profile.jpg";

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-books").then(res => res.json()).then(data => setBooks(data));
  },[])
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h1 className='text-5xl my-12 font-bold text-center'>All Books are here</h1>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => <Card className='shadow-2xl'
            >
              <img src={book.image_url} alt="" className='h-96 my-5 mx-5'/>
            <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white mx-3">
              <p>
                {book.book_title}
              </p>
            </h5>
            <p className="font-normal text-gray-500 dark:text-gray-400 mx-3">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
            <button className='bg-blue-700 font-semibold text-white py-2 rounded mx-3 my-3 hover:bg-black'>Buy Now</button>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Shop