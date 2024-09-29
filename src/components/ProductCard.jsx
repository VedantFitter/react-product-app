import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img
        src={product.images[0]} 
        className="card-img-top" 
        alt={product.title} 
        style={{ height: '150px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">
          {/* shorten the description */}
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <p className="card-text"><strong>Category:</strong> {product.category}</p>
        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
        {product.discountPercentage && (
          <p className="card-text text-danger">
            <strong>Discount:</strong> {product.discountPercentage}%
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
