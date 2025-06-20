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

const GeneralQueryForm = () => (
  <form>
    <div>
      <label style={labelStyle}>First Name *</label>
      <input required placeholder="First Name" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Last Name *</label>
      <input required placeholder="Last Name" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Email ID *</label>
      <input required placeholder="Email ID" style={inputStyle} type="email" />
    </div>
    <div>
      <label style={labelStyle}>Phone No. *</label>
      <input required placeholder="Phone No." style={inputStyle} type="tel" />
    </div>
    <div>
      <label style={labelStyle}>Company Name</label>
      <input placeholder="Company Name" style={inputStyle} />
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
      <label style={labelStyle}>Industry *</label>
      <input required placeholder="Industry" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Type of Drone Solution Interested In</label>
      <input placeholder="Type of Drone Solution Interested In" style={inputStyle} />
    </div>
    <div>
      <label style={labelStyle}>Your Message/Query *</label>
      <textarea required placeholder="Your Message/Query" style={inputStyle} rows={3} />
    </div>
    <button type="submit" style={btnStyle}>Submit</button>
  </form>
);

export default GeneralQueryForm;