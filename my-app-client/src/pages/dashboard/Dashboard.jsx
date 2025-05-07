import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './dashboard.css'

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';
const Dashboard = () => {
  return (
    <>
   
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
          <SwiperSlide style={{ 
      backgroundImage: `url("https://c0.wallpaperflare.com/preview/757/248/881/blur-book-stack-books-bookshelves.jpg")`, width:'25%' ,height:'100%',borderRadius:'20px',paddingRight: '20%'
    }}>
     
          
       
          
          <div>
          <p className='text-white' style={{ textAlign: 'flex-end',marginTop:'45%',marginLeft:'20%',fontSize:'20px',fontWeight:'bold' }}>
          The more that you read, the more things you will know. The more that you learn, the more places you'll go.
            </p>
            <div className='text-white' style={{ textAlign: 'flex-end',marginTop:'5%',marginLeft:'70%',fontSize:'20px',fontWeight:'bold'}} data-swiper-parallax="-300">
          - Dr. Seuss
          </div>
       
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1572061487381-7d2f92b2b5c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFyayUyMGJvb2t8ZW58MHx8MHx8fDA%3D")`, width:'100%' ,height:'100%',borderRadius:'20px',paddingRight: '20%'
    }}>
     
    
          
          <div>
          <p className='text-white' style={{ textAlign: 'flex-end',marginTop:'15%',marginLeft:'20%',fontSize:'20px',fontWeight:'bold' }}>
          Books are a uniquely portable magic.
            </p>
            <div className='text-white' style={{ textAlign: 'flex-end',marginTop:'5%',marginLeft:'70%',fontSize:'20px',fontWeight:'bold'}} data-swiper-parallax="-300">
           - Stephen King
          </div>
       
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1481624362406-b7817fa45ecf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2tzJTIwb24lMjBhJTIwdGFibGV8ZW58MHx8MHx8fDA%3D")`, width:'100%' ,height:'100%',borderRadius:'20px',paddingRight: '20%'
    }}>
     
    
          
          <div>
          <p className='text-white' style={{ textAlign: 'flex-end',marginTop:'10%',marginLeft:'20%',fontSize:'20px',fontWeight:'bold' }}>
          The man who does not read has no advantage over the man who cannot read.
            </p>
            <div className='text-white' style={{ textAlign: 'flex-end',marginTop:'5%',marginLeft:'70%',fontSize:'20px',fontWeight:'bold'}} data-swiper-parallax="-300">
            - Mark Twain
          </div>
       
          </div>
        </SwiperSlide>
     
      </Swiper>
     
    </>
  )
}

export default Dashboard