import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import WelcomeHero from '../components/welcome/WelcomeHero';
import CandidateCard from '../components/welcome/CandidateCard';
import QuickActions from '../components/welcome/QuickActions';
import WelcomeFooter from '../components/welcome/WelcomeFooter';

const Welcome = () => {
  const { verificationToken } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        console.log("Fetching token:", verificationToken);

        const { data, error } = await supabase
          .from('onboarding_passes')
          .select('*')
          .eq('verification_token', verificationToken)
          .single();

        if (error) {
          console.error("Supabase Error Details:", error);
          throw new Error(error.message || 'Database query failed');
        }

        if (!data) {
          throw new Error('Candidate not found');
        }

        setCandidate(data);
      } catch (err) {
        console.error("Fetch Exception:", err.message);
        setError('Invalid or Expired Link. Please contact the HR Team.');
      } finally {
        setLoading(false);
      }
    };

    if (verificationToken) {
      fetchCandidate();
    } else {
      setError('No verification token provided.');
      setLoading(false);
    }
  }, [verificationToken]);

  // Loading State
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #D35C18', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '20px', fontFamily: 'Google Sans Flex, sans-serif', color: '#555', fontWeight: '500' }}>Loading your onboarding experience...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '400px' }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '15px', fontFamily: 'Times New Roman, serif' }}>Oops!</h2>
          <p style={{ color: '#555', fontFamily: 'Google Sans Flex, sans-serif' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F7F6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Google Sans Flex, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <WelcomeHero />
        <CandidateCard candidate={candidate} />
        <QuickActions candidate={candidate} />
        <WelcomeFooter />
      </div>
    </div>
  );
};

export default Welcome;