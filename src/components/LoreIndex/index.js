import {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import loreIndex from '@site/src/data/loreIndex.json';
import styles from './styles.module.css';

const STORAGE_KEY = 'archons-thesis-lore-index-progress';

const TYPE_LABELS = {
  place: 'Place',
  person: 'Person',
  faction: 'Faction',
  concept: 'Concept',
  event: 'Event',
  primal: 'Primal',
  other: 'Other',
};

const EXPANSIONS = [
  {id: 'arr', label: 'A Realm Reborn', short: 'ARR'},
  {id: 'heavensward', label: 'Heavensward', short: 'HW'},
  {id: 'stormblood', label: 'Stormblood', short: 'SB'},
  {id: 'shadowbringers', label: 'Shadowbringers', short: 'ShB'},
  {id: 'endwalker', label: 'Endwalker', short: 'EW'},
  {id: 'dawntrail', label: 'Dawntrail', short: 'DT'},
];

/**
 * MSQ progress steps in story order.
 * Finer ARR 2.0 beats avoid mid-game spoilers (e.g. Gaius / Ultima).
 */
const PATCHES = [
  {
    id: '2.0-early',
    expansion: 'arr',
    label: 'ARR — early 2.0 (cities & opening)',
    short: '2.0',
    spoilerLabel: 'early A Realm Reborn',
  },
  {
    id: '2.0',
    expansion: 'arr',
    label: 'ARR — mid 2.0 MSQ',
    short: '2.0',
    spoilerLabel: 'A Realm Reborn',
  },
  {
    id: '2.0-finale',
    expansion: 'arr',
    label: 'ARR — 2.0 finale (Operation Archon)',
    short: '2.0',
    spoilerLabel: 'ARR finale',
  },
  {id: '2.1', expansion: 'arr', label: 'ARR 2.1', short: '2.1', spoilerLabel: 'ARR 2.1'},
  {id: '2.2', expansion: 'arr', label: 'ARR 2.2', short: '2.2', spoilerLabel: 'ARR 2.2'},
  {id: '2.3', expansion: 'arr', label: 'ARR 2.3', short: '2.3', spoilerLabel: 'ARR 2.3'},
  {id: '2.4', expansion: 'arr', label: 'ARR 2.4', short: '2.4', spoilerLabel: 'ARR 2.4'},
  {id: '2.5', expansion: 'arr', label: 'ARR 2.5', short: '2.5', spoilerLabel: 'ARR 2.5'},
  {id: '3.0', expansion: 'heavensward', label: 'Heavensward 3.0', short: '3.0', spoilerLabel: 'Heavensward'},
  {id: '3.1', expansion: 'heavensward', label: 'Heavensward 3.1', short: '3.1', spoilerLabel: 'Heavensward'},
  {id: '3.2', expansion: 'heavensward', label: 'Heavensward 3.2', short: '3.2', spoilerLabel: 'Heavensward'},
  {id: '3.3', expansion: 'heavensward', label: 'Heavensward 3.3', short: '3.3', spoilerLabel: 'Heavensward'},
  {id: '3.4', expansion: 'heavensward', label: 'Heavensward 3.4', short: '3.4', spoilerLabel: 'Heavensward'},
  {id: '3.5', expansion: 'heavensward', label: 'Heavensward 3.5', short: '3.5', spoilerLabel: 'Heavensward'},
  {id: '4.0', expansion: 'stormblood', label: 'Stormblood 4.0', short: '4.0', spoilerLabel: 'Stormblood'},
  {id: '4.1', expansion: 'stormblood', label: 'Stormblood 4.1', short: '4.1', spoilerLabel: 'Stormblood'},
  {id: '4.2', expansion: 'stormblood', label: 'Stormblood 4.2', short: '4.2', spoilerLabel: 'Stormblood'},
  {id: '4.3', expansion: 'stormblood', label: 'Stormblood 4.3', short: '4.3', spoilerLabel: 'Stormblood'},
  {id: '4.4', expansion: 'stormblood', label: 'Stormblood 4.4', short: '4.4', spoilerLabel: 'Stormblood'},
  {id: '4.5', expansion: 'stormblood', label: 'Stormblood 4.5', short: '4.5', spoilerLabel: 'Stormblood'},
  {id: '5.0', expansion: 'shadowbringers', label: 'Shadowbringers 5.0', short: '5.0', spoilerLabel: 'Shadowbringers'},
  {id: '5.1', expansion: 'shadowbringers', label: 'Shadowbringers 5.1', short: '5.1', spoilerLabel: 'Shadowbringers'},
  {id: '5.2', expansion: 'shadowbringers', label: 'Shadowbringers 5.2', short: '5.2', spoilerLabel: 'Shadowbringers'},
  {id: '5.3', expansion: 'shadowbringers', label: 'Shadowbringers 5.3', short: '5.3', spoilerLabel: 'Shadowbringers'},
  {id: '5.4', expansion: 'shadowbringers', label: 'Shadowbringers 5.4', short: '5.4', spoilerLabel: 'Shadowbringers'},
  {id: '5.5', expansion: 'shadowbringers', label: 'Shadowbringers 5.5', short: '5.5', spoilerLabel: 'Shadowbringers'},
  {id: '6.0', expansion: 'endwalker', label: 'Endwalker 6.0', short: '6.0', spoilerLabel: 'Endwalker'},
  {id: '6.1', expansion: 'endwalker', label: 'Endwalker 6.1', short: '6.1', spoilerLabel: 'Endwalker'},
  {id: '6.2', expansion: 'endwalker', label: 'Endwalker 6.2', short: '6.2', spoilerLabel: 'Endwalker'},
  {id: '6.3', expansion: 'endwalker', label: 'Endwalker 6.3', short: '6.3', spoilerLabel: 'Endwalker'},
  {id: '6.4', expansion: 'endwalker', label: 'Endwalker 6.4', short: '6.4', spoilerLabel: 'Endwalker'},
  {id: '6.5', expansion: 'endwalker', label: 'Endwalker 6.5', short: '6.5', spoilerLabel: 'Endwalker'},
  {id: '7.0', expansion: 'dawntrail', label: 'Dawntrail 7.0', short: '7.0', spoilerLabel: 'Dawntrail'},
  {id: '7.1', expansion: 'dawntrail', label: 'Dawntrail 7.1', short: '7.1', spoilerLabel: 'Dawntrail'},
  {id: '7.2', expansion: 'dawntrail', label: 'Dawntrail 7.2', short: '7.2', spoilerLabel: 'Dawntrail'},
  {id: '7.3', expansion: 'dawntrail', label: 'Dawntrail 7.3', short: '7.3', spoilerLabel: 'Dawntrail'},
  {id: '7.4', expansion: 'dawntrail', label: 'Dawntrail 7.4', short: '7.4', spoilerLabel: 'Dawntrail'},
  {id: '7.5', expansion: 'dawntrail', label: 'Dawntrail 7.5', short: '7.5', spoilerLabel: 'Dawntrail'},
];

const PATCH_ORDER = Object.fromEntries(PATCHES.map((patch, index) => [patch.id, index]));
const PATCH_META = Object.fromEntries(PATCHES.map((patch) => [patch.id, patch]));
const EXPANSION_META = Object.fromEntries(EXPANSIONS.map((exp) => [exp.id, exp]));

/** Map older expansion-only progress values stored in localStorage. */
const LEGACY_PROGRESS = {
  arr: '2.5',
  heavensward: '3.5',
  stormblood: '4.5',
  shadowbringers: '5.5',
  endwalker: '6.5',
  dawntrail: '7.5',
};

const PROGRESS_OPTIONS = [
  {id: 'none', label: 'Just starting — blur all details'},
  ...PATCHES.map((patch) => ({
    id: patch.id,
    label: `Through ${patch.label}`,
  })),
  {id: 'all', label: 'Everything (spoilers OK)'},
];

const DEFAULT_PROGRESS = 'none';

function normalize(value) {
  return value.toLowerCase().trim();
}

function patchRank(patchId) {
  return PATCH_ORDER[patchId] ?? -1;
}

function resolveProgressId(raw) {
  if (!raw) {
    return DEFAULT_PROGRESS;
  }
  if (PROGRESS_OPTIONS.some((option) => option.id === raw)) {
    return raw;
  }
  return LEGACY_PROGRESS[raw] ?? DEFAULT_PROGRESS;
}

function isAtOrBefore(patchId, progressId) {
  if (progressId === 'all') {
    return true;
  }
  if (progressId === 'none') {
    return false;
  }
  return patchRank(patchId) <= patchRank(progressId);
}

function isEntryUnlocked(entry, progressId) {
  return isAtOrBefore(entry.patch, progressId);
}

function spoilerLabelFor(patchId, expansionId) {
  return (
    PATCH_META[patchId]?.spoilerLabel ??
    EXPANSION_META[expansionId]?.label ??
    'later MSQ'
  );
}

function matchesVisibleFields(entry, query, unlocked) {
  if (!query) {
    return true;
  }

  const fields = unlocked
    ? [entry.term, ...(entry.aliases ?? []), ...(entry.tags ?? []), entry.summary, entry.type]
    : [entry.term, ...(entry.aliases ?? [])];

  const haystack = fields.map(normalize).join(' ');
  return haystack.includes(query);
}

function groupByLetter(terms) {
  const groups = new Map();

  for (const entry of terms) {
    const letter = entry.term.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(letter) ? letter : '#';
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(entry);
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function ExpansionBadge({expansionId}) {
  const meta = EXPANSION_META[expansionId];
  if (!meta) {
    return null;
  }

  return (
    <span
      className={clsx(styles.expansionBadge, styles[`expansion_${expansionId}`])}
      title={meta.label}>
      {meta.short}
    </span>
  );
}

function PatchBadge({patchId}) {
  const meta = PATCH_META[patchId];
  if (!meta) {
    return null;
  }

  return (
    <span className={styles.patchBadge} title={meta.label}>
      {meta.short}
    </span>
  );
}

function SpoilerBlur({label, onReveal, compact = false}) {
  return (
    <button
      type="button"
      className={clsx(styles.blurOverlay, compact && styles.blurOverlayCompact)}
      onClick={onReveal}
      aria-label={`Reveal ${label} spoiler`}>
      <span className={styles.blurOverlayText}>
        Reveal — <span className={styles.blurOverlayExpansion}>{label}</span>{' '}
        spoiler
      </span>
    </button>
  );
}

function TermLink({link, progress}) {
  const patchId = link.patch;
  const unlocked = isAtOrBefore(patchId, progress);
  const [revealed, setRevealed] = useState(false);
  const showLink = unlocked || revealed;

  useEffect(() => {
    if (unlocked) {
      setRevealed(false);
    }
  }, [unlocked]);

  return (
    <li className={styles.linkItem}>
      <div className={styles.linkShell}>
        <div
          className={clsx(styles.linkContent, !showLink && styles.linkContentBlurred)}
          aria-hidden={!showLink}>
          <Link
            to={link.href}
            className={styles.link}
            tabIndex={showLink ? undefined : -1}>
            {link.label}
          </Link>
          <ExpansionBadge expansionId={link.expansion} />
          <PatchBadge patchId={patchId} />
        </div>
        {!showLink ? (
          <SpoilerBlur
            compact
            label={spoilerLabelFor(patchId, link.expansion)}
            onReveal={() => setRevealed(true)}
          />
        ) : null}
      </div>
    </li>
  );
}

function TermBody({entry, progress}) {
  return (
    <>
      {entry.aliases?.length ? (
        <p className={styles.aliases}>Also known as: {entry.aliases.join(', ')}</p>
      ) : null}

      <p className={styles.summary}>{entry.summary}</p>

      {entry.tags?.length ? (
        <ul className={styles.tags} aria-label="Related topics">
          {entry.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.links}>
        <span className={styles.linksLabel}>Read more:</span>
        <ul className={styles.linkList}>
          {entry.links.map((link) => (
            <TermLink
              key={`${link.href}-${link.patch ?? link.expansion}`}
              link={{
                ...link,
                expansion: link.expansion ?? entry.expansion,
                patch: link.patch ?? entry.patch,
              }}
              progress={progress}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function TermCard({entry, unlocked, progress}) {
  const [revealed, setRevealed] = useState(false);
  const showBody = unlocked || revealed;

  useEffect(() => {
    if (unlocked) {
      setRevealed(false);
    }
  }, [unlocked]);

  return (
    <article
      className={clsx(styles.termCard, !showBody && styles.termCardLocked)}
      id={normalize(entry.term).replace(/\s+/g, '-')}>
      <header className={styles.termHeader}>
        <h3 className={styles.termName}>{entry.term}</h3>
        <span className={clsx(styles.typeBadge, styles[`type_${entry.type}`])}>
          {TYPE_LABELS[entry.type] ?? entry.type}
        </span>
        <ExpansionBadge expansionId={entry.expansion} />
        <PatchBadge patchId={entry.patch} />
      </header>

      <div className={styles.termBodyShell}>
        <div
          className={clsx(styles.termBody, !showBody && styles.termBodyBlurred)}
          aria-hidden={!showBody}>
          <TermBody entry={entry} progress={progress} />
        </div>
        {!showBody ? (
          <SpoilerBlur
            label={spoilerLabelFor(entry.patch, entry.expansion)}
            onReveal={() => setRevealed(true)}
          />
        ) : null}
      </div>
    </article>
  );
}

export default function LoreIndex() {
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const normalizedQuery = normalize(query);
  const hasQuery = normalizedQuery.length > 0;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setProgress(resolveProgressId(stored));
    } catch {
      // localStorage unavailable — keep default.
    }
  }, []);

  function handleProgressChange(event) {
    const next = event.target.value;
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures (private mode, etc.).
    }
  }

  const filteredTerms = useMemo(() => {
    return loreIndex.terms.filter((entry) => {
      const unlocked = isEntryUnlocked(entry, progress);

      // Just starting: do not browse-list names from later in the story.
      if (progress === 'none') {
        return hasQuery && matchesVisibleFields(entry, normalizedQuery, false);
      }

      if (!hasQuery) {
        return unlocked && matchesVisibleFields(entry, normalizedQuery, unlocked);
      }

      return matchesVisibleFields(entry, normalizedQuery, unlocked);
    });
  }, [normalizedQuery, hasQuery, progress]);

  const groupedTerms = useMemo(
    () => (hasQuery ? null : groupByLetter(filteredTerms)),
    [filteredTerms, hasQuery],
  );

  const lockedCount = useMemo(
    () =>
      filteredTerms.filter((entry) => !isEntryUnlocked(entry, progress)).length,
    [filteredTerms, progress],
  );

  return (
    <div className={styles.index}>
      <div className={styles.controls}>
        <div className={styles.controlField}>
          <label className={styles.searchLabel} htmlFor="lore-index-progress">
            I&apos;ve finished through
          </label>
          <select
            id="lore-index-progress"
            className={styles.progressSelect}
            value={progress}
            onChange={handleProgressChange}>
            {PROGRESS_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlField}>
          <label className={styles.searchLabel} htmlFor="lore-index-search">
            Search terms
          </label>
          <input
            id="lore-index-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Alphinaud, Gaius, Ishgard…"
            className={styles.searchInput}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      <p className={styles.resultCount} aria-live="polite">
        {filteredTerms.length === 0
          ? 'No matching terms'
          : `${filteredTerms.length} term${filteredTerms.length === 1 ? '' : 's'}`}
        {lockedCount > 0
          ? ` · ${lockedCount} blurred`
          : null}
        {progress === 'none' && !hasQuery
          ? ' · set your MSQ progress, or search a name you already know'
          : null}
        {progress !== 'none' && progress !== 'all' && !hasQuery
          ? ' · later MSQ terms hidden until you search or raise your progress'
          : null}
      </p>

      {filteredTerms.length === 0 ? (
        <p className={styles.emptyState}>
          {hasQuery
            ? 'No terms match your search. Try a place, faction, or character name.'
            : progress === 'none'
              ? 'Choose how far you are in the MSQ above to browse safely — or search a name you already know (details stay blurred until you reveal them).'
              : 'No terms are unlocked at this progress level yet.'}
        </p>
      ) : groupedTerms ? (
        groupedTerms.map(([letter, terms]) => (
          <section
            key={letter}
            className={styles.letterGroup}
            aria-labelledby={`letter-${letter}`}>
            <h2 className={styles.letterHeading} id={`letter-${letter}`}>
              {letter}
            </h2>
            <div className={styles.termList}>
              {terms.map((entry) => (
                <TermCard
                  key={entry.term}
                  entry={entry}
                  unlocked={isEntryUnlocked(entry, progress)}
                  progress={progress}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className={styles.termList}>
          {filteredTerms.map((entry) => (
            <TermCard
              key={entry.term}
              entry={entry}
              unlocked={isEntryUnlocked(entry, progress)}
              progress={progress}
            />
          ))}
        </div>
      )}
    </div>
  );
}
