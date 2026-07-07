import styles from './styles.module.css';

/**
 * Inline citation chip for primary source references.
 */
export default function SourceRef({volume, page, source = 'Encyclopaedia Eorzea'}) {
  const label = page
    ? `${source} Vol. ${volume}, p. ${page}`
    : `${source} Vol. ${volume}`;

  return (
    <span className={styles.chip} title={label}>
      {label}
    </span>
  );
}
