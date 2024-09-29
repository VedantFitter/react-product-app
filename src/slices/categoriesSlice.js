import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories(state, action) {
      return action.payload; // Set the categories to the fetched data
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;