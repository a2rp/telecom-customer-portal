import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiActivity, FiChevronDown, FiCircle, FiCreditCard, FiHeadphones, FiMenu, FiPackage, FiRadio, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.css";

const links = [
  { to: "/overview", label: "Overview", icon: FiCircle },
  { to: "/usage", label: "Data usage", icon: FiActivity },
  { to: "/plans", label: "Plans", icon: FiPackage },
  { to: "/support", label: "Support", icon: FiHeadphones },
];

const Header = ({ notify, showModal }) => {
  const [hidden, setHidden] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > 90 && current > lastScroll.current + 4 && !mobileOpen);
      if (current < 24 || current < lastScroll.current - 4) setHidden(false);
      lastScroll.current = current;
    };
    const onPointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setAccountOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") { setAccountOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const openProfile = () => {
    setAccountOpen(false);
    showModal({
      title: "Your Vela account",
      description: "Account holder and line details for this frontend demo.",
      children: (
        <div className={styles.profileDetails}>
          <div><span>Account holder</span><strong>Jordan Lee</strong></div>
          <div><span>Mobile line</span><strong>(555) 013-8842</strong></div>
          <div><span>Account number</span><strong>VL-8301-4472</strong></div>
          <div><span>Billing address</span><strong>Brooklyn, New York</strong></div>
          <button type="button" className="button button-secondary" onClick={() => {
            navigator.clipboard?.writeText("VL-8301-4472");
            notify("Account number copied.");
          }}>Copy account number</button>
        </div>
      ),
    });
  };

  return (
    <header className={styles.header + (hidden ? " " + styles.hidden : "")}>
      <div className={styles.headerInner}>
        <NavLink to="/overview" className={styles.brand} aria-label="Vela Mobile home">
          <span className={styles.brandMark}><FiRadio aria-hidden="true" /></span>
          <span>vela<span className={styles.brandDot}>.</span></span>
        </NavLink>
        <button type="button" className={styles.mobileToggle} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={styles.navigation + (mobileOpen ? " " + styles.navigationOpen : "")} aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => styles.navLink + (isActive ? " " + styles.active : "")}>
              <Icon aria-hidden="true" /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions} ref={menuRef}>
          <a className={styles.repository} href="https://github.com/a2rp/telecom-customer-portal" target="_blank" rel="noreferrer" aria-label="Repository on GitHub">
            <FaGithub aria-hidden="true" /><span>Repository</span>
          </a>
          <button type="button" className={styles.accountButton} aria-expanded={accountOpen} onClick={() => setAccountOpen((value) => !value)}>
            <span className={styles.avatar}>JL</span><span className={styles.accountName}>Jordan Lee</span><FiChevronDown aria-hidden="true" />
          </button>
          {accountOpen && (
            <div className={styles.accountMenu} role="menu">
              <div className={styles.menuHeading}>Vela account <small>Line ending in 8842</small></div>
              <button type="button" role="menuitem" onClick={openProfile}>Account details</button>
              <button type="button" role="menuitem" onClick={() => { setAccountOpen(false); notify("Your line is active and ready."); }}>Check line status</button>
              <button type="button" role="menuitem" onClick={() => { setAccountOpen(false); notify("No new account alerts."); }}><FiCreditCard aria-hidden="true" /> Billing notifications</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
