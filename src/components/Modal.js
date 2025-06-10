import React from 'react';
import './Modal.css';

const ImageModal = ({ isOpen, onClose, image, title, price, description, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="page-container">
      <div className="back-button" onClick={onClose}>
        ← Back to Gallery
      </div>
      <div className="image-section">
        <img src={image} alt={title} className="full-image" />
      </div>
      <div className="details-section">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price}</p>
        <p className="product-description">{description}</p>
        <button className="add-to-cart-button" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ImageModal;