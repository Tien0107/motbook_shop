// src/features/products/stores/productStore.js
import { create } from 'zustand';
import productService from '../services/productService';

const useProductStore = create(set => ({
	products: [],
	loading: false,
	error: null,
	filters: {
		search: '',
		category: 'all',
		sortBy: 'name-asc',
		priceRange: [0, 1000],
		inStock: 'all',
	},

	// Actions
	setLoading: loading => set({ loading }),
	setError: error => set({ error }),
	setProducts: products => set({ products }),
	setFilters: filters => set({ filters }),

	// Async actions
	fetchProducts: async () => {
		set({ loading: true, error: null });
		try {

			const products = await productService.getProducts();

			set({ products, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	getProductById: async id => {
		set({ loading: true, error: null });
		try {
			const product = await productService.getProduct(id);
			set({ product, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	addProduct: async product => {
		set({ loading: true, error: null });
		try {
			const response = await productService.createProduct(product);
			if (!response.ok) {
				throw new Error('Failed to add product');
			}
			const newProduct = await response.json();
			set(state => ({
				products: [...state.products, newProduct],
				loading: false,
			}));
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	updateProduct: async (id, product) => {
		set({ loading: true, error: null });
		try {
			const response = await productService.updateProduct(id, product);
			if (!response.ok) {
				throw new Error('Failed to update product');
			}
			const updatedProduct = await response.json();
			set(state => ({
				products: state.products.map(p => (p.id === id ? updatedProduct : p)),
				loading: false,
			}));
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	deleteProduct: async id => {
		set({ loading: true, error: null });
		try {
			const response = await productService.deleteProduct(id);
			if (!response.ok) {
				throw new Error('Failed to delete product');
			}
			set(state => ({
				products: state.products.filter(p => p.id !== id),
				loading: false,
			}));
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	// Computed values
	filteredProducts: state => {
		let filtered = [...state.products];

		// Apply search filter
		if (state.filters.search) {
			const searchTerm = state.filters.search.toLowerCase();
			filtered = filtered.filter(
				product =>
					product.title.toLowerCase().includes(searchTerm) ||
					product.description.toLowerCase().includes(searchTerm),
			);
		}

		// Apply category filter
		if (state.filters.category !== 'all') {
			filtered = filtered.filter(
				product => product.category === state.filters.category,
			);
		}

		// Apply price range filter
		filtered = filtered.filter(
			product =>
				product.price >= state.filters.priceRange[0] &&
				product.price <= state.filters.priceRange[1],
		);

		// Apply stock filter
		if (state.filters.inStock === 'inStock') {
			filtered = filtered.filter(product => product.stock > 0);
		} else if (state.filters.inStock === 'outOfStock') {
			filtered = filtered.filter(product => product.stock === 0);
		}

		// Apply sorting
		const [field, order] = state.filters.sortBy.split('-');
		filtered.sort((a, b) => {
			if (order === 'asc') {
				return a[field] > b[field] ? 1 : -1;
			} else {
				return a[field] < b[field] ? 1 : -1;
			}
		});

		return filtered;
	},
}));

export default useProductStore;
