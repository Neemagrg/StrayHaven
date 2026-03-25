import { useNavigate } from "react-router-dom";

const LINKS = {
  Platform: [
    { label: "Report a Stray",  path: "/rescue" },
    { label: "Adopt an Animal", path: "/adopt" },
    { label: "Volunteer",       path: "/volunteer" },
    { label: "Donate",          path: "/donate" },
  ],
  Resources: [
    { label: "Blog & Stories",  path: "/blog" },
    { label: "Rescue Guides",   path: "/blog" },
    { label: "First Aid Tips",  path: "/blog" },
    { label: "About Us",        path: "/about" },
  ],
  Contact: [
    { label: "📧 hello@strayhaven.org",     path: null },
    { label: "📞 +977-1-4411950",           path: null },
    { label: "📍 Kathmandu, Nepal",          path: null },
  ],
};

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .footer {
          background: #0f172a;
          color: #94a3b8;
          padding: 70px 8% 36px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 56px;
        }

        .footer-brand h2 {
          color: white;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0 0 12px;
        }

        .footer-brand p {
          font-size: 0.88rem;
          line-height: 1.7;
          max-width: 280px;
          color: #64748b;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s;
          text-decoration: none;
        }

        .footer-social-btn:hover {
          background: #2563eb;
          border-color: #2563eb;
        }

        .footer-col h4 {
          color: white;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 18px;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-col ul li a,
        .footer-col ul li span {
          color: #64748b;
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.2s;
          cursor: pointer;
        }

        .footer-col ul li a:hover { color: white; }

        .footer-bottom {
          border-top: 1px solid #1e293b;
          padding-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-bottom p {
          font-size: 0.82rem;
          margin: 0;
          color: #475569;
        }

        .footer-badge {
          background: #1e293b;
          border: 1px solid #334155;
          color: #64748b;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 50px;
        }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }

        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h2>StrayHaven 🐾</h2>
            <p>
              Nepal's platform for street animal welfare — connecting citizens,
              vets, volunteers, and shelters to rescue, heal, and rehome strays.
            </p>
            <div className="footer-socials">
              {["🐦", "📘", "📸", "▶️"].map((icon, i) => (
                <a key={i} className="footer-social-btn" href="#" onClick={e => e.preventDefault()}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading} className="footer-col">
              <h4>{heading}</h4>
              <ul>
                {items.map(({ label, path }) => (
                  <li key={label}>
                    {path ? (
                      <a href={path} onClick={(e) => { e.preventDefault(); navigate(path); }}>
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2026 StrayHaven · Kathmandu, Nepal · Together we save lives.</p>
          <span className="footer-badge">Made with ❤️ for every stray</span>
        </div>
      </footer>
    </>
  );
}
