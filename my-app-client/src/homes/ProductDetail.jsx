import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!id) return; // Nếu id không tồn tại, không gửi yêu cầu
    axios.get(`http://localhost:3000/api/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, [id]); // Sử dụng id từ URL để gửi yêu cầu

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
