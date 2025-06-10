import React, { useEffect, useState } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import NavCardItem from '../NavCardItem';

function Home() {
  const [pingMessage, setPingMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/ping')
      .then((res) => res.json())
      .then((data) => setPingMessage(data.message))
      .catch((err) => {
        console.error('Ping error:', err);
        setPingMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <>
      <HeroSection />

      <div className='navcards'>
        <h1>Explore Our Site</h1>
        <p style={{ textAlign: 'center', color: 'green' }}>Backend says: {pingMessage}</p>
        <div className='navcards__container'>
          <NavCardItem src='images/mugs4.jpg' title='Gallery' path='/products' />
          <NavCardItem src='images/tools.jpg' title='Classes' path='/services' />
          <NavCardItem src='images/the_artist.jpg' title='Artist' path='/about' />
          <NavCardItem src='images/exhibit.jpg' title='Cart' path='/sign-up' />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;