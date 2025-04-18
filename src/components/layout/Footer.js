//  src/components/layout/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f0f0f0',
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      marginTop: '20px'
    }}>
      <p style={{ margin: 0 }}>
        &copy; Sai Shiva Ganesh {new Date().getFullYear()} | linkedin.com/in/sai-shiva11 | github.com/11saishiva | saiishiva123@gmail.com
      </p>
    </footer>
  );
};

export default Footer;