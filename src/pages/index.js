import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/The-Journey">
            Begin the Journey
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/how-to-use">
            How to Use
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/lore-index">
            Lore Index
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="FFXIV Lore Encyclopaedia & MSQ Companion"
      description="The Archon's Thesis — a Final Fantasy XIV lore encyclopaedia and Main Scenario Quest companion. Read Journey chapters, Encyclopaedia deep-dives, and Context notes in sync with your playthrough.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
