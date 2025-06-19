"use client";
import React from "react";
import { colorPalette } from "@/utils/variables";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  border: `1.5px solid ${colorPalette.green4}`,
  borderRadius: 8,
  background: colorPalette.whiteMint,
  color: colorPalette.green1,
  fontSize: "1rem",
  marginTop: 2,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: colorPalette.green2,
  marginBottom: 2,
  display: "block",
  fontSize: "1rem",
};

const btnStyle: React.CSSProperties = {
  background: colorPalette.green5,
  color: colorPalette.white,
  padding: "12px 32px",
  borderRadius: 8,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  marginTop: 10,
  fontSize: "1rem",
  letterSpacing: "0.5px",
  boxShadow: `0 2px 8px ${colorPalette.greenShadow}22`,
};

const JoinTeamForm = () => (
  <form
    // className="space-y-5 p-8 rounded-2xl shadow-lg"
    // style={{ background: colorPalette.white }}
  >
    <div>
      <label style={labelStyle}>First Name *</label>
      <input required placeholder="First Name" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Last Name *</label>
      <input required placeholder="Last Name" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Gender *</label>
      <input required placeholder="Gender" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Phone No. *</label>
      <input required placeholder="Phone No." style={inputStyle} type="tel" />
    </div>
    <div>
      <label style={labelStyle}>Email ID *</label>
      <input required placeholder="Email ID" style={inputStyle} type="email" />
    </div>
    <div>
      <label style={labelStyle}>City/Town/Village *</label>
      <input required placeholder="City/Town/Village" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>State *</label>
      <input required placeholder="State" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>LinkedIn Profile URL *</label>
      <input required placeholder="LinkedIn Profile URL" style={inputStyle} type="url" />
    </div>
    <div>
      <label style={labelStyle}>Position Applying For *</label>
      <input required placeholder="Position Applying For" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Job Location</label>
      <input placeholder="Job Location" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>How did you hear about this Job Opening?</label>
      <input placeholder="How did you hear about this Job Opening?" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Experience *</label>
      <input required placeholder="Experience" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Educational Qualification *</label>
      <input required placeholder="Educational Qualification" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Current/Previous Place of Work (whichever applicable) *</label>
      <input required placeholder="Current/Previous Place of Work" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Why are you interested in this role? *</label>
      <textarea required placeholder="Why are you interested in this role?" style={inputStyle} rows={3} />
    </div>
    <div>
      <label style={labelStyle}>Your Message/Query *</label>
      <textarea required placeholder="Your Message/Query" style={inputStyle} rows={3} />
    </div>
    <div>
      <label style={labelStyle}>Resume/CV *</label>
      <input required style={inputStyle} type="file" />
    </div>
    <div>
      <label style={labelStyle}>Upload Portfolio (if applicable)</label>
      <input style={inputStyle} type="file" />
    </div>
    <div>
      <label style={labelStyle}>Are you willing to relocate? *</label>
      <input required placeholder="Are you willing to relocate?" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Availability to join the new role *</label>
      <input required placeholder="Availability to join the new role" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Current Salary (INR)</label>
      <input placeholder="Current Salary (INR)" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Expected Salary</label>
      <input placeholder="Expected Salary" style={inputStyle} />
    </div>
    <button type="submit" style={btnStyle}>Submit</button>
  </form>
);

export default JoinTeamForm;