import React from 'react';
import './Cards.css';

function CardItem({ src, title, price, description, onClick, onPurchase, available }) {
  return (
    <li className='cards__item'>
      <div className='cards__item__link' onClick={onClick}>
        <figure className='cards__item__pic-wrap'>
          <img
            className='cards__item__img'
            alt={title}
            src={src}
          />
        </figure>
      </div>
      <div className='cards__item__details'>
        <div className='cards__item__title'>{title}</div>
        <div className='cards__item__price'>{price}</div>
        {available > 0 ? (
          <button
            className='cards__item__button'
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onPurchase?.();
            }}
          >
            Purchase
          </button>
        ) : (
          <div className='cards__item__soldout'>Sold Out</div>
        )}
      </div>
    </li>
  );
}

export default CardItem;