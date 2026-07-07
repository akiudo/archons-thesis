import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import {author, getLodestoneUrl} from '@site/src/data/author';
import styles from './styles.module.css';

export default function AuthorProfile() {
  const lodestoneUrl = getLodestoneUrl();
  const hasPortrait = Boolean(author.portraitUrl);
  const portraitSrc = useBaseUrl(author.portraitUrl);

  return (
    <div className={styles.card}>
      <div className={styles.portraitColumn}>
        {hasPortrait ? (
          <img
            src={portraitSrc}
            alt={`${author.displayName} — Lodestone portrait`}
            className={styles.portrait}
          />
        ) : (
          <div className={styles.portraitPlaceholder}>
            <span className={styles.portraitInitial}>
              {author.displayName.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className={styles.details}>
        <h2 className={styles.name}>{author.displayName}</h2>
        <p className={styles.subtitle}>
          Creator of The Archon's Thesis
          {author.world && (
            <span className={styles.world}> · {author.world}</span>
          )}
        </p>

        <div className={styles.links}>
          {lodestoneUrl ? (
            <Link
              href={lodestoneUrl}
              className={clsx('button button--primary', styles.lodestoneButton)}
              target="_blank"
              rel="noopener noreferrer">
              View on Lodestone
            </Link>
          ) : (
            <span className={styles.lodestonePending}>
              Lodestone profile link coming soon
            </span>
          )}
          <Link
            href={author.githubUrl}
            className="button button--secondary"
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
