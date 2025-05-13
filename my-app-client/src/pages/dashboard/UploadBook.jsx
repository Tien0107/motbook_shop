import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useState } from 'react';
import useAuthStore from "../../features/auth/stores/authStore";

const UploadBook = () => {
  const { user } = useAuthStore();
  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction",
    "Fantasy", "Horror", "Bibliography", "Autobiography", "History",
    "Self help", "Memoir", "Business", "Children Books", "Travel",
    "Philosophy", "Psychology", "Religion", "Art", "Other"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [images, setImages] = useState([]); // Array of { file, previewUrl }

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
    if (event.target.value !== "Other") {
      setCustomCategory('');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    // Revoke preview URL to release memory
    URL.revokeObjectURL(newImages[index].previewUrl);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const book_title = form.book_title.value;
    const authorName = form.authorName.value;
    const book_description = form.book_description.value;
    const price = form.price.value;
    const stock = form.stock.value;
    const publishYear = form.publishYear.value;
    const category = selectedBookCategory === "Other" ? customCategory : selectedBookCategory;

    if (selectedBookCategory === "Other" && !customCategory.trim()) {
      alert("Vui lòng nhập thể loại mới.");
      return;
    }

    if (images.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh sách.");
      return;
    }

    const formData = new FormData();
    formData.append("book_title", book_title);
    formData.append("authorName", authorName);
    formData.append("book_description", book_description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("publishYear", publishYear);

    images.forEach(({ file }) => {
      formData.append("images", file);
    });

    fetch("http://localhost:3000/api/books/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${user.user.accessToken}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert("Book uploaded successfully!");
        form.reset();
        images.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl));
        setImages([]);
        setSelectedBookCategory(bookCategories[0]);
        setCustomCategory('');
      })
      .catch(err => {
        console.error("Upload failed:", err);
        alert("Có lỗi xảy ra khi tải lên sách.");
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="book_title" value="Book Title" />
            <TextInput id="book_title" name='book_title' type="text" required />
          </div>

          <div className='lg:w-1/2'>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput id="authorName" name='authorName' type="text" required />
          </div>
        </div>

        {/* Multiple Image Upload */}
        <div className='flex flex-col gap-4'>
          <div className='lg:w-1/2'>
            <Label htmlFor="images" value="Book Images (Upload Multiple)" />
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className='block w-full mt-1'
            />
          </div>

          {/* Image Previews with Name and Remove Button */}
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-28 text-center">
                <img src={img.previewUrl} alt={`Preview ${index}`} className="w-28 h-28 object-cover rounded" />
                <p className="text-sm truncate mt-1">{img.file.name}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='lg:w-1/2'>
          <Label htmlFor="category" value="Book Category" />
          <Select
            id="category"
            name="category"
            className='w-full rounded'
            value={selectedBookCategory}
            onChange={handleChangeSelectedValue}
          >
            {bookCategories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        {selectedBookCategory === "Other" && (
          <div className='lg:w-1/2'>
            <Label htmlFor="customCategory" value="Enter New Category" />
            <TextInput
              id="customCategory"
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="book_description" value="Book Description" />
          <Textarea
            id="book_description"
            name="book_description"
            required
            rows={4}
          />
        </div>

        <div className='flex gap-8'>
          <div className='lg:w-1/3'>
            <Label htmlFor="publishYear" value="Publish Year" />
            <TextInput id="publishYear" name="publishYear" type="number" required />
          </div>

          <div className='lg:w-1/3'>
            <Label htmlFor="price" value="Price" />
            <TextInput id="price" name="price" type="number" step="0.01" required />
          </div>

          <div className='lg:w-1/3'>
            <Label htmlFor="stock" value="Stock" />
            <TextInput id="stock" name="stock" type="number" required />
          </div>
        </div>

        <Button type="submit">Upload Book</Button>
      </form>
    </div>
  );
};

export default UploadBook;
