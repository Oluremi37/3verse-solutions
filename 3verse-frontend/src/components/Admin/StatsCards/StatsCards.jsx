import "./StatsCards.css";

export default function StatsCards({ cards = [] }) {
  return (
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div className="stats-card" key={index}>
          {card.icon && (
            <div
              className="stats-icon"
              style={{
                background: card.color || "#16a34a",
              }}
            >
              {card.icon}
            </div>
          )}

          <div className="stats-info">
            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

            {card.subtitle && <p>{card.subtitle}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
