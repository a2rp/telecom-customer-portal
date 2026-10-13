import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const Modal = ({ modal, onClose }) => {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!modal) return undefined;
    const safeCancel = dialogRef.current?.querySelector("[data-dialog-cancel]");
    (safeCancel ?? closeRef.current)?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modal, onClose]);

  if (!modal) return null;

  return (
    <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby={modal.description ? "dialog-description" : undefined}>
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
