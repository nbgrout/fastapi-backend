import React from "react";

const TestImage = () => {
  return (
    <div>
      <h2>Test Product Image</h2>
      <img
        src="https://i.imgur.com/NdmG5hv.jpeg" // replace with your actual Imgur URL
        alt="Test Product"
        style={{ width: "300px", height: "auto", borderRadius: "8px" }}
      />
    </div>
  );
};

export default TestImage;