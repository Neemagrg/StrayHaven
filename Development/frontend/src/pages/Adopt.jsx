import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const ANIMALS = [
  {
    id: 1, name: "Bruno", type: "dog", breed: "Indie Mix", age: 2, gender: "Male",
    location: "Kathmandu", health: "vaccinated", urgency: "normal",
    color: "#f59e0b",
    story: "Found near Patan Durbar Square. Playful, great with kids, loves belly rubs.",
    tags: ["Vaccinated", "Neutered", "Kid-friendly"],
  },
  {
    id: 2, name: "Luna", type: "cat", breed: "Domestic Shorthair", age: 1, gender: "Female",
    location: "Lalitpur", health: "treated", urgency: "urgent",
    color: "#8b5cf6",
    story: "Rescued from a construction site. Very affectionate and loves to cuddle.",
    tags: ["Vaccinated", "Spayed", "Indoor"],
  },
  {
    id: 3, name: "Max", type: "dog", breed: "German Shepherd Mix", age: 4, gender: "Male",
    location: "Bhaktapur", health: "vaccinated", urgency: "normal",
    color: "#10b981",
    story: "Trained, calm, and very loyal. Would thrive in a home with a yard.",
    tags: ["Trained", "Vaccinated", "Calm"],
  },
  {
    id: 4, name: "Mochi", type: "cat", breed: "Persian Mix", age: 3, gender: "Female",
    location: "Kathmandu", health: "vaccinated", urgency: "normal",
    color: "#ec4899",
    story: "Soft as a cloud. Prefers quiet homes. Purrs non-stop when comfortable.",
    tags: ["Spayed", "Vaccinated", "Quiet home"],
  },
  {
    id: 5, name: "Rocky", type: "dog", breed: "Labrador Mix", age: 5, gender: "Male",
    location: "Pokhara", health: "recovering", urgency: "urgent",
    color: "#f97316",
    story: "Recovering from a road accident. Full of spirit. Needs a loving foster to start.",
    tags: ["Recovering", "Vaccinated", "Foster ok"],
  },
  {
    id: 6, name: "Cleo", type: "cat", breed: "Tabby", age: 2, gender: "Female",
    location: "Lalitpur", health: "vaccinated", urgency: "normal",
    color: "#06b6d4",
    story: "Energetic and mischievous. Loves toy mice and high perches. Will keep you entertained.",
    tags: ["Spayed", "Vaccinated", "Playful"],
  },
  {
    id: 7, name: "Biscuit", type: "dog", breed: "Cocker Spaniel Mix", age: 1, gender: "Male",
    location: "Kathmandu", health: "vaccinated", urgency: "normal",
    color: "#84cc16",
    story: "A goofy, floppy-eared puppy found wandering near Swayambhu. Pure joy.",
    tags: ["Vaccinated", "Neutered", "Puppy"],
  },
  {
    id: 8, name: "Nora", type: "cat", breed: "Siamese Mix", age: 4, gender: "Female",
    location: "Bhaktapur", health: "treated", urgency: "normal",
    color: "#3b82f6",
    story: "Talkative, elegant, and opinionated. Loves window seats and sunbeams.",
    tags: ["Spayed", "Vaccinated", "Talkative"],
  },
];

const ANIMAL_EMOJIS = { dog: "🐕", cat: "🐈" };

