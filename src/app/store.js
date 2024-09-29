import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../slices/categoriesSlice';
import productsReducer from '../slices/productsSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export default store;