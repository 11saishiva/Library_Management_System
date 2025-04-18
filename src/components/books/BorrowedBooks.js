// // ///home/sai_shiva/library-management-system old version before sricharan touched it/src/components/books/BorrowedBooks.js


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { supabase } from '../../data/db';
import Card from '../ui/Card';

// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://sydetliocmilgitkdokk.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZGV0bGlvY21pbGdpdGtkb2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzY3MzEsImV4cCI6MjA1OTYxMjczMX0.BX50_hRh_ZFC-O2JAUsXO2Er5MNdGAW4wI__W_hNBXM'

// export const supabase = createClient(supabaseUrl, supabaseKey)



const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        setLoading(true);
        
        // Get all books borrowed by the current user that haven't been returned
        const { data, error } = await supabase
          .from('borrowed_books')
          .select(`
            id,
            borrowed_date,
            due_date,
            books (
              id,
              title,
              author,
              genre,
              cover_image
            )
          `)
          .eq('user_id', user.id)
          .is('returned_date', null);
        
        if (error) {
          throw error;
        }

        // Transform data structure to match component expectations
        const formattedBooks = data.map(item => ({
          id: item.books.id,
          title: item.books.title,
          author: item.books.author,
          genre: item.books.genre,
          coverImage: item.books.cover_image,
          dueDate: item.due_date,
          borrowedDate: item.borrowed_date,
          borrowId: item.id
        }));
        
        setBorrowedBooks(formattedBooks);
      } catch (err) {
        console.error('Error fetching borrowed books:', err);
        setError('Failed to load borrowed books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchBorrowedBooks();
    }
  }, [user]);

  const calculateDaysRemaining = (dueDateStr) => {
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    
    // Reset time part for accurate day calculation
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  if (loading) {
    return <div className="container">Loading your borrowed books...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2>My Borrowed Books</h2>
      
      {borrowedBooks.length === 0 ? (
        <div className="alert alert-danger">
          You haven't borrowed any books yet.
        </div>
      ) : (
        <div className="book-grid">
          {borrowedBooks.map(book => {
            const daysRemaining = calculateDaysRemaining(book.dueDate);
            let statusColor = 'green';
            
            if (daysRemaining < 0) {
              statusColor = 'red';
            } else if (daysRemaining < 3) {
              statusColor = 'orange';
            }
            
            return (
              <Card key={book.id}>
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{book.title}</h3>
                <p style={{ margin: '5px 0', color: '#555' }}>by {book.author}</p>
                
                <div style={{ marginTop: '10px' }}>
                  <p>
                    <strong>Due Date:</strong>{' '}
                    {new Date(book.dueDate).toLocaleDateString()}
                  </p>
                  <p style={{ color: statusColor }}>
                    <strong>Status:</strong>{' '}
                    {daysRemaining < 0 
                      ? `Overdue by ${Math.abs(daysRemaining)} days` 
                      : `${daysRemaining} days remaining`
                    }
                  </p>
                </div>
                
                <Link 
                  to={`/books/${book.id}`} 
                  className="btn btn-primary"
                  style={{ display: 'block', textAlign: 'center', marginTop: '15px', textDecoration: 'none' }}
                >
                  View Details
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;

