import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/api/books").then(res => res.json()).then(data => {
      console.log(`data`, data);
      setAllBooks(data.data)
    })
  },[])
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/book/${id}`,{
      method: "DELETE",

    }).then(res => res.json()).then(data => {alert("Book is deleted successfully")}
  // setAllBooks(data)
) }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books</h2>
      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>N.o</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Prices</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book,index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>
                {book.book_title}
              </Table.Cell>
              <Table.Cell>
                {book.author_name}
              </Table.Cell>
              <Table.Cell>
                {book.category}
              </Table.Cell>
              <Table.Cell>
                {book.price}
              </Table.Cell>
              <Table.Cell className='flex gap-4'>
                <Link to={`/update/${book.id}`} className='bg-blue-700 text-white px-4 py-2 rounded'>Edit</Link>
                <button onClick={() => handleDelete(book.id)} className='bg-red-700 text-white px-4 py-2 rounded'>Delete</button>
              </Table.Cell>
            </Table.Row>
          ))
        }
        
      </Table>
    </div>
  )
}

export default ManageBooks