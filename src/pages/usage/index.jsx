import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiActivity, FiBell, FiChevronDown, FiChevronRight, FiDownload, FiGlobe, FiMap, FiMusic, FiVideo, FiWifi } from "react-icons/fi";
import { usageBars } from "../../data.js";
import styles from "./styles.module.css";

const usageRows = [
  { day: "Today, 10:42 AM", app: "Streamly", type: "Video", amount: 1.2, icon: FiVideo },
  { day: "Today, 9:18 AM", app: "Citymapper", type: "Navigation", amount: 0.2, icon: FiMap },
  { day: "Yesterday, 8:06 PM", app: "Soundwave", type: "Music", amount: 0.6, icon: FiMusic },
  { day: "Yesterday, 6:44 PM", app: "Socially", type: "Social", amount: 1.4, icon: FiGlobe },
  { day: "Oct 11, 2:31 PM", app: "Streamly", type: "Video", amount: 2.1, icon: FiVideo },
  { day: "Oct 10, 11:09 AM", app: "Cloud backup", type: "Other", amount: 0.8, icon: FiWifi },
  { day: "Oct 09, 7:20 PM", app: "Soundwave", type: "Music", amount: 0.5, icon: FiMusic },
  { day: "Oct 08, 5:55 PM", app: "Socially", type: "Social", amount: 1.0, icon: FiGlobe },
];

const categories = [
  { name: "Video", amount: 8.3, share: 45, icon: FiVideo, tone: "coral" },
  { name: "Social", amount: 3.4, share: 18, icon: FiGlobe, tone: "blue" },
  { name: "Music", amount: 2.1, share: 11, icon: FiMusic, tone: "purple" },
  { name: "Navigation", amount: 1.4, share: 8, icon: FiMap, tone: "green" },
  { name: "Other", amount: 3.4, share: 18, icon: FiWifi, tone: "slate" },
];

