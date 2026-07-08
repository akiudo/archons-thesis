import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * Cross-link from a Journey entry to Context or Encyclopaedia material.
 */
export default function ContextRef({to, title, children}) {
  return (
    <aside className={styles.aside}>
      <span className={styles.label}>Background</span>
      <div className={styles.body}>
        <Link to={to} className={styles.link}>
          {title}
        </Link>
        {children ? <span className={styles.note}> — {children}</span> : null}
      </div>
    </aside>
  );
}
