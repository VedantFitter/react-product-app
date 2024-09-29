import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleChange = (e) => {
    onCategoryChange(e.target.value); // Call the handler to update selectedCategory
  };

  return (
    <div>
      <label htmlFor="category-select">Select Category: </label>
      <select id="category-select" value={selectedCategory} onChange={handleChange}>
        <option value="">All Categories</option> 
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>       
            {category.name} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;