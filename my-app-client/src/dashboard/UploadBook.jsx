import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistory",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Philosophy",
    "Psycology",
    "Religion",
    "Art"
  ]
  const [selectedBookCategory,setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  }
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const book_title = form.book_title.value;
    const authorName = form.authorName.value;
    const image_url = form.image_url.value;
    const  book_description = form.book_description.value;
    const book_pdf_url = form.book_pdf_url.value;
    const category = form.category.value;

    const bookObj = {
      book_title, authorName, image_url, book_description, book_pdf_url, category
    }
    console.log(bookObj)
    // send data to DB
    fetch("http://localhost:3000/upload-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      alert("Book Uploaded successfully!!!")
      form.reset();
    })
  } 
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/*Form 1*/}
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label 
          htmlFor="book_title" 
          value="Book Title" />
        </div>
        <TextInput 
        id="book_title" 
        type="text" 
        name='book_title'
        placeholder="Book Name" 
        required
        />
      </div>

      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label 
          htmlFor="authorName" 
          value="Author Name" />
        </div>
        <TextInput 
        id="authorName" 
        name='authorName'
        type="text" 
        placeholder="Author Name" 
        required
        />
      </div>
      </div>
     {/*Form 2*/}
     <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label 
          htmlFor="image_url" 
          value="Book image URL" />
        </div>
        <TextInput 
        id="image_url" 
        type="text" 
        name='image_url'
        placeholder="Book image URL" 
        required
        />
      </div>

      <div className='lg:w-1/2'>
      <div className="mb-2 block">
          <Label 
          htmlFor="imputState" 
          value="Book Catagory" />
        </div>
        <Select id="category" name="categoryName" className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
          {
          bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
          }
        </Select>
      </div>
      </div>
      {/*Book description*/}
      <div>
        <div className='mb-2 block'>
          <Label 
          htmlFor="book_description"
          value="Book Description"
          />
        </div>
        <Textarea 
        id="book_description"
        name="book_description"
        placeholder='write you book description...'
        required
        className='w-full'
        rows={4}/>
      </div>

      {/*book pdf link*/}
      <div>
        <div className='mb-2 block'>
          <Label 
          htmlFor="book_pdf_url"
          value="Book PDF URL"
          />
        </div>
        <TextInput 
        id="book_pdf_url"
        name='book_pdf_url'
        placeholder='book pdf url'
        requiredtype='text'/>
      </div>
      <Button type="submit" >Upload Book</Button>
    </form>
    </div>
  )
}

export default UploadBook