// // ///home/sai_shiva/library-management-system old version before sricharan touched it/src/components/books/BookDetail.js

// // export default BookDetail;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../Auth/AuthContext';
// //import { supabase } from '../data/db';
// import Card from '../ui/Card';
// import Modal from '../ui/Modal';

// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://sydetliocmilgitkdokk.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZGV0bGlvY21pbGdpdGtkb2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzY3MzEsImV4cCI6MjA1OTYxMjczMX0.BX50_hRh_ZFC-O2JAUsXO2Er5MNdGAW4wI__W_hNBXM'

// export const supabase = createClient(supabaseUrl, supabaseKey)


// const BookDetail = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [borrowRecord, setBorrowRecord] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [modalAction, setModalAction] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         setLoading(true);
//         setError('');
        
//         // Fetch book details
//         const { data: bookData, error: bookError } = await supabase
//           .from('books')
//           .select('*')
//           .eq('id', id)
//           .single();
        
//         if (bookError) {
//           throw bookError;
//         }
        
//         if (!bookData) {
//           setError('Book not found');
//           return;
//         }
        
//         setBook(bookData);
        
//         // Check if the book is borrowed by the current user
//         if (user && !bookData.available) {
//           const { data: borrowData, error: borrowError } = await supabase
//             .from('borrowed_books')
//             .select('*')
//             .eq('book_id', id)
//             .eq('user_id', user.id)
//             .is('returned_date', null)
//             .single();
          
//           if (!borrowError) {
//             setBorrowRecord(borrowData);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching book details:', err);
//         setError('Failed to load book details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchBookDetails();
//   }, [id, user]);

//   const handleBorrowBook = () => {
//     setModalAction('borrow');
//     setShowConfirmModal(true);
//   };

//   const handleReturnBook = () => {
//     setModalAction('return');
//     setShowConfirmModal(true);
//   };

//   const confirmAction = async () => {
//     try {
//       if (modalAction === 'borrow') {
//         // Calculate due date (14 days from now)
//         const dueDate = new Date();
//         dueDate.setDate(dueDate.getDate() + 14);
        
//         // Insert new borrow record
//         const { data, error } = await supabase
//           .from('borrowed_books')
//           .insert([{
//             book_id: book.id,
//             user_id: user.id,
//             due_date: dueDate.toISOString()
//           }])
//           .select()
//           .single();
        
//         if (error) {
//           throw error;
//         }
        
//         setBorrowRecord(data);
        
//         // Book availability will be updated automatically by the database trigger
//         setBook({...book, available: false});
        
//         setSuccessMessage('Book borrowed successfully. Due date: ' + new Date(dueDate).toLocaleDateString());
//       } else if (modalAction === 'return') {
//         // Update borrow record with return date
//         const { error } = await supabase
//           .from('borrowed_books')
//           .update({ returned_date: new Date().toISOString() })
//           .eq('id', borrowRecord.id);
        
//         if (error) {
//           throw error;
//         }
        
//         // Book availability will be updated automatically by the database trigger
//         setBook({...book, available: true});
//         setBorrowRecord(null);
        
//         setSuccessMessage('Book returned successfully.');
//       }
//     } catch (err) {
//       console.error('Error with book operation:', err);
//       setError('An error occurred. Please try again.');
//     } finally {
//       // Close modal
//       setShowConfirmModal(false);
//     }
//   };

//   if (loading) {
//     return <div className="container">Loading book details...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!book) {
//     return <div className="container alert alert-danger">Book not found</div>;
//   }

//   const isBookBorrowedByUser = borrowRecord !== null;

//   return (
//     <div className="container">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="btn"
//         style={{ marginBottom: '20px' }}
//       >
//         &larr; Back
//       </button>
      
//       {successMessage && (
//         <div className="alert alert-success">{successMessage}</div>
//       )}
      
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//         <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//           <div style={{ flex: '0 0 200px' }}>
//             <img 
//               src={book.cover_image} 
//               alt={book.title} 
//               style={{ width: '100%', borderRadius: '8px' }}
//             />
//           </div>
          
//           <div style={{ flex: '1 1 400px' }}>
//             <h1>{book.title}</h1>
//             <h3>by {book.author}</h3>
            
//             <div style={{ marginTop: '20px' }}>
//               <p><strong>Genre:</strong> {book.genre}</p>
//               <p><strong>Year:</strong> {book.year}</p>
//               <p><strong>ISBN:</strong> {book.isbn}</p>
//               <p>
//                 <strong>Status:</strong>{' '}
//                 <span style={{ color: book.available ? 'green' : 'red' }}>
//                   {book.available ? 'Available' : 'Borrowed'}
//                 </span>
//               </p>
              
//               {isBookBorrowedByUser && borrowRecord.due_date && (
//                 <p>
//                   <strong>Due Date:</strong>{' '}
//                   {new Date(borrowRecord.due_date).toLocaleDateString()}
//                 </p>
//               )}
//             </div>
            
//             <div style={{ marginTop: '20px' }}>
//               {book.available ? (
//                 <button 
//                   className="btn btn-primary" 
//                   onClick={handleBorrowBook}
//                 >
//                   Borrow Book
//                 </button>
//               ) : (
//                 isBookBorrowedByUser && (
//                   <button 
//                     className="btn btn-success" 
//                     onClick={handleReturnBook}
//                   >
//                     Return Book
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
        
