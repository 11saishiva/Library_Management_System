// src/components/ui/Modal.js


import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 225, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px'
        }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px 10px'
            }}
          >
            &times;
          </button>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;