// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import { FaCartShopping } from 'react-icons/fa6';

// import './BookCard.css';

// import required modules
import { Pagination } from 'swiper/modules';

const BookCards = ({books, headline}) => {

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
   

    {/* cards */}
    <div className='mt-12'>
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper q-full h-full"
      >
        {
          books.map(book => <SwiperSlide key={book._id}>
            <Link to={`/book/${book._id}`}>
              <div className='relative'>
                <img 
                   src={book.images[0].url}
                   alt={book.title}
                   className="w-full h-60 object-cover "
                 />
                 <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mx-3 mt-2">
                   {book.title}
                 </h5>
                 <p className="font-normal text-gray-500 dark:text-gray-400 mx-3 my-2 text-sm">
                   Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                 </p>
                 <button className="bg-blue-700 font-semibold text-white py-2 rounded mx-3 my-3 hover:bg-black w-[90%]">
                   Buy Now
                 </button>
              </div>
            </Link>
          </SwiperSlide>)
        }
        
      </Swiper>
  
    </div>
    </div>
    
  )
};
BookCards.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      book_title: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
    })
  ).isRequired,
  headline: PropTypes.string.isRequired,
};

export default BookCards