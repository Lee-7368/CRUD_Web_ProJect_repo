import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Delete</h1>
        <h4>Do you really want me to delete it?</h4>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
