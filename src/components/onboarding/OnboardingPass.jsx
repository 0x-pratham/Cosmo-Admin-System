import React from "react";
import "./onboarding.css";
import { QRCodeSVG } from "qrcode.react";
import { FiCalendar, FiPhone, FiMail, FiUser, FiAward, FiSend, FiUsers, FiStar } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function OnboardingPass({ candidate }) {
  const c = candidate || {
    fullName: "Prathamesh Bhil",
    role: "Full Stack Developer Intern",
    department: "Software Development",
    employeeId: "COSMO-INT-0001",
    joiningDate: "02 August 2026",
    reportingManager: "HR Team",
    welcomeKit: "Dispatched",
    hrContact: "+91 98765 43210",
    photo: null,
    photoPreview: "",
  };

  return (
    <div className="onboarding-page">
      <div className="ticket-wrapper">
        
        {/* UPDATED WRAPPER: Flexbox aur max-content ensures 100% equal margins on all 4 sides */}
        <div 
          id="onboarding-pass-capture" 
          style={{ 
            padding: '50px', // Exact equal margin on Top, Bottom, Left, Right
            backgroundColor: '#F4F7F6', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'max-content',
            margin: '0 auto'
          }}
        >
          <div 
            id="onboarding-pass" 
            className="ticket" 
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', 
              borderRadius: '24px',
              margin: 0
            }}
          >
            
            {/* === LEFT & CENTER PANES === */}
            <div className="ticket-main">
              <img 
                src="https://cosmolix.co.in/logo/cosmolix-logo.png" 
                alt="Watermark" 
                className="watermark-bg"
                crossOrigin="anonymous" 
              />

              <div className="main-content">
                
                {/* Left Column */}
                <div className="left-col">
                  <div className="brand">
                    <img 
                      src="https://cosmolix.co.in/logo/cosmolix-logo.png" 
                      alt="Cosmolix" 
                      crossOrigin="anonymous" 
                    />
                  </div>

                  <div className="hero">
                    <h1>
                      ONBOARDING
                      <br />
                      <span className="orange-text">PASS</span>
                    </h1>
                  </div>

                  <div className="welcome">
                    <h2>
                      <span className="orange-text">WELCOME</span> TO THE COSMOLIX FAMILY!
                    </h2>
                    <p>
                      We're excited to have you on board.<br />
                      Together, let's build, innovate and<br />
                      create excellence.
                    </p>
                  </div>

                  <div className="signature">
                    <h3 className="signature-font">Prathamesh</h3>
                    <h4 className="signature-name">Prathamesh Bhil</h4>
                    <p className="signature-role">Founder & CEO</p>
                  </div>
                </div>

                {/* Center Column */}
                <div className="center-col">
                  <div className="photo-container">
                    {c.photoPreview || c.photo ? (
                      <img src={c.photoPreview || c.photo} alt={c.fullName} crossOrigin="anonymous" />
                    ) : (
                      <FaUserCircle size={90} className="fallback-photo" color="#D35C18" />
                    )}
                  </div>
                  <div className="photo-label">CANDIDATE PHOTO</div>

                  <div className="details-list">
                    <div className="detail-row">
                      <span className="label">NAME</span>
                      <span className="dots"></span>
                      <span className="value">{c.fullName || "____________"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">ROLE</span>
                      <span className="dots"></span>
                      <span className="value">{c.role || "____________"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">DEPARTMENT</span>
                      <span className="dots"></span>
                      <span className="value">{c.department || "____________"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">EMPLOYEE ID</span>
                      <span className="dots"></span>
                      <span className="value">{c.employeeId || "____________"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">DATE OF JOINING</span>
                      <span className="dots"></span>
                      <span className="value">{c.joiningDate || "____________"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="main-footer">
                <div className="footer-black-corner"></div>
                <div className="footer-badges">
                  <div className="badge">
                    <FiAward size={20} className="badge-icon" />
                    <span>YOU'RE<br />OFFICIALLY<br />ONE OF US!</span>
                  </div>
                  <div className="badge-divider"></div>
                  <div className="badge">
                    <FiSend size={20} className="badge-icon" />
                    <span>INNOVATE<br />BOLDLY</span>
                  </div>
                  <div className="badge-divider"></div>
                  <div className="badge">
                    <FiUsers size={20} className="badge-icon" />
                    <span>COLLABORATE<br />FEARLESSLY</span>
                  </div>
                  <div className="badge-divider"></div>
                  <div className="badge">
                    <FiStar size={20} className="badge-icon" />
                    <span>CREATE<br />IMPACT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* === PERFORATION DIVIDER === */}
            <div className="ticket-divider">
              <div className="cut-top"></div>
              <div className="cut-bottom"></div>
            </div>

            {/* === RIGHT STUB === */}
            <div className="ticket-stub">
              <div className="stub-content">
                <div className="qr-container">
                  <div className="qr-box">
                    <QRCodeSVG value={`https://verify.cosmolix.co.in/${c.employeeId || "0000"}`} size={90} fgColor="#111" />
                  </div>
                  <p>SCAN TO ACCESS<br />ONBOARDING PORTAL</p>
                </div>

                <div className="stub-divider"></div>

                <div className="side-list">
                  <div className="side-item">
                    <div className="icon-box"><FiCalendar size={15} /></div>
                    <div className="item-text">
                      <label>ONBOARDING DATE</label>
                      <div className="val-container">
                        <span className="val-text">{c.joiningDate || "____________"}</span>
                        <div className="val-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="side-item">
                    <div className="icon-box"><FiUser size={15} /></div>
                    <div className="item-text">
                      <label>REPORTING MANAGER</label>
                      <div className="val-container">
                        <span className="val-text">{c.reportingManager || "____________"}</span>
                        <div className="val-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="side-item">
                    <div className="icon-box"><FiMail size={15} /></div>
                    <div className="item-text">
                      <label>WELCOME KIT</label>
                      <div className="val-container">
                        <span className="val-text">{c.welcomeKit || "____________"}</span>
                        <div className="val-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="side-item">
                    <div className="icon-box"><FiPhone size={15} /></div>
                    <div className="item-text">
                      <label>HR CONTACT</label>
                      <div className="val-container">
                        <span className="val-text">{c.hrContact || "____________"}</span>
                        <div className="val-line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stub Footer */}
              <div className="stub-footer">
                <h2 className="cursive-text">Welcome Aboard!</h2>
                <p>THE JOURNEY STARTS HERE.</p>
                <div className="footer-dot-decor">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}