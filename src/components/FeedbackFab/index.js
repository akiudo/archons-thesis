import {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const ISSUES_URL = 'https://github.com/akiudo/archons-thesis/issues';

export default function FeedbackFab() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setShowTooltip(false);
        }
      }}>
      <div
        className={clsx(styles.tooltip, showTooltip && styles.tooltipVisible)}
        role="tooltip"
        id="feedback-fab-tooltip">
        <div className={styles.tooltipHeader}>
          <span className={styles.tooltipTitle}>Submit Feedback</span>
          <span className={styles.tooltipSubtitle}>Community Request</span>
        </div>
        <div className={styles.tooltipBody}>
          <p>
            Have a question about an entry, or want to suggest a correction or
            change?
          </p>
          <p>Open a GitHub issue — we read every report.</p>
        </div>
      </div>

      <a
        href={ISSUES_URL}
        className={styles.fab}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Submit feedback or request changes on GitHub"
        aria-describedby="feedback-fab-tooltip">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.03 2 11c0 2.55 1.25 4.84 3.22 6.45L4 22l4.74-1.02A9.86 9.86 0 0 0 12 20c5.52 0 10-4.03 10-9s-4.48-9-10-9zm1 13h-2v-2h2v2zm0-4h-2V7h2v4z"
          />
        </svg>
      </a>
    </div>
  );
}