const Usage = ({ currentPlan, dataUsed, alertsEnabled, setAlertsEnabled, notify }) => {
  const [range, setRange] = useState("7 days");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Recent first");
  const percent = currentPlan.data === 999 ? 18 : Math.min(100, Math.round((dataUsed / currentPlan.data) * 100));
  const filteredRows = useMemo(() => {
    let rows = usageRows.filter((row) => category === "All categories" || row.type === category);
    if (range === "Today") rows = rows.filter((row) => row.day.startsWith("Today"));
    if (range === "7 days") rows = rows.slice(0, 7);
    if (sort === "Most data") rows = [...rows].sort((a, b) => b.amount - a.amount);
    return rows;
  }, [category, range, sort]);

  const downloadUsage = () => {
    const csv = ["Date,Service,Category,Data (GB)", ...filteredRows.map((row) => [row.day, row.app, row.type, row.amount].join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vela-usage-summary.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    notify("Usage summary downloaded.");
  };

  return (
    <div className={styles.usagePage}>
      <div className={styles.pageIntro}><div><p className={styles.label}>Your data</p><h1>Usage, made clear.</h1><p>See how your line is using data and keep your month on track.</p></div><Link to="/plans" className="button button-primary">Explore data options <FiChevronRight /></Link></div>
      <section className={styles.usageHero}>
        <div className={styles.usageMain}>
          <div className={styles.heroTop}><span className={styles.usageIcon}><FiActivity /></span><span>Current billing cycle</span><span className={styles.cycleDates}>Oct 1 - Oct 31</span></div>
          <div className={styles.usageNumber}><strong>{dataUsed.toFixed(1)}</strong><span>GB used</span></div>
          <div className={styles.usageBar} aria-label={percent + "% of monthly data used"}><span style={{ width: percent + "%" }} /></div>
          <div className={styles.barLabels}><span>{percent}% of plan used</span><span>{currentPlan.data === 999 ? "Unlimited data" : (currentPlan.data - dataUsed).toFixed(1) + " GB remaining"}</span></div>
          <div className={styles.cycleNote}>Your data allowance renews Nov 1</div>
        </div>
        <div className={styles.planSide}><span>Your plan</span><strong>{currentPlan.name}</strong><div><span>Monthly data</span><b>{currentPlan.data === 999 ? "Unlimited" : currentPlan.data + " GB"}</b></div><div><span>Cycle ends</span><b>Nov 1, 2026</b></div><Link to="/plans">Plan details <FiChevronRight /></Link></div>
        <div className={styles.heroOrbit} aria-hidden="true"><i /><i /><i /></div>
      </section>

      <section className={styles.contentGrid}>
        <article className={styles.chartPanel}>
          <div className={styles.panelHead}><div><p className={styles.label}>Data over time</p><h2>Your usage rhythm</h2></div><label className={styles.selectWrap}><span className="sr-only">Chart period</span><select value={range === "Today" ? "7 days" : range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option></select><FiChevronDown /></label></div>
          <div className={styles.chartLegend}><span><i /> Daily data used</span><strong>{range === "30 days" ? "18.6 GB this cycle" : "5.9 GB this week"}</strong></div>
          <div className={styles.chart} role="img" aria-label={"Data usage over " + range}><div className={styles.gridLines}><i /><i /><i /><i /></div><div className={styles.bars}>{usageBars.map((bar) => <div className={styles.barColumn} key={bar.day}><i style={{ height: (range === "30 days" ? Math.min(100, bar.value * 1.08) : bar.value) + "%" }} /><span>{bar.day}</span></div>)}</div></div>
          <p className={styles.chartNote}>Usage is summarized from sample line activity.</p>
        </article>
        <article className={styles.breakdownPanel}>
          <div className={styles.panelHead}><div><p className={styles.label}>Where it goes</p><h2>Data by category</h2></div><span className={styles.total}>{dataUsed.toFixed(1)} GB</span></div>
          <div className={styles.categoryList}>{categories.map(({ name, amount, share, icon: Icon, tone }) => <div className={styles.categoryRow} key={name}><span className={styles.categoryIcon + " " + styles[tone]}><Icon /></span><div className={styles.categoryDetails}><div><strong>{name}</strong><span>{amount.toFixed(1)} GB</span></div><div className={styles.categoryTrack}><i style={{ width: share + "%" }} /></div></div><span className={styles.share}>{share}%</span></div>)}</div>
        </article>
      </section>

      <section className={styles.alertPanel}><span className={styles.alertIcon}><FiBell /></span><div><strong>Data alerts</strong><p>Get a reminder when your line reaches 80% of its monthly allowance.</p></div><button type="button" className={styles.alertSwitch + (alertsEnabled ? " " + styles.alertOn : "")} role="switch" aria-checked={alertsEnabled} aria-label="Toggle data usage alerts" onClick={() => { setAlertsEnabled((enabled) => !enabled); notify(alertsEnabled ? "Data alerts turned off." : "Data alerts turned on."); }}><i /></button></section>

      <section className={styles.activityPanel}>
        <div className={styles.tableHeading}><div><p className={styles.label}>Recent activity</p><h2>Data sessions</h2></div><button className="button button-secondary" type="button" onClick={downloadUsage}><FiDownload /> Download CSV</button></div>
        <div className={styles.filters}>
          <label><span>Period</span><select value={range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option><option>Today</option></select><FiChevronDown /></label>
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{categories.map((item) => <option key={item.name}>{item.name}</option>)}</select><FiChevronDown /></label>
          <label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Recent first</option><option>Most data</option></select><FiChevronDown /></label>
        </div>
        <div className={styles.tableScroll}><table><thead><tr><th>Service</th><th>Category</th><th>Date</th><th>Data used</th></tr></thead><tbody>{filteredRows.map((row) => { const Icon = row.icon; return <tr key={row.day + row.app}><td><span className={styles.serviceCell}><i><Icon /></i><strong>{row.app}</strong></span></td><td>{row.type}</td><td>{row.day}</td><td><strong>{row.amount.toFixed(1)} GB</strong></td></tr>; })}{filteredRows.length === 0 && <tr><td colSpan="4" className={styles.empty}>No data sessions match those filters.</td></tr>}</tbody></table></div>
        <div className={styles.tableFooter}><span>Showing {filteredRows.length} recent sessions</span><span>Remaining plan days: 19</span></div>
      </section>
      <p className={styles.disclaimer}>Usage amounts are sample data. Alerts do not send real notifications.</p>
    </div>
  );
};

export default Usage;
