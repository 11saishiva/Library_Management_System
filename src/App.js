// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Auth/AuthContext.js';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import BookList from './components/books/BookList.js';
import BookDetail from './components/books/BookDetail.js';
import BorrowedBooks from './components/books/BorrowedBooks.js';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <BookList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/books/:id" 
                element={
                  <ProtectedRoute>
                    <BookDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/borrowed" 
                element={
                  <ProtectedRoute>
                    <BorrowedBooks />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
