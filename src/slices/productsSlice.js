import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedCategory: '',
    searchTerm: '',
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload; // Set the products to the fetched data
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload; // Set the selected category
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload; // Set search term
    },
  },
});

export const { setProducts, setSelectedCategory, setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;