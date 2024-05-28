import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>정말 체크 항목을 모두 삭제하시겠습니까?</h2>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
