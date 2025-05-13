import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

const SingleBook = () => {
  const book = useLoaderData();
  
  const [quantity, setQuantity] = useState(1);
  
  // Tính giá sau giảm giá (giả sử có discount 10%)
  const discount = 10;
  const discountedPrice = book.price * (1 - discount/100);
  
  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600">Trang chủ</a>
          <span className="mx-2">/</span>
          <a href="/books" className="hover:text-blue-600">Sách</a>
          <span className="mx-2">/</span>
          <a href={`/books/${book.category}`} className="hover:text-blue-600">{book.category}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{book.title}</span>
        </nav>
        
        {/* Main content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image section */}
            <div className="lg:w-2/5 bg-gray-100 p-6 flex items-center justify-center">
              <div className="relative w-full">
                <img
                  src={book.images?.[0]?.url || "/api/placeholder/400/600"}
                  alt={book.title}
                  className="w-full h-auto object-contain rounded-lg shadow-md mx-auto max-h-96"
                />
                
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transform rotate-12">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>
            
            {/* Details section */}
            <div className="lg:w-3/5 p-8">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </span>
                    <span className="ml-2 text-gray-600">(48 đánh giá)</span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{book.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Còn hàng
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <p className="text-3xl font-bold text-blue-700">{discountedPrice.toLocaleString()}₫</p>
                    {discount > 0 && (
                      <p className="ml-4 text-xl text-gray-500 line-through">{book.price.toLocaleString()}₫</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">Tác giả: <span className="font-medium">{book.author}</span></span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">Năm xuất bản: <span className="font-medium">{book.publishYear}</span></span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-gray-700">Số trang: <span className="font-medium">{book.pages || "256"}</span></span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2v-8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">ISBN: <span className="font-medium">{book.isbn || "978-3-16-148410-X"}</span></span>
                    </div>
                  </div>
                  
                  <div className="pb-8 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h3>
                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg w-32 mb-4 sm:mb-0">
                      <button 
                        className="px-3 py-1 text-xl"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-full text-center focus:outline-none"
                      />
                      <button 
                        className="px-3 py-1 text-xl"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex-grow sm:ml-4 space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 flex-grow flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Thêm vào giỏ hàng
                      </button>
                      
                      <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition duration-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Yêu thích
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Giao hàng nhanh
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Đổi trả trong 7 ngày
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Bảo hành chính hãng
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional information tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <a href="#" className="py-4 px-6 border-b-2 border-blue-500 text-blue-600 font-medium">
                Thông tin chi tiết
              </a>
              <a href="#" className="py-4 px-6 text-gray-500 hover:text-gray-700 font-medium">
                Đánh giá (48)
              </a>
              <a href="#" className="py-4 px-6 text-gray-500 hover:text-gray-700 font-medium">
                Sách liên quan
              </a>
            </nav>
          </div>
          
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>Giới thiệu sách</h3>
              <p>{book.description}</p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aenean euismod, 
                nisl eget ultricies ultrices, nisl nisl aliquet nisi, vitae aliquet nunc nisl eu nisl. 
                Nulla facilisi. Aenean euismod, nisl eget ultricies ultrices, nisl nisl aliquet nisi, 
                vitae aliquet nunc nisl eu nisl.
              </p>
              
              <h3>Thông tin tác giả</h3>
              <p>
                {book.author} là một tác giả nổi tiếng với nhiều tác phẩm đã được xuất bản và nhận được 
                nhiều giải thưởng. Những cuốn sách của tác giả luôn nhận được sự đón nhận nhiệt tình từ 
                độc giả.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;