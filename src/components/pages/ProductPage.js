import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import './ProductPage.css';
import { useCart } from '../../contexts/CartContext';

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/1UCvIeiyIjGi1XnBfsMRa_ifSRc6-7B9lm_HKicbq8iw/gviz/tq?tqx=out:csv&sheet=Gallery';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [localSoldCount, setLocalSoldCount] = useState(
    location.state?.product?.qtySold ? parseInt(location.state.product.qtySold, 10) : 0
  );

  useEffect(() => {
    if (product) return;

    const normalizeRow = (row) =>
      Object.fromEntries(Object.entries(row).map(([k, v]) => [k.toLowerCase(), v]));

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (result) => {
        const rows = result.data.map(normalizeRow);
        const normalizedId = String(id || '').trim().toLowerCase();
        const found = rows.find(
          (row) => String(row.id || '').trim().toLowerCase() === normalizedId
        );

        setProduct(found || null);
        if (found?.qtysold) setLocalSoldCount(parseInt(found.qtysold, 10));
        setLoading(false);
      },
      error: (error) => {
        console.error('CSV load error:', error);
        setLoading(false);
      },
    });
  }, [id, product]);

  const handleBack = () => navigate('/products');

  const clean = (val) => (typeof val === 'string' ? val.trim().replace(/^"|"$/g, '') : '');

  const convertDriveUrl = (url) => {
    const match = url.match(/\/file\/d\/(.*?)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  };

  const handlePurchase = () => {
    setLocalSoldCount((prev) => prev + 1);
    addToCart(1);
  };

  if (loading) return <p>Loading...</p>;

  if (!product) {
    return (
      <div className="product-page-container">
        <h2>Product not found</h2>
        <button className="return-to-gallery-button" onClick={handleBack}>
          Return to Gallery
        </button>
      </div>
    );
  }

  const imgSrc = convertDriveUrl(clean(product.img_url));
  const availability = `Made: ${clean(product.qtymade)} | Sold: ${localSoldCount}`;

  return (
    <div className="product-page-container">
      <div className="product-content">
        <div className="product-image">
          <img src={imgSrc} alt={clean(product.name)} />
        </div>
        <div className="product-details">
          <h1>{clean(product.name)}</h1>
          <ul>
            <li><strong>Price:</strong> {clean(product.price)}</li>
            <li><strong>Description:</strong> {clean(product.descr || product.description)}</li>
            <li><strong>Availability:</strong> {availability}</li>
            <li><strong>Status:</strong> {clean(product.status)}</li>
          </ul>
          <div className="button-group">
            <button className="return-to-gallery-button" onClick={handleBack}>
              Return to Gallery
            </button>
            <button className="purchase-button" onClick={handlePurchase}>
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;