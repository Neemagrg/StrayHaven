import React, { useState } from "react";

const ReportStray = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    urgency: "",
    contact: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/stray/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(data.message);
      setFormData({ location: "", description: "", urgency: "", contact: "" });
    } catch (err) {
      console.error(err);
      alert("Error submitting report");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Report a Stray Animal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <select name="urgency" value={formData.urgency} onChange={handleChange} required>
          <option value="">Select Urgency</option>
          <option value="Emergency">Emergency</option>
          <option value="Normal">Normal</option>
        </select>
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportStray;