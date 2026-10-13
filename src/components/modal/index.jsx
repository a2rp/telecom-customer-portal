import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const Modal = ({ modal, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!modal) return undefined;
    closeRef.current?.focus();
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modal, onClose]);

  if (!modal) return null;

  return (
    <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <div className={styles.heading}>
          <div><h2 id="dialog-title">{modal.title}</h2>{modal.description && <p id="dialog-description">{modal.description}</p>}</div>
          <button ref={closeRef} type="button" className={styles.closeButton} aria-label="Close dialog" onClick={onClose}><FiX /></button>
        </div>
        <div className={styles.content}>{modal.children}</div>
      </section>
    </div>
  );
};

export default Modal;
