import React from 'react';

const Card = ({ children, style }) => {
  return (
    <div 
      style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Card;