import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import patchBanners from '@site/src/data/patchBanners.json';
import styles from './styles.module.css';

const PATCHES = patchBanners.patches;

function expansionBasePatch(patch) {
  const [major] = patch.split('.');
  return `${major}.0`;
}

function resolveBanner(patch, expansion) {
  const entry = PATCHES[patch];
  if (entry?.src) {
    return entry;
  }

  const fallbackKeys = [
    expansion,
    entry?.expansion,
    expansionBasePatch(patch),
  ].filter(Boolean);

  for (const key of fallbackKeys) {
    const fallback = PATCHES[key];
    if (fallback?.src) {
      return {
        ...fallback,
        title: entry?.title ?? fallback.title,
        subtitle: entry?.subtitle ?? fallback.subtitle,
      };
    }
  }

  return entry ?? null;
}

/**
 * Patch or expansion hero using official FFXIV fan kit banners (1500×500).
 */
export default function PatchBanner({patch, expansion, showTitle = true}) {
  const resolved = resolveBanner(patch, expansion);
  const imageSrc = useBaseUrl(resolved?.src ?? '');
  const hasImage = Boolean(resolved?.src);

  if (!resolved) {
    return null;
  }

  return (
    <div
      className={clsx(styles.banner, !hasImage && styles.bannerFallback)}>
      {hasImage && (
        <img
          src={imageSrc}
          alt={resolved.alt ?? resolved.title}
          className={styles.image}
          loading="eager"
          decoding="async"
        />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      {showTitle && (
        <div className={styles.content}>
          <p className={styles.patchLabel}>Patch {patch}</p>
        </div>
      )}
    </div>
  );
}
