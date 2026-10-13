import { Link } from "react-router-dom";
import { FiCheck, FiChevronRight, FiGlobe, FiMusic, FiRadio, FiShield, FiZap } from "react-icons/fi";
import { planOptions } from "../../data.js";
import styles from "./styles.module.css";

const features = {
  starter: ["20 GB high-speed data", "Unlimited talk and text", "5G access"],
  plus: ["30 GB high-speed data", "Unlimited talk and text", "5G access", "Mobile hotspot included"],
  max: ["Unlimited high-speed data", "Unlimited talk and text", "5G access", "50 GB mobile hotspot"],
};

const Plans = ({ currentPlan, setCurrentPlanId, addons, setAddons, notify, showModal, closeModal }) => {

  const confirmPlan = (plan) => {
    if (plan.id === currentPlan.id) return;
    showModal({
      title: "Switch to " + plan.name + "?",
      description: "Your demo account will use the selected plan and monthly price.",
      children: (
        <div className={styles.confirmPlan}>
          <div><span>New monthly plan</span><strong>{"$" + plan.price + " / month"}</strong></div>
          <div><span>Included data</span><strong>{plan.data === 999 ? "Unlimited" : plan.data + " GB"}</strong></div>
          <p>This change updates the plan shown across this preview. It does not activate a real mobile plan.</p>
          <div className={styles.confirmActions}>
            <button type="button" className="button button-secondary" onClick={closeModal}>Keep current plan</button>
            <button type="button" className="button button-primary" onClick={() => {
              setCurrentPlanId(plan.id);
              closeModal();
              notify(plan.name + " is now selected for this demo line.");
            }}>Confirm plan</button>
          </div>
        </div>
      ),
    });
  };

  const toggleAddon = (key, name, enabled) => {
    setAddons((current) => ({ ...current, [key]: !enabled }));
    notify(name + (enabled ? " removed from your demo line." : " added to your demo line."));
  };

  return (
    <div className={styles.plansPage}>
      <div className={styles.pageIntro}>
        <div><p className={styles.label}>Your plan</p><h1>A plan that fits your month.</h1><p>Compare your options, change your data allowance, and add the extras you use.</p></div>
        <div className={styles.currentLine}><span><FiRadio /></span><div><small>Current line</small><strong>(555) 013-8842</strong></div></div>
      </div>

      <section className={styles.currentPlanBand}>
        <div className={styles.currentIcon}><FiShield /></div>
        <div><p>You're currently on</p><h2>{currentPlan.name} <span>{currentPlan.data === 999 ? "Unlimited data" : currentPlan.data + " GB"}</span></h2></div>
        <div className={styles.priceNow}><strong>{"$" + currentPlan.price}</strong><span>per month</span></div>
      </section>

      <section className={styles.planSection}>
        <div className={styles.sectionTitle}><div><p className={styles.label}>Compare plans</p><h2>Choose what works for you</h2></div><span>Monthly prices before taxes</span></div>
        <div className={styles.planGrid}>
          {planOptions.map((plan) => {
            const isCurrent = plan.id === currentPlan.id;
            return (
              <article key={plan.id} className={styles.planCard + " " + styles[plan.tint] + (isCurrent ? " " + styles.current : "")}>
                <div className={styles.planTop}><span className={styles.planIcon}><FiZap /></span>{isCurrent && <span className={styles.currentTag}><FiCheck /> Current plan</span>}</div>
                <p className={styles.planDetail}>{plan.detail}</p>
                <h3>{plan.name}</h3>
                <div className={styles.planPrice}><strong>{"$" + plan.price}</strong><span>/ month</span></div>
                <div className={styles.dataAllowance}>{plan.data === 999 ? "Unlimited" : plan.data + " GB"} <span>monthly data</span></div>
                <ul>{features[plan.id].map((feature) => <li key={feature}><FiCheck />{feature}</li>)}</ul>
                <button type="button" className={isCurrent ? "button button-secondary" : "button button-primary"} disabled={isCurrent} onClick={() => { confirmPlan(plan); }}>
                  {isCurrent ? "Your current plan" : "Choose " + plan.name}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.addonsSection}>
        <div className={styles.sectionTitle}><div><p className={styles.label}>Optional extras</p><h2>Make your plan yours</h2></div><Link to="/overview">View monthly bill <FiChevronRight /></Link></div>
        <div className={styles.addonGrid}>
          <article className={styles.addonCard}>
            <span className={styles.addonIcon}><FiGlobe /></span><div className={styles.addonCopy}><h3>Travel Pass</h3><p>Use your plan in 80+ destinations with calls, texts, and high-speed data.</p><span className={styles.addonPrice}>$8 <small>/ month</small></span></div>
            <button type="button" className={addons.roam ? "button button-secondary" : "button button-primary"} aria-pressed={addons.roam} onClick={() => toggleAddon("roam", "Travel Pass", addons.roam)}>{addons.roam ? "Remove" : "Add to plan"}</button>
          </article>
          <article className={styles.addonCard}>
            <span className={styles.addonIcon + " " + styles.musicIcon}><FiMusic /></span><div className={styles.addonCopy}><h3>Vela Music</h3><p>Ad-free listening and offline downloads on your favorite devices.</p><span className={styles.addonPrice}>$6 <small>/ month</small></span></div>
            <button type="button" className={addons.music ? "button button-secondary" : "button button-primary"} aria-pressed={addons.music} onClick={() => toggleAddon("music", "Vela Music", addons.music)}>{addons.music ? "Remove" : "Add to plan"}</button>
          </article>
        </div>
      </section>

      <div className={styles.totalNote}><span>Estimated monthly total with selected extras</span><strong>{"$" + (currentPlan.price + (addons.roam ? 8 : 0) + (addons.music ? 6 : 0)).toFixed(2)} <small>before taxes</small></strong></div>
      <p className={styles.disclaimer}>Plan and add-on changes are simulated in this browser session and reset when the page is refreshed.</p>
    </div>
  );
};

export default Plans;



