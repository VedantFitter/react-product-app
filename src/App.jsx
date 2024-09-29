import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import './App.css';
import ProductList from './components/ProductList';
import CategorySelector from './components/CategorySelector';
import SearchBar from './components/SearchBar';

function App() {
  const [searchParams, setSearchParams] = useSearchParams(); // for Managing the query parameters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || ''); // Use query params for initial state
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || ''); // Use query params for initial search term

  // Fetch all categories during component mount
  useEffect(() => {
    const fetchCategories=async()=> {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  // Update URL query params when selectedCategory or searchTerm changes
  useEffect(() => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (searchTerm) params.search = searchTerm;
    setSearchParams(params);
  }, [selectedCategory, searchTerm, setSearchParams]);

  return (
    <>
    <div className='contain' >
      <CategorySelector categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}/>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <ProductList selectedCategory={selectedCategory} searchTerm={searchTerm} />
    </>
  );
}

export default App;


/*
 Limitations of the App:
 Slow Performance: network requests and unoptimized images can cause delays.
 API Dependency: App is reliant on DummyJSON API; downtime or slow responses impact functionality.
 No Caching: Data is fetched every time, increasing load times.
 Errors are logged but not displayed to users.
 Infinite Scroll Issues: Performance may degrade with large datasets.
 No Server-Side Rendering (SSR): Entire app is client-rendered, affecting SEO and load times.
 */