// ─── Modal ───────────────────────────────────────────────────────────────────
function AdoptModal({ animal, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!animal) return null;

  const handleSubmit = async () => {
    try {
      await api.createAdoption({
        animalId: animal.id,
        ...form,
      });
    } catch {
      // fallback for demo mode when backend is unavailable
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Animal Header */}
        <div className="modal-header" style={{ background: animal.color + "18", borderBottom: `3px solid ${animal.color}` }}>
          <div className="modal-avatar" style={{ background: animal.color + "22", border: `2px solid ${animal.color}` }}>
            <span style={{ fontSize: "2.8rem" }}>{ANIMAL_EMOJIS[animal.type]}</span>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 800 }}>{animal.name}</h2>
            <p style={{ margin: "4px 0 0", color: "var(--text-muted)", fontSize: "0.95rem" }}>
              {animal.breed} · {animal.age} yr · {animal.gender} · 📍 {animal.location}
            </p>
            <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {animal.tags.map(t => (
                <span key={t} className="tag" style={{ background: animal.color + "20", color: animal.color, border: `1px solid ${animal.color}40` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <div style={{ padding: "20px 28px" }}>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontStyle: "italic", fontSize: "0.95rem", borderLeft: `3px solid ${animal.color}`, paddingLeft: "14px", marginBottom: "24px" }}>
            "{animal.story}"
          </p>

          {!submitted ? (
            <>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Apply to Adopt {animal.name}</h3>
              <div className="modal-form">
                <input className="modal-input" placeholder="Your full name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="modal-input" placeholder="Email address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="modal-input" placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <textarea className="modal-input" rows={3} placeholder={`Tell us why you'd be a great home for ${animal.name}...`} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "none" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                <button className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 2, background: animal.color, borderColor: animal.color }}
                  disabled={!form.name || !form.email}
                  onClick={handleSubmit}
                >
                  Submit Application 🐾
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎉</div>
              <h3 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: "8px" }}>Application Sent!</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                We've received your adoption request for <strong>{animal.name}</strong>.<br />
                Our team will contact you within 24 hours.
              </p>
              <button className="btn btn-primary" style={{ marginTop: "20px", background: animal.color }} onClick={onClose}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Animal Card ─────────────────────────────────────────────────────────────
function AnimalCard({ animal, onClick }) {
  return (
    <div className="animal-card" onClick={() => onClick(animal)} style={{ "--accent": animal.color }}>
      <div className="card-image-area" style={{ background: `linear-gradient(135deg, ${animal.color}15 0%, ${animal.color}30 100%)` }}>
        <span className="card-emoji">{ANIMAL_EMOJIS[animal.type]}</span>
        {animal.urgency === "urgent" && (
          <span className="urgency-badge">🆘 Urgent</span>
        )}
        <span className="type-badge">{animal.type === "dog" ? "🐕 Dog" : "🐈 Cat"}</span>
      </div>
      <div className="card-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 className="card-name">{animal.name}</h3>
          <span className="health-dot" style={{ background: animal.health === "vaccinated" ? "#10b981" : animal.health === "recovering" ? "#f59e0b" : "#3b82f6" }} title={animal.health} />
        </div>
        <p className="card-breed">{animal.breed}</p>
        <p className="card-meta">
          <span>🗓 {animal.age} yr</span>
          <span>⚧ {animal.gender}</span>
          <span>📍 {animal.location}</span>
        </p>
        <div className="card-tags">
          {animal.tags.slice(0, 2).map(t => (
            <span key={t} className="tag" style={{ background: animal.color + "15", color: animal.color, border: `1px solid ${animal.color}30` }}>{t}</span>
          ))}
        </div>
        <button className="card-adopt-btn" style={{ background: animal.color }}>
          Meet {animal.name} →
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdoptPage() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterAge, setFilterAge] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const locations = ["all", ...new Set(ANIMALS.map(a => a.location))];

  const filtered = ANIMALS.filter(a => {
    const matchType = filterType === "all" || a.type === filterType;
    const matchLoc = filterLocation === "all" || a.location === filterLocation;
    const matchAge = filterAge === "all"
      || (filterAge === "young" && a.age <= 2)
      || (filterAge === "adult" && a.age > 2 && a.age <= 5)
      || (filterAge === "senior" && a.age > 5);
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
      || a.breed.toLowerCase().includes(search.toLowerCase());
    return matchType && matchLoc && matchAge && matchSearch;
  });

  return (
    <div className="page-wrapper">
      <style>{`
        :root {
          --primary: #2563eb;
          --primary-soft: #eff6ff;
          --primary-dark: #1e40af;
          --success: #10b981;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --card-shadow: 0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05);
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #f8fafc;
          color: var(--text-main);
        }

        /* ── Navbar ── */
        .navbar {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 8%;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid #e2e8f0;
        }
        .brand { font-size: 1.6rem; font-weight: 800; color: var(--primary); letter-spacing: -1px; cursor: pointer; }
        .nav-links a, .nav-links span {
          margin-left: 2rem;
          text-decoration: none;
          color: var(--text-main);
          font-weight: 600;
          transition: 0.3s;
          cursor: pointer;
        }
        .nav-links a:hover, .nav-links span:hover { color: var(--primary); }
        .nav-active { color: var(--primary) !important; border-bottom: 2px solid var(--primary); padding-bottom: 2px; }

        /* ── Hero ── */
        .adopt-hero {
          padding: 70px 8% 50px;
          background: radial-gradient(circle at top left, #fef3c7, #f8fafc 60%),
                      radial-gradient(circle at bottom right, #dbeafe, #f8fafc 60%);
          text-align: center;
        }
        .adopt-hero h1 { font-size: 3.2rem; font-weight: 800; margin-bottom: 14px; line-height: 1.15; }
        .adopt-hero p { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 36px;
          flex-wrap: wrap;
        }
        .stat-item { text-align: center; }
        .stat-item .num { font-size: 2rem; font-weight: 800; color: var(--primary); }
        .stat-item .label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }

        /* ── Filter Bar ── */
        .filter-section {
          padding: 30px 8%;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 65px;
          z-index: 100;
        }
        .filter-row {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }
        .search-input {
          flex: 1;
          min-width: 200px;
          padding: 10px 18px;
          border: 1.5px solid #e2e8f0;
          border-radius: 50px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: 0.2s;
        }
        .search-input:focus { border-color: var(--primary); }

        .filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .pill {
          padding: 8px 18px;
          border-radius: 50px;
          border: 1.5px solid #e2e8f0;
          background: white;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          color: var(--text-muted);
        }
        .pill:hover { border-color: var(--primary); color: var(--primary); }
        .pill.active { background: var(--primary); color: white; border-color: var(--primary); }

        .filter-select {
          padding: 9px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 50px;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          color: var(--text-muted);
          background: white;
        }

        .result-count {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          white-space: nowrap;
          margin-left: auto;
        }

        /* ── Grid ── */
        .adopt-grid-section {
          padding: 50px 8%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .adopt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
        }

        /* ── Animal Card ── */
        .animal-card {
          background: white;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          animation: fadeUp 0.4s ease both;
        }
        .animal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.10);
          border-color: var(--accent);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-image-area {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .card-emoji { font-size: 5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1)); }

        .urgency-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid #fca5a5;
        }
        .type-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid #e2e8f0;
          color: var(--text-muted);
        }

        .card-body { padding: 20px; }
        .card-name { font-size: 1.3rem; font-weight: 800; margin: 0 0 4px; }
        .card-breed { font-size: 0.82rem; color: var(--text-muted); margin: 0 0 10px; }
        .card-meta {
          display: flex;
          gap: 10px;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .card-meta span { display: flex; align-items: center; gap: 3px; }

        .health-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
        }

        .card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
        .tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 50px;
        }

        .card-adopt-btn {
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 12px;
          color: white;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .card-adopt-btn:hover { opacity: 0.88; transform: scale(0.98); }

        /* ── Empty State ── */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-muted);
          grid-column: 1 / -1;
        }
        .empty-state .empty-icon { font-size: 4rem; margin-bottom: 16px; }
        .empty-state h3 { font-size: 1.2rem; margin-bottom: 8px; color: var(--text-main); }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.55);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-box {
          background: white;
          border-radius: 28px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.07);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 700;
          z-index: 10;
          transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(0,0,0,0.14); }

        .modal-header {
          display: flex;
          gap: 18px;
          align-items: center;
          padding: 28px;
        }
        .modal-avatar {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-form { display: flex; flex-direction: column; gap: 12px; }
        .modal-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: 0.2s;
          background: #fcfdfe;
        }
        .modal-input:focus { border-color: var(--primary); }

        /* ── Buttons ── */
        .btn {
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-outline { background: white; color: var(--text-muted); border: 1.5px solid #e2e8f0; }
        .btn-outline:hover { border-color: var(--primary); color: var(--primary); }

        /* ── Footer ── */
        .footer { background: #0f172a; color: #94a3b8; padding: 60px 8% 30px; text-align: center; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .adopt-hero h1 { font-size: 2.2rem; }
          .filter-row { flex-direction: column; align-items: stretch; }
          .result-count { margin-left: 0; }
          .modal-header { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand" onClick={() => navigate("/")}>StrayHaven 🐾</div>
        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span className="nav-active">Adopt</span>
          <span onClick={() => navigate("/rescue")}>Rescue</span>
          <span onClick={() => navigate("/volunteer")}>Volunteer</span>
          <span onClick={() => navigate("/donate")}>Donate</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="adopt-hero">
        <h1>Find Your <span style={{ color: "var(--primary)" }}>Forever Friend</span> 🐾</h1>
        <p>Every animal here has been rescued, treated, and is waiting for a loving home. Could you be the one?</p>
        <div className="stats-bar">
          <div className="stat-item"><div className="num">127</div><div className="label">Animals Rescued</div></div>
          <div className="stat-item"><div className="num">84</div><div className="label">Adopted This Year</div></div>
          <div className="stat-item"><div className="num">{ANIMALS.length}</div><div className="label">Ready Now</div></div>
          <div className="stat-item"><div className="num">12</div><div className="label">Urgent Cases</div></div>
        </div>
      </header>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-row">
          <input
            className="search-input"
            placeholder="🔍  Search by name or breed..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="filter-pills">
            {["all", "dog", "cat"].map(t => (
              <button key={t} className={`pill ${filterType === t ? "active" : ""}`} onClick={() => setFilterType(t)}>
                {t === "all" ? "All Animals" : t === "dog" ? "🐕 Dogs" : "🐈 Cats"}
              </button>
            ))}
          </div>
          <select className="filter-select" value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
            {locations.map(l => <option key={l} value={l}>{l === "all" ? "All Locations" : `📍 ${l}`}</option>)}
          </select>
          <select className="filter-select" value={filterAge} onChange={e => setFilterAge(e.target.value)}>
            <option value="all">Any Age</option>
            <option value="young">Young (0–2 yr)</option>
            <option value="adult">Adult (3–5 yr)</option>
            <option value="senior">Senior (6+ yr)</option>
          </select>
          <span className="result-count">{filtered.length} found</span>
        </div>
      </div>

      {/* Grid */}
      <section className="adopt-grid-section">
        <div className="adopt-grid">
          {filtered.length > 0
            ? filtered.map((animal, i) => (
                <div key={animal.id} style={{ animationDelay: `${i * 0.06}s` }}>
                  <AnimalCard animal={animal} onClick={setSelectedAnimal} />
                </div>
              ))
            : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No animals match your filters</h3>
                <p>Try adjusting your search or clearing filters to see all available animals.</p>
              </div>
            )
          }
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2 style={{ color: "white", marginBottom: "10px" }}>StrayHaven</h2>
        <p>A global network for street animal welfare and emergency response.</p>
        <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #1e293b", fontSize: "0.85rem" }}>
          © 2026 StrayHaven | Kathmandu, Nepal | Together we save lives.
        </div>
      </footer>

      {/* Adoption Modal */}
      {selectedAnimal && (
        <AdoptModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
      )}
    </div>
  );
}
