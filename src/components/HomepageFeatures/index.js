import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const StartPaths = [
  {
    title: 'The Journey',
    eyebrow: 'Read with the MSQ',
    description:
      'Companion chapters anchored to Main Scenario milestones. Play to a beat, pause here, then return to the game with richer context.',
    to: '/docs/The-Journey',
    cta: 'Open The Journey',
  },
  {
    title: 'The Encyclopaedia',
    eyebrow: 'World deep-dives',
    description:
      'Thematic lore on city-states, aetherytes, history, and systems the MSQ touches but rarely explains in full.',
    to: '/docs/The-Encyclopaedia',
    cta: 'Browse the Encyclopaedia',
  },
  {
    title: 'Context',
    eyebrow: 'Gaps & clarifications',
    description:
      'Background the quest line skips — Legacy beginnings, timeline quirks, and other notes that make the story click.',
    to: '/docs/Context',
    cta: 'Read Context',
  },
  {
    title: 'Lore Index',
    eyebrow: 'Find a name fast',
    description:
      'Search places, people, and concepts when you remember the word but not where it belongs — with MSQ spoiler controls.',
    to: '/lore-index',
    cta: 'Search the Index',
  },
];

const Principles = [
  {
    title: 'Narrative Synchronization',
    description:
      'The MSQ timeline is the blueprint. Entries are tied to milestones you reach — never ahead of where you are in the story.',
    learnMore: {
      to: '/docs/About/narrative-synchronization',
      label: 'How sync works',
    },
    go: {
      to: '/docs/The-Journey',
      label: 'Start The Journey',
    },
  },
  {
    title: 'Thematic Deep-Dives',
    description:
      'World-building, side narratives, and universe physics — from the Aetheryte network to longer arcs — not quest-by-quest recaps.',
    learnMore: {
      to: '/docs/About/thematic-deep-dives',
      label: 'About deep-dives',
    },
    go: {
      to: '/docs/The-Encyclopaedia',
      label: 'Open the Encyclopaedia',
    },
  },
  {
    title: 'Tour Guide Perspective',
    description:
      'A third-person limited viewpoint that matches your progression, cites primary sources, and marks spoilers when they cannot be avoided.',
    learnMore: {
      to: '/docs/About/tour-guide-perspective',
      label: 'About the perspective',
    },
    go: {
      to: '/how-to-use',
      label: 'How to use this site',
    },
  },
];

function StartPath({title, eyebrow, description, to, cta}) {
  return (
    <article className={styles.pathItem}>
      <p className={styles.pathEyebrow}>{eyebrow}</p>
      <Heading as="h3" className={styles.pathTitle}>
        {title}
      </Heading>
      <p className={styles.pathDescription}>{description}</p>
      <Link className={clsx('button button--primary button--sm', styles.pathCta)} to={to}>
        {cta}
      </Link>
    </article>
  );
}

function Principle({title, description, learnMore, go}) {
  return (
    <article className={styles.principleItem}>
      <Heading as="h3" className={styles.principleTitle}>
        {title}
      </Heading>
      <p className={styles.principleDescription}>{description}</p>
      <div className={styles.principleActions}>
        <Link className="button button--primary button--sm" to={go.to}>
          {go.label}
        </Link>
        <Link className={styles.principleSecondary} to={learnMore.to}>
          {learnMore.label}
        </Link>
      </div>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <section className={styles.intro} aria-labelledby="home-intro-heading">
        <div className="container">
          <div className={styles.introInner}>
            <Heading as="h2" id="home-intro-heading" className={styles.sectionHeading}>
              A lore companion for Final Fantasy XIV
            </Heading>
            <p className={styles.introLead}>
              The Archon&apos;s Thesis is an unofficial lore encyclopaedia and MSQ
              companion for <em>Final Fantasy XIV</em>. It is written to be read{' '}
              <strong>alongside</strong> your playthrough — so you get deep world
              context without narrative gaps, pacing detours, or late-game spoilers
              sprung too early.
            </p>
            <p className={styles.introBody}>
              Entries draw on primary sources such as the <em>Encyclopaedia Eorzea</em>{' '}
              volumes and the <em>Chronicles of Light</em>, and they follow three
              ideas: stay in sync with the Main Scenario Quest, explain the world
              thematically rather than recapping every quest, and speak like a tour
              guide walking the same road you are on.
            </p>
            <p className={styles.introLinks}>
              New here? Read <Link to="/how-to-use">How to Use</Link>, skim the{' '}
              <Link to="/about">About</Link> page for spoiler policy, or jump
              straight into <Link to="/docs/The-Journey">The Journey</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.paths} aria-labelledby="home-paths-heading">
        <div className="container">
          <Heading as="h2" id="home-paths-heading" className={styles.sectionHeading}>
            Where to go from here
          </Heading>
          <p className={styles.sectionLead}>
            Four doors into the site — pick the one that matches what you need right
            now.
          </p>
          <div className={styles.pathGrid}>
            {StartPaths.map((path) => (
              <StartPath key={path.title} {...path} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="home-principles-heading">
        <div className="container">
          <Heading as="h2" id="home-principles-heading" className={styles.sectionHeading}>
            How the project thinks
          </Heading>
          <p className={styles.sectionLead}>
            Each principle links onward to real reading — not a dead end.
          </p>
          <div className={styles.principleGrid}>
            {Principles.map((item) => (
              <Principle key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
