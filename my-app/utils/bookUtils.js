const formatBookResponse = book => {
	return {
		id: book._id,
		title: book.title,
		author: book.author,
		price: book.price,
		image: book.image,
		description: book.description || '',
		publishYear: book.publishYear,
		createdAt: book.createdAt,
		updatedAt: book.updatedAt,
	};
};

const formatPaginationResponse = (books, page, limit, total) => {
	return {
		books: books.map(formatBookResponse),
		pagination: {
			currentPage: page,
			totalPages: Math.ceil(total / limit),
			totalItems: total,
			itemsPerPage: limit,
		},
	};
};

const parseQueryParams = query => {
	const page = parseInt(query.page) || 1;
	const limit = parseInt(query.limit) || 10;
	const searchQuery = query.search || '';
	const sortBy = query.sortBy || 'createdAt';
	const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

	return {
		page,
		limit,
		searchQuery,
		sortBy,
		sortOrder,
		skip: (page - 1) * limit,
	};
};

module.exports = {
	formatBookResponse,
	formatPaginationResponse,
	parseQueryParams,
};
