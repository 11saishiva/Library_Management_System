import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <img 
        src={book.coverImage} 
        alt={book.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{book.title}</h3>
      <p style={{ margin: '5px 0', color: '#555' }}>by {book.author}</p>
      <p style={{ margin: '5px 0', fontSize: '14px' }}>Genre: {book.genre}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <span 
          style={{ 
            display: 'inline-block', 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            backgroundColor: book.available ? '#34a853' : '#ea4335',
            marginRight: '5px'
          }}
        ></span>
        <span>{book.available ? 'Available' : 'Borrowed'}</span>
      </div>
      
      <Link 
        to={`/books/${book.id}`} 
        className="btn btn-primary"
        style={{ display: 'block', textAlign: 'center', marginTop: '15px', textDecoration: 'none' }}
      >
        View Details
      </Link>
    </div>
  );
};

export default BookItem;