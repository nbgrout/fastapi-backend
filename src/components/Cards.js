import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import ImageModal from './Modal';

function Cards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    image: '',
    title: '',
    price: '',
    description: ''
  });

  const openModal = (image, title, price, description) => {
    setModalData({ image, title, price, description });
    setModalOpen(true);
  };

  return (
    <div className='cards'>

      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/assortment.jpg'
              title='Assortment'
              price='$45'
              description='A beautiful collection of pottery pieces.'
              onClick={() => openModal('images/assortment.jpg', 'Assortment', '$45', 'A beautiful collection of pottery pieces.')}
            />
            <CardItem
              src='images/exhibit_display.jpg'
              title='Exhibit Display'
              price='$120'
              description='Elegant pottery display perfect for galleries.'
              onClick={() => openModal('images/exhibit_display.jpg', 'Exhibit Display', '$120', 'Elegant pottery display perfect for galleries.')}
            />
            <CardItem
              src='images/finished_dragon.jpg'
              title='Finished Dragon'
              price='$90'
              description='Intricately detailed dragon-themed pottery.'
              onClick={() => openModal('images/finished_dragon.jpg', 'Finished Dragon', '$90', 'Intricately detailed dragon-themed pottery.')}
            />
            <CardItem
              src='images/finished_dragon2.jpg'
              title='Finished Dragon II'
              price='$95'
              description='Another version of the majestic dragon pottery.'
              onClick={() => openModal('images/finished_dragon2.jpg', 'Finished Dragon II', '$95', 'Another version of the majestic dragon pottery.')}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/mugs4.jpg'
              title='Mugs Set'
              price='$50'
              description='Handmade mugs set perfect for tea or coffee.'
              onClick={() => openModal('images/mugs4.jpg', 'Mugs Set', '$50', 'Handmade mugs set perfect for tea or coffee.')}
            />
            <CardItem
              src='images/vases.jpg'
              title='Vases Collection'
              price='$75'
              description='Beautifully crafted vases in various sizes.'
              onClick={() => openModal('images/vases.jpg', 'Vases Collection', '$75', 'Beautifully crafted vases in various sizes.')}
            />
            <CardItem
              src='images/mug.jpg'
              title='Classic Mug'
              price='$20'
              description='A sturdy, stylish mug for everyday use.'
              onClick={() => openModal('images/mug.jpg', 'Classic Mug', '$20', 'A sturdy, stylish mug for everyday use.')}
            />
            <CardItem
              src='images/mug2.jpg'
              title='Artisan Mug'
              price='$25'
              description='Artisan-crafted mug with a unique glaze.'
              onClick={() => openModal('images/mug2.jpg', 'Artisan Mug', '$25', 'Artisan-crafted mug with a unique glaze.')}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/mugs6.jpg'
              title='Rustic Mugs'
              price='$55'
              description='Rustic set of mugs with earthy tones.'
              onClick={() => openModal('images/mugs6.jpg', 'Rustic Mugs', '$55', 'Rustic set of mugs with earthy tones.')}
            />
            <CardItem
              src='images/soap_dispensor.jpg'
              title='Soap Dispenser'
              price='$30'
              description='Hand-thrown ceramic soap dispenser.'
              onClick={() => openModal('images/soap_dispensor.jpg', 'Soap Dispenser', '$30', 'Hand-thrown ceramic soap dispenser.')}
            />
            <CardItem
              src='images/two-headed_mug.jpg'
              title='Two-Headed Mug'
              price='$40'
              description='A playful, double-headed ceramic mug.'
              onClick={() => openModal('images/two-headed_mug.jpg', 'Two-Headed Mug', '$40', 'A playful, double-headed ceramic mug.')}
            />
          </ul>
        </div>
      </div>
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        image={modalData.image}
        title={modalData.title}
        price={modalData.price}
        description={modalData.description}
      />
    </div>
  );
}

export default Cards;