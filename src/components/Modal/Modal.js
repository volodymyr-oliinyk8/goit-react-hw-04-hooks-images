import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modal = document.getElementById('modal');

function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc);
    return () => {
      window.removeEventListener('keydown', closeModalEsc);
    };
  });
  const closeModalEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modal,
  );
}

export default Modal;
