import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const cities = [
  {
    name: 'Gridania',
    epithet: 'City of Trees',
    to: '/docs/The-Journey/A-Realm-Reborn/2.0/Gridania',
    variant: 'gridania',
  },
  {
    name: 'Limsa Lominsa',
    epithet: 'Maritime Republic',
    to: '/docs/The-Journey/A-Realm-Reborn/2.0/Limsa-Lominsa',
    variant: 'limsa',
  },
  {
    name: "Ul'dah",
    epithet: 'Desert Jewel',
    to: '/docs/The-Journey/A-Realm-Reborn/2.0/Uldah',
    variant: 'uldah',
  },
];

export default function StartingCityChoices() {
  return (
    <nav className={styles.nav} aria-label="Choose your starting city-state">
      <p className={styles.prompt}>Where did you awaken?</p>
      <div className={styles.choices}>
        {cities.map((city) => (
          <Link
            key={city.name}
            to={city.to}
            className={clsx(
              'button button--primary button--lg',
              styles.choice,
              styles[city.variant],
            )}>
            <span className={styles.name}>{city.name}</span>
            <span className={styles.epithet}>{city.epithet}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
