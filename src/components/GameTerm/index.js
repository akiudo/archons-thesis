import {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Wraps an Eorzea Database tooltip link with optional spoiler protection.
 * When `spoiler` is true, the term is hidden behind a reveal toggle.
 */
export default function GameTerm({href, children, spoiler = false}) {
  const [revealed, setRevealed] = useState(false);

  if (spoiler && !revealed) {
    return (
      <button
        type="button"
        className={styles.spoilerGate}
        onClick={() => setRevealed(true)}
        title="Click to reveal (may contain spoilers)">
        [Spoiler]
      </button>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={clsx('eorzeadb_link', styles.term)}
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <span className={styles.term}>{children}</span>;
}
