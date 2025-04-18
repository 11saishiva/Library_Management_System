
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { supabase } from '../../data/db';
import Card from '../ui/Card';




const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, available, borrowed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('books')
          .select('*');

        if (error) {
          throw error;
        }

        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Apply search and filters
    let results = books;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
      );
    }
    
    // Apply availability filter
    if (filter === 'available') {
      results = results.filter(book => book.available);
    } else if (filter === 'borrowed') {
      results = results.filter(book => !book.available);
    }
    
    setFilteredBooks(results);
  }, [searchTerm, filter, books]);

  if (loading) {
    return <div className="container">Loading books...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Library Books</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '60%' }}>
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        
        <div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="all">All Books</option>
            <option value="available">Available Books</option>
            <option value="borrowed">Borrowed Books</option>
          </select>
        </div>
      </div>
      
      {filteredBooks.length === 0 && (
        <div className="alert alert-danger">
          No books found matching your criteria.
        </div>
      )}
      
      <div className="book-grid">
        {filteredBooks.map(book => (
          <Card key={book.id}>
            <img 
              src={book.cover_image} 
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookList;

