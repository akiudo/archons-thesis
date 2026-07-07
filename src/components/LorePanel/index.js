import clsx from 'clsx';
import styles from './styles.module.css';

const VARIANTS = {
  lore: {label: 'Lore', className: styles.lore},
  history: {label: 'History', className: styles.history},
  warning: {label: 'Warning', className: styles.warning},
};

/**
 * Styled callout panel resembling an in-game system message.
 */
export default function LorePanel({variant = 'lore', title, children}) {
  const config = VARIANTS[variant] ?? VARIANTS.lore;

  return (
    <div className={clsx(styles.panel, config.className)}>
      <div className={styles.header}>
        <span className={styles.badge}>{config.label}</span>
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
