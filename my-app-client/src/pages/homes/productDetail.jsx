import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(res => {
        setBook(res.data?.data); // vì bạn dùng sendSuccess, nên dữ liệu nằm trong `data`
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi lấy dữ liệu sách:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4">🔄 Đang tải dữ liệu sách...</div>;
  if (!book) return <div className="p-4 text-red-500">⚠️ Không tìm thấy sách</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={book.images?.[0]?.url || "/placeholder.jpg"}
        alt={book.title}
        className="w-full rounded-lg shadow-lg object-cover"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 mb-2">✍️ Tác giả: {book.author}</p>
        <p className="text-gray-600 mb-2">🏢 NXB: {book.publisher}</p>
        <p className="text-xl text-green-600 font-semibold mb-4">
          {book.price?.toLocaleString()}₫
        </p>
        <p className="mb-6">{book.description}</p>

        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          🛒 Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
