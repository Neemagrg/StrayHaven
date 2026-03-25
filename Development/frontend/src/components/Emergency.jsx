import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";

export default function Emergency() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [petDetails, setPetDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const submitRescueRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRequestSent(true);
      setPetDetails("");
      setSelectedLocation(null);
      setTimeout(() => setRequestSent(false), 5000);
    }, 1500);
  };

  return (
    <>
      <style>{`
        .emergency-section {
          padding: 80px 8%;
          background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
        }

        .emergency-section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .emergency-section-header h2 {
          font-size: 2.4rem;
          font-weight: 800;
          margin: 0 0 12px;
        }

        .emergency-section-header p {
          font-size: 1.05rem;
          color: #64748b;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .emergency-success {
          background: #dcfce7;
          color: #166534;
          padding: 18px 24px;
          border-radius: 14px;
          margin-bottom: 30px;
          font-weight: 700;
          text-align: center;
          border: 1px solid #bbf7d0;
          font-size: 0.95rem;
        }

        .emergency-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .map-frame {
          background: white;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
          height: 520px;
          position: relative;
          transition: 0.2s;
        }

        .map-frame:hover { box-shadow: 0 24px 30px rgba(0,0,0,0.1); }

        .map-frame .map-pin { font-size: 4rem; }

        .map-frame .map-text {
          font-weight: 700;
          color: #1e40af;
          font-size: 1rem;
        }

        .map-frame .map-sub {
          font-size: 0.82rem;
          color: #64748b;
        }

        .map-pin-set {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #2563eb;
          color: white;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 50px;
        }

        .rescue-form {
          background: white;
          padding: 32px;
          border-radius: 28px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .rescue-form h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
        }

        .form-label {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #94a3b8;
        }

        .location-indicator {
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .rescue-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          font-family: inherit;
          font-size: 0.9rem;
          resize: none;
          background: #fcfdfe;
          outline: none;
          transition: 0.2s;
          line-height: 1.6;
        }

        .rescue-textarea:focus { border-color: #2563eb; }

        .rescue-submit-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: #2563eb;
          color: white;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rescue-submit-btn:hover:not(:disabled) {
          background: #1e40af;
          transform: translateY(-1px);
        }

        .rescue-submit-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .rescue-divider {
          text-align: center;
          color: #94a3b8;
          font-size: 0.82rem;
        }

        .rescue-full-link {
          width: 100%;
          padding: 13px;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          background: white;
          color: #64748b;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rescue-full-link:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        @media (max-width: 1024px) {
          .emergency-layout { grid-template-columns: 1fr; }
          .map-frame { height: 320px; }
        }
      `}</style>

      <section className="emergency-section" id="rescue-section">
        <div className="emergency-section-header">
          <h2>Report an <span style={{ color: "#dc2626" }}>Emergency</span> 🆘</h2>
          <p>Click on the map to drop a pin where the animal was last seen. Our team responds immediately.</p>
        </div>

        {requestSent && (
          <div className="emergency-success">
            🚀 RESCUE DISPATCHED! Our team is heading to your coordinates now. Stay safe!
          </div>
        )}

        <div className="emergency-layout">
          {/* Map */}
          <div className="map-frame">
            {selectedLocation && (
              <span className="map-pin-set">📍 Pin Dropped</span>
            )}
            <MapComponent
              setLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
              targetLocation={selectedLocation || { lat: 27.7172, lng: 85.3240 }}
            />
          </div>

          {/* Form */}
          <div className="rescue-form">
            <h3>Quick Rescue Report</h3>

            <div>
              <p className="form-label">1. Pin Location</p>
              <div
                className="location-indicator"
                style={{
                  background: selectedLocation ? "#eff6ff" : "#fff1f2",
                  border: `1px dashed ${selectedLocation ? "#2563eb" : "#f43f5e"}`,
                  color: selectedLocation ? "#2563eb" : "#f43f5e",
                }}
              >
                {selectedLocation
                  ? `📍 Location Locked: ${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`
                  : "⚠️ Please tap on the map to set rescue point"}
              </div>
            </div>

            <div>
              <p className="form-label">2. Pet Description</p>
              <textarea
                className="rescue-textarea"
                rows={5}
                placeholder="Tell us about the animal — species, color, injury, location landmarks..."
                value={petDetails}
                onChange={(e) => setPetDetails(e.target.value)}
              />
            </div>

            <button
              className="rescue-submit-btn"
              disabled={!selectedLocation || !petDetails || isSubmitting}
              onClick={submitRescueRequest}
            >
              {isSubmitting ? "Dispatching Team..." : "🚀 Confirm & Send Rescue"}
            </button>

            <div className="rescue-divider">— or —</div>

            <button className="rescue-full-link" onClick={() => navigate("/rescue")}>
              Open Full Rescue Form →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
