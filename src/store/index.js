import { createStore } from 'vuex';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
axios.defaults.baseURL = API_BASE_URL;

const store = createStore({
  state: {
    products: [],
    total: 0,
    page: 1,
    perPage: 10,
    filters: {
      name: '',
      minPrice: null,
      maxPrice: null,
      category_id: ''
    }
  },
  mutations: {
    setProducts(state, { products, total }) {
      state.products = products;
      state.total = total;
    },
    setPage(state, page) {
      state.page = page;
    },
    setFilters(state, filters) {
      state.filters = { ...state.filters, ...filters };
    }
  },
  actions: {
    async fetchProducts({ state, commit }) {
      const { page, perPage, filters } = state;
      const params = {
        page,
        size: perPage,
        ...(filters.name && { name: filters.name }),
        ...(filters.minPrice !== null && { 'price[min]': filters.minPrice }),
        ...(filters.maxPrice !== null && { 'price[max]': filters.maxPrice }),
        ...(filters.category_id && { category_id: filters.category_id })
      };
      const response = await axios.get('/api/products', { params });
      commit('setProducts', { products: response.data.data, total: response.data.meta.total });
    },
    async addProduct({ dispatch }, product) {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('image', product.image);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category_id', product.category_id);
      
        await axios.post('/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        dispatch('fetchProducts');
      }
  }
});

export default store;