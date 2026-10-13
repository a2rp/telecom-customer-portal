import { FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";
import styles from "./styles.module.css";

const icons = { success: FiCheckCircle, error: FiXCircle, info: FiInfo };

const Toast = ({ toasts, onDismiss }) => (
  <div className={styles.toastStack} aria-live="polite" aria-relevant="additions removals">
    {toasts.map((toast) => {
      const Icon = icons[toast.type] ?? icons.success;
      return (
        <div key={toast.id} className={styles.toast + " " + (styles[toast.type] ?? "")} role="status">
          <Icon aria-hidden="true" /><span>{toast.message}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}><FiX /></button>
        </div>
      );
    })}
  </div>
);

export default Toast;
