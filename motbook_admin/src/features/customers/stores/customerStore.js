import { debounce } from 'lodash';
import { create } from 'zustand';
import customerService from '../services/customerService';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

const useCustomerStore = create((set, get) => ({
    // Extended State
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,

    // Pagination state
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    },

    // Enhanced Filters state
    filters: {
        search: '',
        status: 'all',
        sortBy: 'name-asc',
        dateRange: null
    },

    // Cache state
    cache: {
        timestamp: null,
        data: null
    },

    // Actions
    setFilters: debounce((filters) => {
        set({ filters });
        get().fetchCustomers();
    }, 300),

    setPagination: (paginationData) => {
        set({ pagination: { ...get().pagination, ...paginationData } });
    },

    // Enhanced Async actions with caching
    fetchCustomers: async (forceRefresh = false) => {
        const state = get();
        const { currentPage, itemsPerPage } = state.pagination;
        const { filters } = state;

        // Check cache first
        if (!forceRefresh && state.cache.timestamp) {
            const cacheAge = Date.now() - state.cache.timestamp;
            if (cacheAge < CACHE_DURATION) {
                return set({ customers: state.cache.data });
            }
        }

        set({ loading: true, error: null });
        try {
            const response = await customerService.getAll({
                page: currentPage,
                limit: itemsPerPage,
                ...filters
            });

            // Update pagination info
            set({
                customers: response.data,
                pagination: {
                    ...state.pagination,
                    totalPages: response.totalPages,
                    totalItems: response.totalItems
                },
                cache: {
                    timestamp: Date.now(),
                    data: response.data
                },
                loading: false
            });
        } catch (error) {
            set({
                error: error.message,
                loading: false
            });
        }
    },

    getCustomerById: async (id) => {
        set({ loading: true, error: null });
        try {
            const customer = await customerService.getById(id);
            set({ selectedCustomer: customer, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updateCustomerStatus: async (id, statusData) => {
        set({ loading: true, error: null });
        try {
            const updated = await customerService.updateStatus(id, statusData);

            // Optimistic update
            set(state => {
                const newCustomers = state.customers.map(c =>
                    c.id === id ? { ...c, ...updated } : c
                );

                return {
                    customers: newCustomers,
                    selectedCustomer: state.selectedCustomer?.id === id ?
                        { ...state.selectedCustomer, ...updated } :
                        state.selectedCustomer,
                    cache: {
                        timestamp: Date.now(),
                        data: newCustomers
                    },
                    loading: false
                };
            });
        } catch (error) {
            set({ error: error.message, loading: false });
            // Revert optimistic update on error
            get().fetchCustomers(true);
        }
    },

    // Enhanced computed values
    filteredAndSortedCustomers: () => {
        const state = get();
        let filtered = [...state.customers];

        // Apply search filter
        if (state.filters.search) {
            const searchTerm = state.filters.search.toLowerCase();
            filtered = filtered.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm)
            );
        }

        // Apply status filter
        if (state.filters.status !== 'all') {
            filtered = filtered.filter(customer =>
                customer.status === state.filters.status
            );
        }

        // Apply date range filter if exists
        if (state.filters.dateRange) {
            const { start, end } = state.filters.dateRange;
            filtered = filtered.filter(customer => {
                const customerDate = new Date(customer.createdAt);
                return customerDate >= start && customerDate <= end;
            });
        }

        // Apply sorting with memoization
        const [field, order] = state.filters.sortBy.split('-');
        return filtered.sort((a, b) => {
            if (order === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            }
            return a[field] < b[field] ? 1 : -1;
        });
    },

    // Cache management
    clearCache: () => {
        set({
            cache: { timestamp: null, data: null }
        });
        customerService.clearCache();
    }
}));

export default useCustomerStore;
