import { useState } from "react";
import Header from "./components/header/index.jsx";
import Footer from "./components/footer/index.jsx";
import Modal from "./components/modal/index.jsx";
import Toast from "./components/toast/index.jsx";
import ScrollToTop from "./components/scrollToTop/index.jsx";
import AppRoutes from "./AppRoutes.jsx";
import styles from "./App.module.css";
import { planOptions, initialTickets } from "./data.js";

const App = () => {
  const [currentPlanId, setCurrentPlanId] = useState("plus");
  const [dataUsed, setDataUsed] = useState(18.6);
  const [addons, setAddons] = useState({ roam: false, music: true });
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [autoPay, setAutoPay] = useState(true);
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [tickets, setTickets] = useState(initialTickets);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const currentPlan = planOptions.find((plan) => plan.id === currentPlanId) ?? planOptions[1];
  const monthlyTotal = currentPlan.price + (addons.roam ? 8 : 0) + (addons.music ? 6 : 0) + 5.45;

  const notify = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4600);
  };

  const dismissToast = (id) => setToasts((items) => items.filter((item) => item.id !== id));
  const showModal = (content) => setModal(content);
  const closeModal = () => setModal(null);

  const shared = {
    currentPlan, setCurrentPlanId, dataUsed, setDataUsed, addons, setAddons,
    alertsEnabled, setAlertsEnabled, autoPay, setAutoPay, invoicePaid,
    setInvoicePaid, monthlyTotal, tickets, setTickets, notify, showModal, closeModal,
  };

  return (
    <div className={styles.appShell}>
      <Header notify={notify} showModal={showModal} />
      <main id="main-content" className={styles.mainContent}><AppRoutes shared={shared} /></main>
      <Footer />
      <Modal modal={modal} onClose={closeModal} />
      <Toast toasts={toasts} onDismiss={dismissToast} />
      <ScrollToTop />
    </div>
  );
};

export default App;
