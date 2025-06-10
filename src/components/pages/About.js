import React from 'react';
import '../../App.css'; // Ensure your styles are imported
import './About.css'; // Import the styles specific to About component

export default function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <img
          src="/images/the_artist.jpg" // Replace with the correct path to the artist's image
          alt="Artist"
          className="about-image"
        />
        <div className="about-text">
          <h1>Wade Pharr</h1>
          <p>
            Pharr Thrown Pottery – Ely, MN
          </p>
          <p>
          Wade Pharr has worked in clay for over three decades, but he’s still chasing its mysteries. Largely self-taught and endlessly curious, Wade built his first studio in the remote woods of northern Minnesota, where he throws impossibly thin forms and coaxes vibrant color from stubborn glazes. A sculptor of dragons, a carver of snow, and a maker of everyday objects that invite daily joy, Wade moves between playful invention and meticulous craftsmanship. Whether teaching children to shape clay for the first time or crafting custom urns that hold a lifetime of memory, his work reflects both whimsy and reverence. You won’t find him chasing trends—but if you ask around Ely, you’ll hear about the guy who throws magic from mud and fire.
          </p>

        </div>
      </div>
    </div>
  );
}