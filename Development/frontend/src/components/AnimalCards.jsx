import { useNavigate } from "react-router-dom";

const FEATURED_ANIMALS = [
  {
    id: 1, name: "Bruno", type: "dog", breed: "Indie Mix", age: 2,
    location: "Kathmandu", color: "#f59e0b", emoji: "🐕",
    tags: ["Vaccinated", "Kid-friendly"],
    story: "Playful, gentle dog found near Patan. Loves belly rubs.",
  },
  {
    id: 2, name: "Luna", type: "cat", breed: "Domestic Shorthair", age: 1,
    location: "Lalitpur", color: "#8b5cf6", emoji: "🐈", urgent: true,
    tags: ["Spayed", "Indoor"],
    story: "Rescued from a construction site. Very affectionate.",
  },
  {
    id: 3, name: "Max", type: "dog", breed: "German Shepherd Mix", age: 4,
    location: "Bhaktapur", color: "#10b981", emoji: "🐕",
    tags: ["Trained", "Calm"],
    story: "Loyal and trained. Would thrive in a home with a yard.",
  },
];

const GUIDES = [
  {
    icon: "🦴",
    title: "First Response",
    desc: "Learn how to approach a stray safely without causing them further stress.",
    link: "/blog",
  },
  {
    icon: "🩺",
    title: "Emergency Care",
    desc: "Basic first aid steps you can take while waiting for our rescue team to arrive.",
    link: "/blog",
  },
  {
    icon: "🏠",
    title: "Foster Care",
    desc: "How you can provide a temporary home for a recovering street soul.",
    link: "/blog",
  },
];

export default function AnimalCards() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .animals-section {
          padding: 80px 8%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-header h2 {
          font-size: 2.4rem;
          font-weight: 800;
          margin: 0 0 12px;
        }

        .section-header p {
          font-size: 1.05rem;
          color: #64748b;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .animals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 28px;
          margin-bottom: 40px;
        }

        .animal-card {
          background: white;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          cursor: pointer;
        }

        .animal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.10);
          border-color: var(--card-accent, #e2e8f0);
        }

        .animal-card-image {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          position: relative;
        }

        .animal-urgent-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid #fca5a5;
        }

        .animal-card-body {
          padding: 20px;
        }

        .animal-name {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 4px;
        }

        .animal-breed {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0 0 10px;
        }

        .animal-meta {
          display: flex;
          gap: 10px;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .animal-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .animal-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
        }

        .animal-story {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .animal-adopt-btn {
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }

        .animal-adopt-btn:hover {
          opacity: 0.88;
          transform: scale(0.98);
        }

        .see-all-btn {
          display: block;
          margin: 0 auto;
          background: white;
          color: #2563eb;
          border: 2px solid #2563eb;
          padding: 14px 40px;
          border-radius: 50px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .see-all-btn:hover {
          background: #2563eb;
          color: white;
          transform: translateY(-2px);
        }

        /* Guides */
        .guides-section {
          padding: 0 8% 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .guide-card {
          background: white;
          padding: 36px;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          cursor: pointer;
        }

        .guide-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.06);
          border-color: #eff6ff;
        }

        .guide-icon {
          width: 58px;
          height: 58px;
          background: #eff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.7rem;
          margin-bottom: 18px;
        }

        .guide-card h3 {
          font-size: 1.1rem;
          font-weight: 800;
          margin: 0 0 10px;
        }

        .guide-card p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .guide-link {
          color: #2563eb;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .guide-link:hover { text-decoration: underline; }
      `}</style>

      {/* Featured Animals */}
      <section className="animals-section">
        <div className="section-header">
          <h2>Animals Looking for <span style={{ color: "#2563eb" }}>a Home</span> 🐾</h2>
          <p>These rescued animals have been treated and are ready to be adopted. Could you be their forever family?</p>
        </div>

        <div className="animals-grid">
          {FEATURED_ANIMALS.map((animal) => (
            <div
              key={animal.id}
              className="animal-card"
              style={{ "--card-accent": animal.color }}
              onClick={() => navigate("/adopt")}
            >
              <div
                className="animal-card-image"
                style={{ background: `linear-gradient(135deg, ${animal.color}18, ${animal.color}32)` }}
              >
                <span>{animal.emoji}</span>
                {animal.urgent && <span className="animal-urgent-badge">🆘 Urgent</span>}
              </div>
              <div className="animal-card-body">
                <h3 className="animal-name">{animal.name}</h3>
                <p className="animal-breed">{animal.breed}</p>
                <div className="animal-meta">
                  <span>🗓 {animal.age} yr</span>
                  <span>📍 {animal.location}</span>
                </div>
                <div className="animal-tags">
                  {animal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="animal-tag"
                      style={{
                        background: animal.color + "18",
                        color: animal.color,
                        border: `1px solid ${animal.color}35`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="animal-story">{animal.story}</p>
                <button
                  className="animal-adopt-btn"
                  style={{ background: animal.color }}
                >
                  Meet {animal.name} →
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="see-all-btn" onClick={() => navigate("/adopt")}>
          See All Animals →
        </button>
      </section>

      {/* Rescue Guides */}
      <section className="guides-section">
        <div className="section-header" style={{ marginBottom: "36px" }}>
          <h2>Rescue Guides</h2>
        </div>
        <div className="guides-grid">
          {GUIDES.map(({ icon, title, desc, link }) => (
            <div key={title} className="guide-card" onClick={() => navigate(link)}>
              <div className="guide-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="guide-link">Read Guide →</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
