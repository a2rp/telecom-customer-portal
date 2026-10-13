import { Link } from "react-router-dom";
import { FiArrowDownRight, FiArrowUpRight, FiCalendar, FiCheck, FiChevronRight, FiCreditCard, FiHeadphones, FiRadio, FiWifi } from "react-icons/fi";
import styles from "./styles.module.css";

const Overview = ({ currentPlan, dataUsed, monthlyTotal, invoicePaid, setInvoicePaid, autoPay, setAutoPay, tickets, notify, showModal, closeModal }) => {
  const usagePercent = Math.min(100, Math.round((dataUsed / currentPlan.data) * 100));
  const billAmount = invoicePaid ? 0 : monthlyTotal;
  const activeCases = tickets.filter((ticket) => ticket.status !== "Resolved").length;

  const openPayment = () => showModal({
    title: "Review demo payment",
    description: "This preview records a sample payment in this browser session. No payment is processed.",
    children: (
      <div className={styles.paymentDetails}>
        <div><span>Current amount due</span><strong>{"$" + billAmount.toFixed(2)}</strong></div>
        <div><span>Payment method</span><strong>Visa ending in 2048</strong></div>
        <div className={styles.demoNote}>Demo only. No card details are collected and no charge will be made.</div>
        <div className={styles.modalActions}>
          <button type="button" className="button button-secondary" onClick={closeModal}>Cancel</button>
          <button type="button" className="button button-primary" onClick={() => {
            setInvoicePaid(true);
            closeModal();
            notify("Demo payment recorded. Your balance is now clear.");
          }}>Record sample payment</button>
        </div>
      </div>
    ),
  });

  const openBill = () => showModal({
    title: "October statement",
    description: "A sample bill summary for your Vela line.",
    children: (
      <div className={styles.billDetails}>
        <div><span>Monthly plan - {currentPlan.name}</span><strong>{"$" + currentPlan.price.toFixed(2)}</strong></div>
        <div><span>Vela Music add-on</span><strong>$6.00</strong></div>
        <div><span>Taxes and fees</span><strong>$5.45</strong></div>
        <div className={styles.billTotal}><span>October total</span><strong>{"$" + monthlyTotal.toFixed(2)}</strong></div>
        <p>Statement period: Oct 1 - Oct 31, 2026</p>
      </div>
    ),
  });

  return (
    <div className={styles.overview}>
      <section className={styles.welcome}>
        <div className={styles.welcomeCopy}>
          <div className={styles.lineStatus}><span /> Your line is active</div>
          <h1>Good morning, Jordan.</h1>
          <p>Your mobile life, all in one place.</p>
          <div className={styles.welcomeActions}>
            <Link className="button button-primary" to="/usage"><FiWifi /> View my usage</Link>
            <Link className={styles.lightLink} to="/support">Get support <FiChevronRight /></Link>
          </div>
        </div>
        <div className={styles.phoneCard}>
          <div className={styles.phoneCardTop}><span><FiRadio /> Primary line</span><span className={styles.activeBadge}>Active</span></div>
          <strong>(555) 013-8842</strong>
          <p>Brooklyn, New York</p>
          <div className={styles.phoneDivider} />
          <div className={styles.dataSummary}>
            <div><span>Data used</span><strong>{dataUsed.toFixed(1)} <small>GB</small></strong></div>
            <span>of {currentPlan.data === 999 ? "unlimited" : currentPlan.data + " GB"}</span>
          </div>
          <div className={styles.progressTrack}><span style={{ width: usagePercent + "%" }} /></div>
          <div className={styles.progressFoot}><span>{usagePercent}% used</span><Link to="/usage">Usage details <FiArrowUpRight /></Link></div>
        </div>
        <div className={styles.signalRing} aria-hidden="true"><i /><i /><i /></div>
      </section>

      <section className={styles.pageHeading}>
        <div><p className={styles.sectionLabel}>Your account</p><h2>Everything on your line, at a glance</h2></div>
        <span className={styles.updated}><FiCalendar /> Updated just now</span>
      </section>

      <section className={styles.summaryGrid} aria-label="Account summary">
        <article className={styles.summaryCard}>
          <div className={styles.cardTop}><span className={styles.iconBubble}><FiCreditCard /></span><span className={invoicePaid ? styles.paidLabel : styles.dueLabel}>{invoicePaid ? "Paid" : "Due Oct 20"}</span></div>
          <p>{invoicePaid ? "October balance" : "Next bill"}</p>
          <strong>{"$" + billAmount.toFixed(2)}</strong>
          <div className={styles.cardFoot}>
            <button type="button" className={styles.textButton} onClick={openBill}>Statement details <FiChevronRight /></button>
            {!invoicePaid && <button type="button" className="button button-primary" onClick={openPayment}>Pay bill</button>}
          </div>
        </article>
        <article className={styles.summaryCard}>
          <div className={styles.cardTop}><span className={styles.iconBubble}><FiWifi /></span><span className={styles.renewalLabel}>Renews Nov 1</span></div>
          <p>Current plan</p>
          <strong className={styles.planName}>{currentPlan.name}</strong>
          <div className={styles.cardFoot}><span className={styles.muted}>{"$" + currentPlan.price} / month</span><Link className={styles.textButton} to="/plans">Manage plan <FiChevronRight /></Link></div>
        </article>
        <article className={styles.summaryCard}>
          <div className={styles.cardTop}><span className={styles.iconBubble}><FiHeadphones /></span><span className={styles.openCases}>{activeCases} active</span></div>
          <p>Support cases</p>
          <strong>{activeCases}</strong>
          <div className={styles.cardFoot}><span className={styles.muted}>Latest update today</span><Link className={styles.textButton} to="/support">View cases <FiChevronRight /></Link></div>
        </article>
      </section>

      <section className={styles.lowerGrid}>
        <article className={styles.billingPanel}>
          <div className={styles.panelHeading}><div><p className={styles.sectionLabel}>Payment settings</p><h2>Keep your account on track</h2></div><span className={styles.miniIcon}><FiCheck /></span></div>
          <p className={styles.panelDescription}>{autoPay ? "AutoPay is set to charge your Visa ending in 2048 on your due date." : "AutoPay is off. You can make each payment manually."}</p>
          <div className={styles.paymentMethod}><span className={styles.visaMark}>VISA</span><span>Visa ending in <strong>2048</strong><small>Expires 08/28</small></span><button type="button" className={styles.textButton} onClick={() => showModal({
            title: "Payment method",
            description: "Your saved demo payment method.",
            children: <div className={styles.paymentDetails}><div><span>Card</span><strong>Visa ending in 2048</strong></div><div><span>Expiration</span><strong>08/28</strong></div><p className={styles.demoNote}>This is sample account information for the frontend preview.</p><button className="button button-secondary" type="button" onClick={() => { closeModal(); notify("Payment method details reviewed."); }}>Done</button></div>,
          })}>Details</button></div>
          <div className={styles.settingRow}>
            <div><strong>AutoPay</strong><span>Pay your statement automatically each month</span></div>
            <button type="button" className={styles.switch + (autoPay ? " " + styles.switchOn : "")} role="switch" aria-checked={autoPay} aria-label="Toggle AutoPay" onClick={() => { setAutoPay((value) => !value); notify(autoPay ? "AutoPay turned off." : "AutoPay turned on."); }}><i /></button>
          </div>
        </article>
        <article className={styles.activityPanel}>
          <div className={styles.panelHeading}><div><p className={styles.sectionLabel}>Recent account activity</p><h2>What's changed</h2></div><Link className={styles.textButton} to="/support">All activity <FiChevronRight /></Link></div>
          <div className={styles.activityList}>
            <div><span className={styles.activityIcon}><FiCheck /></span><div><strong>Payment method verified</strong><span>Visa ending in 2048 is ready to use</span></div><time>Today</time></div>
            <div><span className={styles.activityIcon}><FiArrowDownRight /></span><div><strong>Data renewed</strong><span>{currentPlan.data} GB plan renewed Oct 1</span></div><time>Oct 1</time></div>
            <div><span className={styles.activityIcon}><FiArrowUpRight /></span><div><strong>Travel support updated</strong><span>We replied to case VL-2048</span></div><time>Yesterday</time></div>
          </div>
        </article>
      </section>
      <p className={styles.disclaimer}>This is a frontend demo. Account, billing, and usage information is sample data.</p>
    </div>
  );
};

export default Overview;


