import React from "react";
import "../styles/Features.css";
const Features = () => {
  return (
    <div className="features">
      <div className="feature-item">
        <img src="path/to/icon1.png" alt="Feature 1" />
        <h3>Feature 1</h3>
        <p>Description of feature 1.</p>
      </div>
      <div className="feature-item">
        <img src="path/to/icon2.png" alt="Feature 2" />
        <h3>Feature 2</h3>
        <p>Description of feature 2.</p>
      </div>
      <div className="feature-item">
        <img src="path/to/icon3.png" alt="Feature 3" />
        <h3>Feature 3</h3>
        <p>Description of feature 3.</p>
      </div>
    </div>
  );
};

export default Features;
