import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../slices/productsSlice';
import ProductCard from './ProductCard';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = ({ selectedCategory, searchTerm }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  async function fetchProducts(reset = false) {
    setLoading(true);
    let url = '';

    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${(page-1)*limit}`;
    } else if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${(page-1)*limit}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${(page-1)*limit}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      // If reset, set products directly
      if (reset) {
        dispatch(setProducts(data.products));
      } else {
        dispatch(setProducts([...products, ...data.products]));
      }

      // if there are no products
      if (data.products.length === 0) {
        setHasMore(false); // Stop fetching more products
      } else {
        if (products.length + data.products.length >= data.total) {
          setHasMore(false); // Stop fetching more if we reach the total
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    dispatch(setProducts([]));
    fetchProducts(true);
  }, [selectedCategory, searchTerm]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    fetchProducts();
  };

  // Render spinner when loading the first batch
  if (loading && page === 1) {
    return <Spinner />;
  }

  return (
  <>
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spinner />}
      endMessage={
        !hasMore && products.length > 0 ? (
          <div className="end-message">
            <span className="icon">✔️</span> No more products to show
          </div>
        ) : null
      }
    >
      <div className="container productlist-container">
        <div className="product-list">
          {products.length === 0 ? (
            <div className="no-products-message">No products found</div>
          ) : (
            products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />  
            ))
          )}
        </div>
      </div>
    </InfiniteScroll>
  </>
);

};

export default ProductList;
