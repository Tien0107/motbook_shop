import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaCartShopping } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const BookCards = ({ books, headline }) => {
  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>

      <div className='mt-12'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
          modules={[Pagination]}
          className='mySwiper w-full h-full'
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <Link to={`/book/${book._id}`}>
                <div className='relative'>
                  <img
                    src={book.image_url || book.images?.[0]?.url}
                    alt={book.book_title || book.title}
                    className='w-full h-60 object-cover'
                  />
                  <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                    <FaCartShopping className='w-4 h-4 text-white' />
                  </div>
                </div>
                <div className='mx-3 my-2'>
                  <h5 className='text-lg font-bold tracking-tight text-gray-900'>
                    {book.book_title || book.title}
                  </h5>
                  <p className='font-normal text-gray-500 text-sm'>
                    {book.authorName || 'Unknown author'}
                  </p>
                  <p className='text-sm text-black font-semibold'>
                    {book.price ? `${book.price.toLocaleString('vi-VN')}đ` : ''}
                  </p>
                  <button className='bg-blue-700 font-semibold text-white py-2 rounded hover:bg-black w-[90%] mt-2'>
                    Buy Now
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

BookCards.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      images: PropTypes.array,
      book_title: PropTypes.string,
      title: PropTypes.string,
      authorName: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  headline: PropTypes.string.isRequired,
};

export default BookCards;
