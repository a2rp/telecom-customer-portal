import { FaFacebookF, FaGithub, FaLinkedinIn, FaPatreon, FaYoutube } from "react-icons/fa";
import { FiCoffee, FiGlobe, FiHeart, FiMail } from "react-icons/fi";
import { SiCodepen } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.css";

const footerLinks = [
  { label: "Portfolio", href: "https://www.ashishranjan.net", icon: FiGlobe, address: "ashishranjan.net" },
  { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub, address: "github.com/a2rp" },
  { label: "CodePen", href: "https://codepen.io/ash1198", icon: SiCodepen, address: "codepen.io/ash1198" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FaLinkedinIn, address: "linkedin.com/in/aashishranjan" },
  { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FaFacebookF, address: "facebook.com/theash.ashish" },
  { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FaYoutube, address: "youtube.com/@ashishranjan-ashz" },
  { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail, address: "ash.ranjan09@gmail.com" },
  { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FiHeart, address: "a2rp-donation-page.netlify.app" },
  { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/ashishranjan", icon: FiCoffee, address: "buymeacoffee.com/ashishranjan" },
  { label: "Patreon", href: "https://www.patreon.com/ashishranjan", icon: FaPatreon, address: "patreon.com/ashishranjan" },
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <div className={styles.copyright}>
        <a href="https://www.ashishranjan.net" target="_blank" rel="noreferrer" aria-label="Ashish Ranjan portfolio">
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="" />
        </a>
        <p>© {new Date().getFullYear()} <a className={styles.nameLink} href="https://www.ashishranjan.net" target="_blank" rel="noreferrer">Ashish Ranjan</a>. All rights reserved.</p>
      </div>
      <div className={styles.socialLinks} aria-label="Social and support links">
        {footerLinks.map(({ label, href, icon: Icon, address }) => (
          <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={label} data-tooltip-id="vela-footer-tip" data-tooltip-content={label + "\n" + address}><Icon aria-hidden="true" /></a>
        ))}
        <a href="https://github.com/a2rp/telecom-customer-portal" target="_blank" rel="noreferrer" aria-label="Source code" data-tooltip-id="vela-footer-tip" data-tooltip-content={"Source code\n" + "github.com/a2rp/telecom-customer-portal"}><FaGithub aria-hidden="true" /></a>
        <Tooltip id="vela-footer-tip" className={styles.tooltip} place="top" opacity={1} />
      </div>
    </div>
  </footer>
);

export default Footer;
