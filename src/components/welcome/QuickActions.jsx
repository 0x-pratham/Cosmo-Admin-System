import React from 'react';
import { FiDownload, FiBookOpen, FiMessageCircle } from 'react-icons/fi';

const QuickActions = ({ candidate }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(candidate.pass_image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${candidate.employee_id}-Onboarding-Pass.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download pass.");
    }
  };

  const btnBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 24px',
    borderRadius: '16px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
    fontFamily: 'Google Sans Flex, sans-serif'
  };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '24px', 
      padding: '30px', 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' 
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#111', fontSize: '20px', textAlign: 'center' }}>Quick Actions</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        
        {/* Primary Action */}
        <button 
          onClick={handleDownload}
          style={{ ...btnBaseStyle, backgroundColor: '#D35C18', color: '#fff' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <FiDownload size={20} /> Download Pass
        </button>

        {/* Secondary Actions */}
        <button 
          onClick={() => alert("LMS Portal integration coming soon!")}
          style={{ ...btnBaseStyle, backgroundColor: '#F8FAFC', color: '#333', border: '1px solid #E2E8F0' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
        >
          <FiBookOpen size={20} /> Open LMS
        </button>

        <button 
          onClick={() => window.location.href = `mailto:hr@cosmolix.co.in`}
          style={{ ...btnBaseStyle, backgroundColor: '#F8FAFC', color: '#333', border: '1px solid #E2E8F0' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
        >
          <FiMessageCircle size={20} /> Contact HR
        </button>

      </div>
    </div>
  );
};

export default QuickActions;