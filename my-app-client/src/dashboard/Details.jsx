import React, { useState } from 'react'
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';

const Details = () => {
  const [author,setauthor] = useState(
    [
      {
        id: 1,
        name: 'Leo Tolstoy',
        imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeBLevIIU0RJSasAbDrtzNHNgbR0fWN6M6UxLt5_Q88A&s',
        book: 'Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer. He is regarded as one of the greatest and most influential authors of all time.'
      }
      ,{
        id: 2,
        name: 'Charler Dickens',
        imgURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTisAirxMLv15Q1Ho_y0RsniPu7oWFKK8p72yV2Pp0BMJ6mjR3t',
        book: 'Charles John Huffam Dickens was an English novelist and social critic who created some of the worlds best-known fictional characters, and is regarded by many as the greatest novelist of the Victorian era.'
      },
      {
        id: 3,
        name: 'John Green',
        imgURL: 'https://www.prhspeakers.com/wp-content/uploads/2019/07/John-Green-new_949_529_72-ppi.jpg',
        book: 'John Michael Green is an American author, YouTuber, podcaster, and philanthropist. His books have more than 50 million copies in print worldwide, including The Fault in Our Stars, which is one of the best-selling books of all time.'
      },
      {
        id: 4,
        name: 'William Shakespeare',
        imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqYviiqeC2-wZiAudkPo7rxFzskS0w8TEBhay0r09IPAP1kL4f',
        book: 'William Shakespeare was an English playwright, poet, and actor. He is widely regarded as the greatest writer in the English language and the worlds pre-eminent dramatist. He is often called Englands national poet and the "Bard of Avon"'
      }
      ,{
        id: 5,
        name: 'Charler Dickens',
        imgURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRL7UwIeHYzBz38Epf8xWdqPJHrxrBguDVIzxL1iqKueD2kmY6k',
        book: 'Charles Lutwidge Dodgson, better known by his pen name Lewis Carroll, was an English author, poet, mathematician and photographer. His most notable works are Alices Adventures in Wonderland and its sequel Through the Looking-Glass. He was noted for his facility with word play, logic, and fantasy.'
      },
      {
        id: 6,
        name: 'John Ronald Reuel Tolkien',
        imgURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRBL_FzuNhgn58lqPgmJa4YqfWEYaV9NXauuCvVTxyhjzWg6AuW',
        book: 'John Ronald Reuel Tolkien CBE FRSL was an English writer and philologist. He was the author of the high fantasy works The Hobbit and The Lord of the Rings. From 1925 to 1945, Tolkien was the Rawlinson and Bosworth Professor of Anglo-Saxon and a Fellow of Pembroke College, both at the University of Oxford.'
      },
      {
        id: 7,
        name: 'Jennifer Egan',
        imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILieYMYCx3tGPtHKM6XvmULfTlqCW8yrHdXaB-0m_-OvxMFuevlmN-UmVC5yyJkEXnJU&usqp=CAU',
        book: 'Jennifer Egan is an American novelist and short-story writer. Her novel A Visit from the Goon Squad won the 2011 Pulitzer Prize for Fiction and National Book Critics Circle Award for fiction. From 2018 to 2020, she served as the president of PEN America. ',
        link: 'https://en.wikipedia.org/wiki/Jennifer_Egan'
      }
      ,{
        id: 8,
        name: 'Salman Rushdie',
        imgURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTE5W_lxI3dSglzleNfgaX2wieEDm9bYvFYNT7ZaCAvx_aTFBMX',
        book: 'Sir Ahmed Salman Rushdie CH FRSL is an Indian-born British-American novelist. His work often combines magic realism with historical fiction and primarily deals with connections, disruptions, and migrations between Eastern and Western civilizations, typically set on the Indian subcontinent.',
        link: 'https://en.wikipedia.org/wiki/Salman_Rushdie'
      },
      {
        id: 9,
        name: 'F.Scott Fitzgerald',
        imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kY8_Lbldeu8EEIxXpLK_QH--8K8PyMcfF6c8Wzu1HnwFTrON',
        book: 'Francis Scott Key Fitzgerald was an American novelist, essayist, and short story writer. He is best known for his novels depicting the flamboyance and excess of the Jazz Age—a term he popularized in his short story collection Tales of the Jazz Age',
        link: 'https://en.wikipedia.org/wiki/F._Scott_Fitzgerald'
      }
      
    ]
  )
  return (
    <div>
     <h1 className='mb-8 text-3xl font-bold mt-3 ml-5'>
        Origin of Books
      </h1>
      <div className='bg-gray-100 mt-5 ml-5 mr-5 rounded-md s shadow-2xl'>
        <p className='px-7 py-7'>
      <p className='text-gray-500'>Introduction:</p> Books have been a fundamental part of human civilization, serving as vehicles for knowledge, culture, and storytelling.
      <p className='text-gray-500'>Evolution of Books:</p> From the earliest civilizations, humans have recorded information on various materials such as stone tablets, papyrus scrolls, and parchment manuscripts.
      <p className='text-gray-500'>Invention of Printing Press:</p> In the 15th century, Johannes Gutenberg's invention of the printing press revolutionized book production, making books more accessible and affordable.
      <p className='text-gray-500'>Impact on Society:</p> The printing press played a crucial role in spreading literacy, education, and ideas, fueling the Renaissance, Reformation, and Enlightenment.
      </p>
      </div>
      <h2 className='mb-8 text-3xl font-bold ml-5 mt-7'>First published book</h2>
      <div className='flex gap-3'>
        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5GDZKeYJi6o_m9k79pvDBbZacGbE2vVrdYg&s" alt="" className='h-50 w-70 ml-5 border-r-4 shadow-2xl'
        style={{borderRadius: '50%',border: '2px solid'}} />
        <p>
        <div className='bg-gray-100 mt-5 ml-5 mr-5 rounded-md s shadow-2xl'>
        <p className='px-7 py-7'>
      <p className='text-gray-500'>Introduction to the Gutenberg Bible::</p>Provide background information about the Gutenberg Bible, the first major book printed using movable type.
      <p className='text-gray-500'>Publication Date:</p> Mention that the Gutenberg Bible was printed in the 1450s, making it one of the earliest printed books in history.
      <p className='text-gray-500'>Printing Process:</p> Explain the printing process used for the Gutenberg Bible, including the use of movable type and the materials involved.
      <p className='text-gray-500'>Significance: </p>Discuss the historical and cultural significance of the Gutenberg Bible as a symbol of the Gutenberg Revolution and the beginning of the age of printed books.
      </p>
      </div>
        </p>
        </div>
        <h1 className='mb-8 text-3xl font-bold mt-5 ml-5'>
        Famous Authors:
      </h1>
      <div className='grid gap-8  lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>{
      author.map(data => <Card className='shadow-2xl'
            >
              <img src={data.imgURL} alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5GDZKeYJi6o_m9k79pvDBbZacGbE2vVrdYg&s" className='h-50 my-5 mx-1'/>
            <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white mx-3">
              <p>
                {data.name}
              </p>
            </h5>
            <p className="font-normal text-gray-500 dark:text-gray-400 mx-3">
              {data.book}
            </p>
         <Link className='bg-blue-700 font-semibold text-white py-2 rounded mx-3 my-3 hover:bg-black' to={data.link}>
          <p className='flex items-center justify-center'>Explore</p>
            </Link>
          </Card>)
}
          
      </div>
    </div>
  )
}

export default Details