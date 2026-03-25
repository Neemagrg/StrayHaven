import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate("/rescue");
  };

  return (
    <>
      <style>{`
        .hero {
          padding: 100px 8% 80px;
          background: radial-gradient(circle at top right, #dbeafe, #f8fafc 55%),
                      radial-gradient(circle at bottom left, #fef3c7, #f8fafc 55%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-badge {
          display: inline-block;
          background: #eff6ff;
          color: #2563eb;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 50px;
          border: 1px solid #bfdbfe;
          margin-bottom: 24px;
          animation: fadeDown 0.5s ease both;
        }

        .hero h1 {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 22px;
          animation: fadeDown 0.5s ease 0.1s both;
        }

        .hero p {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 650px;
          margin: 0 auto 44px;
          line-height: 1.7;
          animation: fadeDown 0.5s ease 0.2s both;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 50px;
          animation: fadeDown 0.5s ease 0.3s both;
        }

        .hero-search {
          background: white;
          padding: 8px 8px 8px 24px;
          border-radius: 60px;
          display: flex;
          max-width: 560px;
          width: 100%;
          margin: 0 auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          animation: fadeDown 0.5s ease 0.4s both;
        }

        .hero-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.95rem;
          font-family: inherit;
          background: transparent;
          color: #0f172a;
        }

        .hero-search input::placeholder { color: #94a3b8; }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 50px;
          margin-top: 60px;
          flex-wrap: wrap;
          animation: fadeDown 0.5s ease 0.5s both;
        }

        .hero-stat .num {
          font-size: 2.2rem;
          font-weight: 800;
          color: #2563eb;
        }

        .hero-stat .label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero { padding: 70px 5% 60px; }
          .hero h1 { font-size: 2.5rem; }
          .hero-stats { gap: 28px; }
        }
      `}</style>

      <header className="hero">
        <div className="hero-badge">🌟 Nepal's #1 Stray Rescue Platform</div>

        <h1>
          Saving Lives,{" "}
          <br />
          <span style={{ color: "#2563eb" }}>One Pin At A Time.</span>
        </h1>

        <p>
          If you see a stray animal in distress, mark their location on our map.
          Our professional rescue team will be dispatched immediately.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate("/rescue")}>
            🆘 Report Emergency
          </button>
          <button
            className="btn"
            style={{ background: "white", color: "#0f172a", border: "1.5px solid #e2e8f0" }}
            onClick={() => navigate("/adopt")}
          >
            🐾 Adopt an Animal
          </button>
        </div>

        <form className="hero-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search your city for active rescues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "12px 28px", fontSize: "0.9rem" }}>
            Find Rescues
          </button>
        </form>

        <div className="hero-stats">
          {[
            { num: "127+", label: "Animals Rescued" },
            { num: "84",   label: "Adopted This Year" },
            { num: "200+", label: "Volunteers" },
            { num: "12",   label: "Vet Partners" },
          ].map(({ num, label }) => (
            <div className="hero-stat" key={label}>
              <div className="num">{num}</div>
              <div className="label">{label}</div>
            </div>
          ))}
        </div>
      </header>
    </>
  );
}
