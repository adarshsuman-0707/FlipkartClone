import React from 'react';
import '../StyleSheet/NorFound.css'; // Import the CSS file

function NotFound() {
  return (
    <div className="notfound-container">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
}

export default NotFound;
