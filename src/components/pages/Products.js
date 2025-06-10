import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import '../Cards.css';
import CardItem from '../CardItem';
import { useCart } from '../../contexts/CartContext';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/1UCvIeiyIjGi1XnBfsMRa_ifSRc6-7B9lm_HKicbq8iw/gviz/tq?tqx=out:csv&sheet=Gallery'
        );
        const text = await response.text();
        const rows = text.split('\n').slice(1);

        const parsedProducts = rows
          .map((row) => {
            const [
              id,
              name,
              description,
              qtyMade,
              qtySold,
              price,
              imgUrl,
              imgId,
              status,
              lastPurchased,
              available
            ] = row.split(',');

            const sanitizedImgUrl = imgUrl?.trim().replace(/^"|"$/g, '');
            const trimmedId = id?.trim().replace(/^"|"$/g, '').toLowerCase();

            if (!trimmedId || !sanitizedImgUrl) return null;

            return {
              id: trimmedId,
              name: name?.trim(),
              description: description?.trim(),
              qtyMade: qtyMade?.trim(),
              qtySold: parseInt(qtySold?.trim(), 10) || 0,
              available: available?.trim(),
              price: price?.trim(),
              img_url: sanitizedImgUrl,
              status: status?.trim()
            };
          })
          .filter(Boolean);

        setProducts(parsedProducts);
      } catch (err) {
        console.error('Failed to load product data:', err);
      }
    };

    fetchProducts();
  }, []);

  const handlePurchase = async (id) => {
    console.log("Clicked purchase for ID:", id);

    try {
      console.log("Sending purchase for product_id:", id, typeof id);
      console.log("Request body:", JSON.stringify({ product_id: id, amount: 1 }));
      const response = await fetch('http://localhost:8000/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: id,
          amount: 1
        }),
      });

      console.log("Request sent to /purchase");

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Backend response:", result);
        addToCart();
      } else {
        console.error("❌ Purchase failed:", response.status, result);
      }
    } catch (error) {
      console.error("⚠️ Network or fetch error:", error);
    }
  };

  return (
    <div className="cards">
      <h1>Gallery</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {products.reduce((rows, product, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(product);
            return rows;
          }, []).map((row, rowIndex) => (
            <ul className="cards__items" key={rowIndex}>
              {row.map((product) => (
                <CardItem
                  key={product.id}
                  src={product.img_url}
                  title={product.name}
                  text={product.description}
                  price={product.price}
                  available={product.available}
                  onClick={() =>
                    navigate(`/products/${product.id}`, { state: { product } })
                  }
                  purchase={() => handlePurchase(product.id)}
                />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}