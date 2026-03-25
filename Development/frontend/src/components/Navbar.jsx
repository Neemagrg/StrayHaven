import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home",      path: "/" },
    { label: "Adopt",     path: "/adopt" },
    { label: "Rescue",    path: "/rescue" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Donate",    path: "/donate" },
    { label: "Vet Directory", path: "/vet-directory" },
    { label: "Blog",      path: "/blog" },
    { label: "About",     path: "/about" },
  ];

  return (
    <>
      <style>{`
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
        .navbar-brand {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: -1px;
          cursor: pointer;
          text-decoration: none;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .navbar-toggle {
          display: none;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 10px;
          padding: 6px 10px;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .navbar-links a {
          padding: 7px 14px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.92rem;
          color: #0f172a;
          transition: color 0.2s, background 0.2s;
        }
        .navbar-links a:hover {
          color: #2563eb;
          background: #eff6ff;
        }
        .navbar-links a.active {
          color: #2563eb;
          background: #eff6ff;
        }
        .navbar-login {
          margin-left: 10px;
          padding: 8px 22px;
          background: #2563eb;
          color: white !important;
          border-radius: 50px;
          font-weight: 700 !important;
        }
        .navbar-login:hover {
          background: #1e40af !important;
          color: white !important;
        }
        @media (max-width: 768px) {
          .navbar { padding: 1rem 5%; }
          .navbar-toggle { display: inline-flex; }
          .navbar-links {
            position: absolute;
            top: calc(100% + 8px);
            right: 5%;
            left: 5%;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            flex-direction: column;
            align-items: stretch;
            gap: 4px;
            padding: 10px;
            display: none;
          }
          .navbar-links.open { display: flex; }
          .navbar-links a { padding: 10px; font-size: 0.9rem; }
          .navbar-login { margin-left: 0; text-align: center; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          StrayHaven 🐾
        </div>
        <button className="navbar-toggle" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle navigation">
          {isOpen ? "✕" : "☰"}
        </button>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {links.map(({ label, path }) => (
            <a
              key={path}
              href={path}
              className={location.pathname === path ? "active" : ""}
              onClick={(e) => { e.preventDefault(); setIsOpen(false); navigate(path); }}
            >
              {label}
            </a>
          ))}
          {isAuthenticated ? (
            <a
              href="/"
              className="navbar-login"
              onClick={(e) => {
                e.preventDefault();
                logout();
                setIsOpen(false);
                navigate("/");
              }}
            >
              Logout
            </a>
          ) : (
            <a
              href="/login"
              className="navbar-login"
              onClick={(e) => { e.preventDefault(); setIsOpen(false); navigate("/login"); }}
            >
              Login
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
