import React, { useState } from 'react';
import OnboardingPass from './OnboardingPass';
import { FiZoomIn, FiZoomOut, FiMaximize, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

export default function PreviewPanel({ candidate }) {
    // FIX 1: Zoom ko wapas badha kar 0.65 kar diya taaki pass clearly visible ho.
    const [zoom, setZoom] = useState(0.65); 
    
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
    const handleResetZoom = () => setZoom(0.65);

    const previewData = {
        fullName: candidate.fullName || "Candidate Name",
        role: candidate.role || "Intern Role",
        department: candidate.department || "Department Name",
        employeeId: candidate.employeeId || "COSMO-INT-XXXX",
        joiningDate: candidate.joiningDate || "DD Month YYYY",
        reportingManager: candidate.reportingManager || "Manager Name",
        welcomeKit: candidate.welcomeKit || "Pending",
        hrContact: candidate.hrContact || "+91 XXXXX XXXXX",
        photoPreview: candidate.photoPreview || "",
    };

    const isFormEmpty = !candidate.fullName && !candidate.role && !candidate.employeeId;

    return (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            
            <style>{`
                .pulse-dot {
                    width: 10px;
                    height: 10px;
                    background-color: #2ECC71;
                    border-radius: 50%;
                    animation: pulse-animation 1.6s infinite;
                }
                @keyframes pulse-animation {
                    0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
                    70% { box-shadow: 0 0 0 8px rgba(46, 204, 113, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
                }
                .zoom-btn {
                    background: #FFFFFF;
                    border: 1px solid #E5E7EB;
                    color: #4B5563;
                    border-radius: 8px;
                    padding: 6px 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .zoom-btn:hover { background: #F3F4F6; color: #111; }
                .canvas-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
                .canvas-scroll::-webkit-scrollbar-track { background: transparent; }
                .canvas-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
                
                /* FIX 2: Ye override onboarding.css ki extra heights aur margins ko nikal dega */
                .preview-pass-wrapper .onboarding-page {
                    min-height: unset !important;
                    height: auto !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    display: block !important;
                }
            `}</style>

            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span style={{ backgroundColor: '#FFF2EB', color: '#E46A09', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '20px', letterSpacing: '1px' }}>LIVE PREVIEW</span>
                    <h2 style={{ margin: '8px 0 4px 0', fontSize: '20px', color: '#111', fontFamily: 'Times New Roman, serif' }}>Onboarding Pass Preview</h2>
                    <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>Changes are rendered instantly.</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F0FDF4', padding: '6px 12px', borderRadius: '20px', border: '1px solid #BBF7D0' }}>
                    <div className="pulse-dot"></div>
                    <span style={{ color: '#166534', fontSize: '12px', fontWeight: '600' }}>Live</span>
                </div>
            </div>

            <div style={{ padding: '16px 24px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {previewData.photoPreview ? (
                        <img src={previewData.photoPreview} alt="Candidate" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFF', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
                    ) : (
                        <FaUserCircle size={48} color="#CBD5E1" />
                    )}
                    
                    <div>
                        <h3 style={{ margin: '0 0 2px 0', color: '#111', fontSize: '16px', fontWeight: '700' }}>{previewData.fullName}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6B7280', fontSize: '12px', fontWeight: '500' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiBriefcase /> {previewData.role}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><strong>ID:</strong> {previewData.employeeId}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCalendar /> {previewData.joiningDate}</span>
                        </div>
                    </div>
                </div>
                
                {isFormEmpty && (
                    <p style={{ margin: '12px 0 0 0', color: '#E46A09', fontSize: '12px', fontStyle: 'italic', backgroundColor: '#FFF8F3', padding: '8px 12px', borderRadius: '8px' }}>
                    Start filling the form. The onboarding pass will update automatically.
                    </p>
                )}
            </div>

            <div 
                className="canvas-scroll"
                style={{ 
                    flex: 1, 
                    backgroundColor: '#ECE8E3', 
                    padding: '40px', // Extra padding di taaki zoomed version box se na takraye
                    overflow: 'auto', // Scrollbar wapas on kiya agar zoom bada ho
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    minHeight: '450px', // Height thodi aur badha di
                    position: 'relative',
                    backgroundImage: 'radial-gradient(#D6D0C4 1px, transparent 1px)',
                    backgroundSize: '20px 20px' 
                }}
            >
                <div className="preview-pass-wrapper" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', filter: 'drop-shadow(0 25px 80px rgba(0,0,0,0.15))' }}>
                    <OnboardingPass candidate={previewData} />
                </div>
            </div>

            <div style={{ padding: '12px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500' }}>Preview Scale: {Math.round(zoom * 100)}%</span>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleZoomOut} className="zoom-btn" title="Zoom Out"><FiZoomOut size={14} /> </button>
                    <button onClick={handleResetZoom} className="zoom-btn" title="Reset Zoom"><FiMaximize size={12} /> Fit</button>
                    <button onClick={handleZoomIn} className="zoom-btn" title="Zoom In"><FiZoomIn size={14} /> </button>
                </div>
            </div>
        </div>
    );
}