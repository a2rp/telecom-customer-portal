import { useMemo, useState } from "react";
import { FiAlertCircle, FiArrowUpRight, FiCheck, FiChevronDown, FiClock, FiFileText, FiHeadphones, FiMessageCircle, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import styles from "./styles.module.css";

const filters = ["All cases", "Open", "In progress", "Resolved"];

const Support = ({ tickets, setTickets, notify, showModal, closeModal }) => {
  const [filter, setFilter] = useState("All cases");
  const [query, setQuery] = useState("");

  const visibleTickets = useMemo(() => tickets.filter((ticket) => {
    const matchesStatus = filter === "All cases" || ticket.status === filter;
    const matchesQuery = (ticket.subject + " " + ticket.id + " " + ticket.category).toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesQuery;
  }), [tickets, filter, query]);

  const createCase = () => showModal({
    title: "Start a support case",
    description: "Tell us what you need help with. This demo keeps the request on this page only.",
    children: (
      <form className={styles.caseForm} onSubmit={(event) => {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        const id = "VL-" + String(2050 + tickets.length).padStart(4, "0");
        const nextTicket = {
          id,
          subject: fields.get("subject").trim(),
          category: fields.get("category"),
          priority: fields.get("priority"),
          status: "Open",
          created: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          detail: fields.get("detail").trim(),
          reply: "",
        };
        setTickets((items) => [nextTicket, ...items]);
        closeModal();
        notify("Case " + id + " added to your demo account.");
      }}>
        <label>What can we help with?<input name="subject" required minLength="5" maxLength="90" placeholder="A short summary" /></label>
        <div className={styles.formRow}>
          <label>Topic<select name="category" defaultValue="Billing"><option>Billing</option><option>Data and usage</option><option>Travel</option><option>Device</option><option>Account</option></select><FiChevronDown /></label>
          <label>Priority<select name="priority" defaultValue="Normal"><option>Normal</option><option>High</option></select><FiChevronDown /></label>
        </div>
        <label>Details<textarea name="detail" required minLength="12" maxLength="600" rows="4" placeholder="Share a few details so we can point you in the right direction." /></label>
        <p className={styles.formHint}>Do not include passwords, full payment card numbers, or other sensitive information.</p>
        <div className={styles.formActions}><button type="button" className="button button-secondary" onClick={closeModal}>Cancel</button><button type="submit" className="button button-primary"><FiPlus /> Create case</button></div>
      </form>
    ),
  });

  const openCase = (ticket) => showModal({
    title: ticket.subject,
    description: "Case " + ticket.id + " - " + ticket.category + " - opened " + ticket.created,
    children: (
      <div className={styles.caseDetails}>
        <div className={styles.detailsMeta}><span className={styles.status + " " + styles[ticket.status.toLowerCase().replace(" ", "")]}>{ticket.status}</span><span>{ticket.priority} priority</span></div>
        <div className={styles.messageBlock}><span>Your message</span><p>{ticket.detail}</p></div>
        {ticket.reply ? <div className={styles.replyBlock}><span>Vela support</span><p>{ticket.reply}</p></div> : (
          <form className={styles.replyForm} onSubmit={(event) => {
            event.preventDefault();
            const reply = new FormData(event.currentTarget).get("reply").trim();
            setTickets((items) => items.map((item) => item.id === ticket.id ? { ...item, reply, status: "In progress" } : item));
            closeModal();
            notify("Reply added to case " + ticket.id + ".");
          }}>
            <label htmlFor="case-reply">Add a message</label><textarea id="case-reply" name="reply" rows="3" minLength="4" maxLength="400" required placeholder="Write a message for the support team" />
            <button type="submit" className="button button-primary"><FiMessageCircle /> Send reply</button>
          </form>
        )}
        <div className={styles.detailsActions}>
          {ticket.status !== "Resolved" && <button type="button" className="button button-secondary" onClick={() => {
            setTickets((items) => items.map((item) => item.id === ticket.id ? { ...item, status: "Resolved" } : item));
            closeModal();
            notify("Case " + ticket.id + " marked resolved.");
          }}><FiCheck /> Mark resolved</button>}
          <button type="button" className={styles.deleteButton} onClick={() => {
            closeModal();
            window.setTimeout(() => showModal({
              title: "Remove this case?",
              description: "Case " + ticket.id + " - " + ticket.subject + " will be removed from this demo account.",
              children: <div className={styles.confirmDelete}><p>You cannot restore a case after removing it in this session.</p><div><button type="button" className="button button-secondary" onClick={closeModal}>Keep case</button><button type="button" className="button button-danger" onClick={() => { setTickets((items) => items.filter((item) => item.id !== ticket.id)); closeModal(); notify("Case " + ticket.id + " removed."); }}><FiTrash2 /> Remove case</button></div></div>,
            }), 0);
          }}><FiTrash2 /> Remove case</button>
        </div>
      </div>
    ),
  });

  const downloadCases = () => {
    const csv = ["Case,Subject,Category,Status,Priority,Created", ...visibleTickets.map((item) => [item.id, '"' + item.subject.replaceAll('"', '""') + '"', item.category, item.status, item.priority, item.created].join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vela-support-cases.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    notify("Case history downloaded.");
  };

  return (
    <div className={styles.supportPage}>
      <section className={styles.supportHero}>
        <div><span className={styles.heroIcon}><FiHeadphones /></span><p className={styles.label}>Vela care</p><h1>We're here to help.</h1><p>Keep every question and answer together in one place.</p><button className="button button-primary" type="button" onClick={createCase}><FiPlus /> Start a support case</button></div>
        <div className={styles.careCard}><div className={styles.careIcon}><FiClock /></div><div><strong>Real people, ready to help</strong><p>Daily, 8 AM - 10 PM Eastern</p></div><span>Available</span></div>
        <div className={styles.heroShape} aria-hidden="true"><i /><i /></div>
      </section>

      <section className={styles.caseSection}>
        <div className={styles.sectionHeading}><div><p className={styles.label}>Your support</p><h2>Support cases</h2><p>Track updates and reply to open conversations.</p></div><button type="button" className="button button-secondary" onClick={downloadCases}><FiFileText /> Export cases</button></div>

        <div className={styles.caseToolbar}>
          <div className={styles.filterTabs} role="tablist" aria-label="Filter cases">
            {filters.map((item) => <button type="button" role="tab" aria-selected={filter === item} className={filter === item ? styles.selectedFilter : ""} key={item} onClick={() => setFilter(item)}>{item}<span>{item === "All cases" ? tickets.length : tickets.filter((ticket) => ticket.status === item).length}</span></button>)}
          </div>
          <label className={styles.searchBox}><FiSearch /><span className="sr-only">Search cases</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your cases" /></label>
        </div>

        <div className={styles.caseList}>
          {visibleTickets.map((ticket) => (
            <article className={styles.caseCard} key={ticket.id}>
              <span className={styles.caseMark}><FiMessageCircle /></span>
              <div className={styles.caseMain}><div className={styles.caseTop}><span>{ticket.id}</span><span className={styles.status + " " + styles[ticket.status.toLowerCase().replace(" ", "")]}>{ticket.status}</span></div><button type="button" className={styles.caseTitle} onClick={() => openCase(ticket)}>{ticket.subject}</button><div className={styles.caseMeta}><span>{ticket.category}</span><i /> <span>{ticket.priority} priority</span><i /> <span>Opened {ticket.created}</span></div>{ticket.reply && <p className={styles.lastReply}><FiArrowUpRight /> Latest reply from Vela support</p>}</div>
              <button type="button" className={styles.openButton} aria-label={"Open case " + ticket.id} onClick={() => openCase(ticket)}><FiArrowUpRight /></button>
            </article>
          ))}
          {visibleTickets.length === 0 && <div className={styles.emptyState}><FiAlertCircle /><strong>No matching cases</strong><p>Try another status or search term.</p><button type="button" className="button button-secondary" onClick={() => { setFilter("All cases"); setQuery(""); }}>Clear filters</button></div>}
        </div>
        <div className={styles.caseFooter}><span>Showing {visibleTickets.length} of {tickets.length} cases</span><button type="button" className={styles.newCaseLink} onClick={createCase}><FiPlus /> New case</button></div>
      </section>
      <p className={styles.disclaimer}>This frontend demo does not contact a live support team. Case updates stay in temporary page state and reset on refresh.</p>
    </div>
  );
};

export default Support;
