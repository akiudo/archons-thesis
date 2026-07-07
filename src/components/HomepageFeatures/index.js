import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Narrative Synchronization',
    icon: '⏳',
    to: '/docs/About/narrative-synchronization',
    description: (
      <>
        Follows the Main Scenario Quest timeline as a chronological blueprint,
        anchoring contextual deep-dives to the milestones you reach in your
        journey.
      </>
    ),
  },
  {
    title: 'Thematic Deep-Dives',
    icon: '📖',
    to: '/docs/About/thematic-deep-dives',
    description: (
      <>
        Explores world-building, side-content narratives, and universe physics
        — from the Aetheryte network to the Coils of Bahamut — without
        literal quest recaps.
      </>
    ),
  },
  {
    title: 'Tour Guide Perspective',
    icon: '🧭',
    to: '/docs/About/tour-guide-perspective',
    description: (
      <>
        A third-person limited viewpoint that enriches your immediate experience
        with primary source documentation, carefully avoiding late-game
        spoilers.
      </>
    ),
  },
];

function Feature({icon, title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureLink}>
        <div className={styles.featurePanel}>
          <div className={styles.icon}>{icon}</div>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
