router.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Not found");
    res.json(book);
  } catch (err) {
    console.error(err); // In ra lỗi phía backend để kiểm tra
    res.status(500).send("Server error");
  }
});
