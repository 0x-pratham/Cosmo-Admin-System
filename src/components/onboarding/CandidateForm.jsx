import React, { useState, useRef } from 'react';
import { theme } from './onboardingTheme';
import { FaCamera, FaCloudUploadAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiCheckCircle } from "react-icons/fi";

const CandidateForm = ({ candidate, setCandidate }) => {
  // UI States
  const [activeSection, setActiveSection] = useState('personal');
  const [isDragging, setIsDragging] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const fileInputRef = useRef(null);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setDateInput(val); // YYYY-MM-DD
    if (val) {
      const dateObj = new Date(val);
      // Format to "02 August 2026"
      const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      setCandidate((prev) => ({ ...prev, joiningDate: formattedDate }));
    } else {
      setCandidate((prev) => ({ ...prev, joiningDate: "" }));
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
        alert("Please upload a valid image file.");
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setCandidate((prev) => ({
        ...prev,
        photo: file, 
        photoPreview: reader.result, 
      }));
    };
    reader.readAsDataURL(file);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  // Premium Styles
  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: `1.5px solid ${theme.colors.border}`,
    fontFamily: 'Google Sans Flex, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#FAFAFA',
  };

  const labelStyle = {
    display: 'flex',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const requiredMark = <span style={{ color: '#E46A09', marginLeft: '4px' }}>*</span>;

  // Accordion Header Component
  const SectionHeader = ({ id, title, completed }) => (
    <div 
        onClick={() => toggleSection(id)}
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            backgroundColor: activeSection === id ? '#FFF8F3' : '#FFFFFF',
            borderBottom: activeSection === id ? `1px solid ${theme.colors.border}` : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            borderBottomLeftRadius: activeSection === id ? '0' : '12px',
            borderBottomRightRadius: activeSection === id ? '0' : '12px',
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ margin: 0, color: activeSection === id ? theme.colors.primary : theme.colors.dark, fontSize: '16px', fontWeight: '600' }}>
                {title}
            </h3>
            {completed && <FiCheckCircle color="#27AE60" size={16} />}
        </div>
        {activeSection === id ? <FiChevronUp size={20} color={theme.colors.primary} /> : <FiChevronDown size={20} color="#999" />}
    </div>
  );

  return (
    <div style={{ backgroundColor: theme.colors.white, padding: '30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
      <h2 style={{ color: theme.colors.dark, marginBottom: '25px', fontFamily: 'Times New Roman, serif', fontSize: '28px' }}>
        Candidate Details
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* SECTION 1: Personal Information */}
        <div style={{ border: `1px solid ${theme.colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <SectionHeader id="personal" title="Personal Information" completed={candidate.fullName && candidate.email} />
          
          {activeSection === 'personal' && (
            <div style={{ padding: '25px 20px 5px 20px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <div>
                  <label style={labelStyle}>Full Name {requiredMark}</label>
                  <input style={inputStyle} type="text" name="fullName" value={candidate.fullName} onChange={handleChange} placeholder="e.g. Prathamesh Bhil" />
                </div>
                <div>
                  <label style={labelStyle}>Employee ID {requiredMark}</label>
                  <input style={inputStyle} type="text" name="employeeId" value={candidate.employeeId} onChange={handleChange} placeholder="e.g. COSMO-INT-001" />
                </div>
              </div>
              
              <label style={labelStyle}>Email Address {requiredMark}</label>
              <input style={inputStyle} type="email" name="email" value={candidate.email} onChange={handleChange} placeholder="e.g. prathamesh@cosmolix.co.in" />

              <label style={labelStyle}>Phone Number {requiredMark}</label>
              <input style={inputStyle} type="tel" name="phone" value={candidate.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
            </div>
          )}
        </div>

        {/* SECTION 2: Internship Details */}
        <div style={{ border: `1px solid ${theme.colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <SectionHeader id="internship" title="Role & Department" completed={candidate.role && candidate.department} />
          
          {activeSection === 'internship' && (
            <div style={{ padding: '25px 20px 5px 20px', backgroundColor: '#FFFFFF' }}>
              
              <label style={labelStyle}>Department {requiredMark}</label>
              <select style={inputStyle} name="department" value={candidate.department} onChange={handleChange}>
                <option value="" disabled>Select Department</option>
                <option value="Software Development">Software Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>

              <label style={labelStyle}>Role {requiredMark}</label>
              <input style={inputStyle} type="text" name="role" value={candidate.role} onChange={handleChange} placeholder="e.g. Full Stack Developer Intern" />
              
              <label style={labelStyle}>Joining Date {requiredMark}</label>
              <input 
                style={{...inputStyle, cursor: 'text'}} 
                type="date" 
                value={dateInput} 
                onChange={handleDateChange} 
              />
              <small style={{display: 'block', marginTop: '-15px', marginBottom: '20px', color: '#888', fontSize: '12px'}}>
                Preview Format: {candidate.joiningDate || "Select a date"}
              </small>
            </div>
          )}
        </div>

        {/* SECTION 3: Reporting Details */}
        <div style={{ border: `1px solid ${theme.colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <SectionHeader id="reporting" title="Reporting & Assets" completed={candidate.reportingManager} />
          
          {activeSection === 'reporting' && (
            <div style={{ padding: '25px 20px 5px 20px', backgroundColor: '#FFFFFF' }}>
              <label style={labelStyle}>Reporting Manager</label>
              <input style={inputStyle} type="text" name="reportingManager" value={candidate.reportingManager} onChange={handleChange} placeholder="e.g. HR Team" />

              <label style={labelStyle}>HR Contact</label>
              <input style={inputStyle} type="text" name="hrContact" value={candidate.hrContact} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
              
              <label style={labelStyle}>Welcome Kit Status</label>
              <select style={inputStyle} name="welcomeKit" value={candidate.welcomeKit} onChange={handleChange}>
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          )}
        </div>

        {/* SECTION 4: Candidate Photograph (Drag & Drop) */}
        <div style={{ border: `1px solid ${theme.colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <SectionHeader id="photo" title="Candidate Photograph" completed={!!candidate.photoPreview} />
          
          {activeSection === 'photo' && (
            <div style={{ padding: '25px 20px 25px 20px', backgroundColor: '#FFFFFF' }}>
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                style={{
                    border: `2px dashed ${isDragging ? theme.colors.primary : '#D1D5DB'}`,
                    backgroundColor: isDragging ? '#FFF8F3' : '#F9FAFB',
                    borderRadius: '16px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
              >
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                    ref={fileInputRef}
                    style={{ display: 'none' }} 
                />
                
                {candidate.photoPreview ? (
                  <div style={{ position: 'relative' }}>
                      <img 
                          src={candidate.photoPreview} 
                          alt="Preview" 
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', border: `4px solid #fff`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                      />
                      <div style={{ marginTop: '15px', color: theme.colors.primary, fontWeight: '600', fontSize: '14px' }}>Click to replace photo</div>
                  </div>
                ) : (
                  <>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FFF2EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                        <FaCloudUploadAlt size={30} color={theme.colors.primary} />
                    </div>
                    <p style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151', fontWeight: '600' }}>Click to upload or drag and drop</p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CandidateForm;