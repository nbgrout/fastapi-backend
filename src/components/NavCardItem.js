import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css';

function NavCardItem({ src, title, path }) {
  const navigate = useNavigate();

  return (
    <div
      className='navcard__item'
      onClick={() => navigate(path)}
      style={{ cursor: 'pointer' }}
    >
      <div className='navcard__image-container'>
        <img className='navcard__img' alt={title} src={src} />
        <div className='navcard__overlay'>
          <h2 className='navcard__title'>{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default NavCardItem;