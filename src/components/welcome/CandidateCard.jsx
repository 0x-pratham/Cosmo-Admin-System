import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiBriefcase, FiCalendar, FiHash } from 'react-icons/fi';

const CandidateCard = ({ candidate }) => {
  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#444',
    fontSize: '15px',
    padding: '12px 0',
    borderBottom: '1px solid #eee'
  };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '24px', 
      padding: '40px', 
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', backgroundColor: '#D35C18' }}></div>

      {candidate.candidate_photo_url ? (
        <img 
          src={candidate.candidate_photo_url} 
          alt={candidate.candidate_name} 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        />
      ) : (
        <FaUserCircle size={120} color="#ccc" />
      )}

      <h2 style={{ margin: '20px 0 5px 0', fontSize: '28px', color: '#111', fontFamily: 'Times New Roman, serif' }}>
        {candidate.candidate_name}
      </h2>
      <p style={{ margin: '0 0 30px 0', color: '#D35C18', fontWeight: '600', fontSize: '16px' }}>
        {candidate.role}
      </p>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={itemStyle}>
          <FiBriefcase size={18} color="#999" />
          <span><strong>Department:</strong> {candidate.department}</span>
        </div>
        <div style={itemStyle}>
          <FiHash size={18} color="#999" />
          <span><strong>Employee ID:</strong> {candidate.employee_id}</span>
        </div>
        <div style={{ ...itemStyle, borderBottom: 'none' }}>
          <FiCalendar size={18} color="#999" />
          <span><strong>Joining Date:</strong> {candidate.joining_date}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;