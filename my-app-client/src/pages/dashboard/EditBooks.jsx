import React, { useState } from 'react';
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useParams, useLoaderData } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams();
  const {
    title,
    author,
    category,
    description,
    price,
    stock,
    publishYear,
    images
  } = useLoaderData();
  console.log(`title: ${title}`);
  

  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction",
    "Fantasy", "Horror", "Bibliography", "Autobiography", "History",
    "Self help", "Memoir", "Business", "Children Books", "Travel",
    "Philosophy", "Psychology", "Religion", "Art", "Văn học Việt Nam", "Other"
  ];

  const [selectedCategory, setSelectedCategory] = useState(category || bookCategories[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState(images?.[0]?.url || '');
  const [imageFile, setImageFile] = useState(null);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    if (selected !== "Other") setCustomCategory('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      author: form.author.value,
      description: form.description.value,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      publishYear: Number(form.publishYear.value),
      category: selectedCategory === "Other" ? customCategory : selectedCategory,
    };

    const formData = new FormData();
    for (let key in updatedData) {
      formData.append(key, updatedData[key]);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "PATCH",
        body: formData
      });

      const result = await response.json();
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Đã xảy ra lỗi khi cập nhật sách.");
    }
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Cập nhật sách</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">

        {/* Title & Author */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="title" value="Tên sách" />
            <TextInput id="title" name="title" type="text" defaultValue={title} required />
          </div>
          <div className='lg:w-1/2'>
            <Label htmlFor="author" value="Tác giả" />
            <TextInput id="author" name="author" type="text" defaultValue={author} required />
          </div>
        </div>

        {/* Image */}
        <div className='flex gap-8 items-start'>
          <div className='lg:w-1/2'>
            <Label htmlFor="image" value="Ảnh bìa sách (có thể thay)" />
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className='block w-full mt-1'
            />
          </div>
          {previewUrl && (
            <div>
              <Label value="Preview" />
              <img src={previewUrl} alt="Preview" className='w-32 h-32 object-cover rounded mt-1' />
            </div>
          )}
        </div>

        {/* Category */}
        <div className='lg:w-1/2'>
          <Label htmlFor="category" value="Thể loại sách" />
          <Select
            id="category"
            name="category"
            className='w-full rounded'
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {bookCategories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        {selectedCategory === "Other" && (
          <div className='lg:w-1/2'>
            <Label htmlFor="customCategory" value="Nhập thể loại mới" />
            <TextInput
              id="customCategory"
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          </div>
        )}

        {/* Description */}
        <div>
          <Label htmlFor="description" value="Mô tả sách" />
          <Textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={description}
            required
          />
        </div>

        {/* Publish Year, Price, Stock */}
        <div className='flex gap-8'>
          <div className='lg:w-1/3'>
            <Label htmlFor="publishYear" value="Năm xuất bản" />
            <TextInput
              id="publishYear"
              name="publishYear"
              type="number"
              defaultValue={publishYear}
              required
            />
          </div>
          <div className='lg:w-1/3'>
            <Label htmlFor="price" value="Giá bán (VND)" />
            <TextInput
              id="price"
              name="price"
              type="number"
              defaultValue={price}
              required
            />
          </div>
          <div className='lg:w-1/3'>
            <Label htmlFor="stock" value="Số lượng tồn kho" />
            <TextInput
              id="stock"
              name="stock"
              type="number"
              defaultValue={stock}
              required
            />
          </div>
        </div>

        <Button type="submit">Cập nhật sách</Button>
      </form>
    </div>
  );
};

export default EditBooks;
