import React, { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";

function Home() {
  // Map States
  const [targetLocation, setTargetLocation] = useState({ lat: 27.7172, lng: 85.3240 }); // Kathmandu Default
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Rescue Form States
  const [petDetails, setPetDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Smooth scroll to map when "Report" is clicked
  const scrollToMap = () => {
    document.getElementById("rescue-section").scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate finding a location based on search
    alert(`Searching for stray rescues in ${searchQuery}...`);
    setTargetLocation({ lat: 27.6710, lng: 85.3210 }); // Moves map to Patan area
  };

  const submitRescueRequest = () => {
    setIsSubmitting(true);
    // Simulate Backend API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setRequestSent(true);
      setPetDetails("");
      setSelectedLocation(null);
      // Reset success message after 5 seconds
      setTimeout(() => setRequestSent(false), 5000);
    }, 1500);
  };

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
          --card-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        }

        body { 
          margin: 0; 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          background-color: #f8fafc;
          color: var(--text-main);
        }

        /* Navigation */
        .navbar {
          background: rgba(255, 255, 255, 0.9);
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

        .brand { font-size: 1.6rem; font-weight: 800; color: var(--primary); letter-spacing: -1px; }

        .nav-links a {
          margin-left: 2rem;
          text-decoration: none;
          color: var(--text-main);
          font-weight: 600;
          transition: 0.3s;
        }

        .nav-links a:hover { color: var(--primary); }

        /* Hero Section */
        .hero {
          padding: 100px 8% 60px;
          background: radial-gradient(circle at top right, #dbeafe, #f8fafc);
          text-align: center;
        }

        .hero h1 { font-size: 4rem; line-height: 1.1; margin-bottom: 20px; }
        .hero p { font-size: 1.25rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 40px; }

        .search-bar {
          background: white;
          padding: 10px;
          border-radius: 60px;
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: var(--card-shadow);
          border: 1px solid #e2e8f0;
        }

        .search-bar input {
          flex: 1;
          border: none;
          padding: 0 25px;
          outline: none;
          font-size: 1rem;
        }

        /* Buttons */
        .btn {
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 10px 15px rgba(37, 99, 235, 0.2); }

        /* Map & Rescue Section */
        .rescue-container {
          padding: 80px 8%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 30px;
          margin-top: 40px;
        }

        @media (max-width: 1024px) { .dashboard-layout { grid-template-columns: 1fr; } }

        .map-frame {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: var(--card-shadow);
          height: 550px;
        }

        .rescue-form {
          background: white;
          padding: 30px;
          border-radius: 30px;
          border: 1px solid #e2e8f0;
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-area {
          width: 100%;
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          font-family: inherit;
          font-size: 1rem;
          resize: none;
          background: #fcfdfe;
        }

        /* Articles */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          padding: 0 8% 80px;
        }

        .card {
          background: white;
          padding: 40px;
          border-radius: 25px;
          border: 1px solid #f1f5f9;
          transition: 0.3s;
        }

        .card:hover { transform: translateY(-10px); box-shadow: var(--card-shadow); border-color: var(--primary-soft); }

        .icon-circle {
          width: 60px; height: 60px;
          background: var(--primary-soft);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; margin-bottom: 20px;
        }

        .footer { background: #0f172a; color: #94a3b8; padding: 80px 8% 40px; text-align: center; }
      `}</style>

      <nav className="navbar">
        <div className="brand">StrayHaven 🐾</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Adopt</a>
          <a href="#rescue-section">Rescue</a>
          <a href="#">Volunteer</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Saving Lives, <br/><span style={{color: 'var(--primary)'}}>One Pin At A Time.</span></h1>
        <p>If you see a stray animal in distress, mark their location on our map. Our professional rescue team will be dispatched immediately.</p>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search your city to find active rescues..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Find Rescue Hubs</button>
        </form>
      </header>

      <section id="rescue-section" className="rescue-container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{fontSize: '2.5rem'}}>Report an Emergency</h2>
          <p style={{color: 'var(--text-muted)'}}>Click on the map to drop a pin where the animal was last seen.</p>
        </div>

        {requestSent && (
          <div style={{ 
            background: '#dcfce7', color: '#166534', padding: '20px', 
            borderRadius: '15px', marginBottom: '30px', fontWeight: '700', textAlign: 'center',
            border: '1px solid #bbf7d0'
          }}>
            🚀 RESCUE DISPATCHED! Our team is heading to your coordinates now. Stay safe!
          </div>
        )}

        <div className="dashboard-layout">
          {/* Map Side */}
          <div className="map-frame">
            <MapComponent setLocation={setSelectedLocation} targetLocation={targetLocation} />
          </div>

          {/* Rescue Side Panel */}
          <div className="rescue-form">
            <h3 style={{marginTop: 0}}>Rescue Details</h3>
            
            <label style={{fontWeight: '600', fontSize: '0.9rem'}}>1. PIN LOCATION</label>
            <div style={{ 
              padding: '15px', borderRadius: '12px', background: selectedLocation ? '#eff6ff' : '#fff1f2',
              border: `1px dashed ${selectedLocation ? '#2563eb' : '#f43f5e'}`,
              color: selectedLocation ? '#2563eb' : '#f43f5e', fontSize: '0.85rem'
            }}>
              {selectedLocation 
                ? `📍 Location Locked: ${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}` 
                : "⚠️ Please tap on the map to set rescue point"}
            </div>

            <label style={{fontWeight: '600', fontSize: '0.9rem', marginTop: '10px'}}>2. PET DESCRIPTION</label>
            <textarea 
              className="input-area" 
              rows="5" 
              placeholder="Tell us about the pet (e.g., 'Injured white dog, near the tea shop, very scared')..."
              value={petDetails}
              onChange={(e) => setPetDetails(e.target.value)}
            />

            <button 
              className="btn btn-primary" 
              style={{marginTop: '10px', width: '100%'}}
              disabled={!selectedLocation || !petDetails || isSubmitting}
              onClick={submitRescueRequest}
            >
              {isSubmitting ? "Dispatching Team..." : "Confirm & Send Rescue"}
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <h2 style={{textAlign: 'center', marginBottom: '50px', fontSize: '2.2rem'}}>Rescue Guides</h2>
        <div className="grid">
          <GuideCard icon="🦴" title="First Response" desc="Learn how to approach a stray safely without causing them further stress." />
          <GuideCard icon="🩺" title="Emergency Care" desc="Basic first aid steps you can take while waiting for our rescue team to arrive." />
          <GuideCard icon="🏠" title="Foster Care" desc="How you can provide a temporary home for a recovering street soul." />
        </div>
      </section>

      <footer className="footer">
        <h2 style={{color: 'white', marginBottom: '10px'}}>StrayHaven</h2>
        <p>A global network for street animal welfare and emergency response.</p>
        <div style={{marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #1e293b', fontSize: '0.85rem'}}>
          © 2026 StrayHaven | Kathmandu, Nepal | Together we save lives.
        </div>
      </footer>
    </div>
  );
}

function GuideCard({ icon, title, desc }) {
  return (
    <div className="card">
      <div className="icon-circle">{icon}</div>
      <h3>{title}</h3>
      <p style={{color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '25px'}}>{desc}</p>
      <a href="#" style={{color: 'var(--primary)', fontWeight: '700', textDecoration: 'none'}}>Read Guide →</a>
    </div>
  );
}

export default Home;