//         <Card>
//           <h3>Description</h3>
//           <p>{book.description}</p>
//         </Card>
//       </div>
      
//       <Modal 
//         show={showConfirmModal} 
//         onClose={() => setShowConfirmModal(false)}
//         title={modalAction === 'borrow' ? 'Confirm Borrowing' : 'Confirm Return'}
//       >
//         <p>
//           {modalAction === 'borrow' 
//             ? `Are you sure you want to borrow "${book.title}"?` 
//             : `Are you sure you want to return "${book.title}"?`
//           }
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
//           <button 
//             className="btn" 
//             onClick={() => setShowConfirmModal(false)}
//           >
//             Cancel
//           </button>
//           <button 
//             className={`btn ${modalAction === 'borrow' ? 'btn-primary' : 'btn-success'}`} 
//             onClick={confirmAction}
//           >
//             {modalAction === 'borrow' ? 'Confirm Borrow' : 'Confirm Return'}
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default BookDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { supabase } from '../../data/db';  // Import from a single source

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [borrowRecord, setBorrowRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch book details
        const { data: bookData, error: bookError } = await supabase
          .from('books')
          .select('*')
          .eq('id', id)
          .single();
        
        if (bookError) {
          throw bookError;
        }
        
        if (!bookData) {
          setError('Book not found');
          return;
        }
        
        setBook(bookData);
        
        // Check if the book is borrowed by the current user
        if (user) {
          const { data: borrowData, error: borrowError } = await supabase
            .from('borrowed_books')
            .select('*')
            .eq('book_id', id)
            .eq('user_id', user.id)
            .is('returned_date', null)
            .single();
          
          if (!borrowError && borrowData) {
            setBorrowRecord(borrowData);
          }
        }
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchBookDetails();
    }
  }, [id, user]);

  const handleBorrowBook = () => {
    setModalAction('borrow');
    setShowConfirmModal(true);
  };

  const handleReturnBook = () => {
    setModalAction('return');
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    try {
      if (modalAction === 'borrow') {
        // Calculate due date (14 days from now)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        
        // Insert new borrow record
        const { data, error } = await supabase
          .from('borrowed_books')
          .insert([{
            book_id: book.id,
            user_id: user.id,
            borrowed_date: new Date().toISOString(),
            due_date: dueDate.toISOString(),
            returned_date: null
          }])
          .select();
        
        if (error) {
          throw error;
        }
        
        // Set the borrow record and update book status
        setBorrowRecord(data[0]);
        setBook({...book, available: false});
        
        setSuccessMessage('Book borrowed successfully. Due date: ' + new Date(dueDate).toLocaleDateString());
      } else if (modalAction === 'return' && borrowRecord) {
        // Update borrow record with return date
        const { error } = await supabase
          .from('borrowed_books')
          .update({ returned_date: new Date().toISOString() })
          .eq('id', borrowRecord.id);
        
        if (error) {
          throw error;
        }
        
        // Update book availability
        setBook({...book, available: true});
        setBorrowRecord(null);
        
        setSuccessMessage('Book returned successfully.');
      }
    } catch (err) {
      console.error('Error with book operation:', err);
      setError('An error occurred: ' + err.message);
    } finally {
      // Close modal
      setShowConfirmModal(false);
    }
  };

  if (loading) {
    return <div className="container">Loading book details...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">{error}</div>;
  }

  if (!book) {
    return <div className="container alert alert-danger">Book not found</div>;
  }

  const isBookBorrowedByUser = borrowRecord !== null;

  return (
    <div className="container">
      <button 
        onClick={() => navigate(-1)} 
        className="btn"
        style={{ marginBottom: '20px' }}
      >
        &larr; Back
      </button>
      
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 200px' }}>
            <img 
              src={book.cover_image} 
              alt={book.title} 
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          
          <div style={{ flex: '1 1 400px' }}>
            <h1>{book.title}</h1>
            <h3>by {book.author}</h3>
            
            <div style={{ marginTop: '20px' }}>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{ color: book.available ? 'green' : 'red' }}>
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
              </p>
              
              {isBookBorrowedByUser && borrowRecord.due_date && (
                <p>
                  <strong>Due Date:</strong>{' '}
                  {new Date(borrowRecord.due_date).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div style={{ marginTop: '20px' }}>
              {book.available ? (
                <button 
                  className="btn btn-primary" 
                  onClick={handleBorrowBook}
                >
                  Borrow Book
                </button>
              ) : (
                isBookBorrowedByUser && (
                  <button 
                    className="btn btn-success" 
                    onClick={handleReturnBook}
                  >
                    Return Book
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        
        <Card>
          <h3>Description</h3>
          <p>{book.description}</p>
        </Card>
      </div>
      
      <Modal 
        show={showConfirmModal} 
        onClose={() => setShowConfirmModal(false)}
        title={modalAction === 'borrow' ? 'Confirm Borrowing' : 'Confirm Return'}
      >
        <p>
          {modalAction === 'borrow' 
            ? `Are you sure you want to borrow "${book.title}"?` 
            : `Are you sure you want to return "${book.title}"?`
          }
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button 
            className="btn" 
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button 
            className={`btn ${modalAction === 'borrow' ? 'btn-primary' : 'btn-success'}`} 
            onClick={confirmAction}
          >
            {modalAction === 'borrow' ? 'Confirm Borrow' : 'Confirm Return'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetail;