import SpotlightCard from './ReactBits/SpotlightCard/SpotlightCard';
import './StatCards.css';

const STATS = [
  { value: '18+', label: 'Projects' },
  { value: '20+', label: 'Security Labs' },
  { value: '100k+', label: 'Lines of Code' },
  { value: 'Available', label: 'For Work', accent: true },
];

const StatCards = () => {
  return (
    <div className="stat-cards">
      {STATS.map((stat, i) => (
        <SpotlightCard
          key={stat.label}
          className={`stat-card ${stat.accent ? 'accent' : ''}`}
          spotlightColor={stat.accent ? 'rgba(199, 255, 50, 0.15)' : 'rgba(255, 255, 255, 0.08)'}
        >
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </SpotlightCard>
      ))}
    </div>
  );
};

export default StatCards;
