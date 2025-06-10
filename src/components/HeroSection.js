import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='hero-image-wrapper'>
        <img src='/images/BluePot.jpg' alt='Hero Background' className='hero-image' />
      </div>
      <h1>
        <span className="line-one">Handmade from</span><br />
        <span className="line-two">Mother Earth</span>
      </h1>
      <p></p>
      <div className='hero-btns'>
      </div>
    </div>
  );
}

export default HeroSection;