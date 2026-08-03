import React, { useState, useEffect } from 'react';
import CandidateForm from '../components/onboarding/CandidateForm';
import PreviewPanel from '../components/onboarding/PreviewPanel';
import ActionButtons from '../components/onboarding/ActionButtons';
import './onboardingDashboard.css'; 

import { getNextOnboardingId } from "@/utils/getNextOnboardingId";
import { uploadCandidatePhoto } from "@/utils/uploadCandidatePhoto";
import { generateOnboardingImage } from "@/utils/generateOnboardingImage";
import { uploadOnboardingPass } from "@/utils/uploadOnboardingPass";
import { saveOnboardingToSupabase } from "@/utils/saveOnboardingToSupabase";
import { validateCandidate } from "@/utils/validation";
import { supabase } from "@/lib/supabase"; 
import { v4 as uuid } from "uuid";

import { FiCheckCircle, FiEdit3, FiZap } from 'react-icons/fi';

const initialCandidate = {
  fullName: "",
  email: "",
  phone: "",
  employeeId: "",
  role: "",
  department: "",
  joiningDate: "",
  reportingManager: "",
  hrContact: "",
  welcomeKit: "",
  photo: null,
  photoPreview: "",
  candidatePhotoUrl: "",
  verificationToken: "", 
  passImageUrl: "",     
};

const OnboardingDashboard = () => {
  const [candidate, setCandidate] = useState(initialCandidate);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onboardingId, setOnboardingId] = useState("");

  useEffect(() => {
    const loadOnboardingId = async () => {
      try {
        const id = await getNextOnboardingId();
        setOnboardingId(id);
      } catch (err) {
        console.error(err);
      }
    };
    loadOnboardingId();
  }, []);

  const handleReset = () => {
    if (!window.confirm("Reset onboarding form?")) return;
    setCandidate(initialCandidate);
    setGenerated(false);
  };

  // ONE-CLICK MASTER FUNCTION: Generate -> Upload -> Save -> Email
  const handleGenerateAndSend = async () => {
    try {
        setLoading(true);

        // 1. Validation
        const validation = validateCandidate(candidate);
        if (!validation.valid) {
            alert(validation.errors.join("\n"));
            return;
        }

        // 2. Upload Candidate Photo
        let candidatePhotoUrl = null;
        if (candidate.photo) {
            candidatePhotoUrl = await uploadCandidatePhoto({
                file: candidate.photo,
                employeeId: candidate.employeeId,
            });
        }

        // 3. Generate & Upload PNG
        const imageDataUrl = await generateOnboardingImage("onboarding-pass-capture");
        const passImageUrl = await uploadOnboardingPass({
            imageDataUrl,
            onboardingId,
        });

        // 4. Verification Token & Save to DB
        const verificationToken = uuid();
        await saveOnboardingToSupabase({
            onboardingId,
            employeeId: candidate.employeeId,
            candidateName: candidate.fullName,
            candidateEmail: candidate.email,
            candidatePhone: candidate.phone,
            department: candidate.department,
            role: candidate.role,
            joiningDate: candidate.joiningDate,
            reportingManager: candidate.reportingManager,
            hrContact: candidate.hrContact,
            welcomeKit: candidate.welcomeKit,
            candidatePhotoUrl,
            passImageUrl,
            verificationToken,
        });

        // 5. Instantly Send Email
        const apiResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "onboarding",
            candidateName: candidate.fullName,
            candidateEmail: candidate.email,
            onboardingId,
            role: candidate.role,
            department: candidate.department,
            joiningDate: candidate.joiningDate,
            verificationToken: verificationToken, // Direct access to generated token
            verificationLink: `${window.location.origin}/welcome/${verificationToken}`,
          }),
        });

        const result = await apiResponse.json();
        if (!apiResponse.ok || !result.success) {
            throw new Error(result.message || "Failed to send email via API.");
        }

        // 6. Update Email Sent Status in DB
        const { error: updateError } = await supabase
            .from('onboarding_passes')
            .update({ email_sent: true })
            .eq('verification_token', verificationToken);

        if (updateError) throw updateError;

        // 7. Success State
        setGenerated(true);
        setCandidate((prev) => ({
            ...prev,
            candidatePhotoUrl,
            passImageUrl,
            verificationToken,
        }));

        alert(`Success! Onboarding Pass Generated and Welcome Email sent to ${candidate.email}`);
        
    } catch (error) {
        console.error("Process Error:", error);
        alert(error.message || "Something went wrong during the process.");
    } finally {
        setLoading(false);
    }
  };

  const getStatus = () => {
    if (generated) return { label: "Completed & Sent", class: "status-ready", icon: <FiCheckCircle /> };
    if (candidate.fullName || candidate.employeeId) return { label: "Drafting", class: "status-draft", icon: <FiEdit3 /> };
    return { label: "Awaiting Input", class: "status-idle", icon: <FiZap /> };
  };
  const currentStatus = getStatus();

  return (
    <div className="onboarding-dashboard">
      <div className="dashboard-layout">
        
        <header className="dashboard-header">
          <div className="header-titles">
            <h1>Onboarding Dashboard</h1>
            <p>Generate professional onboarding passes and welcome portals for newly joined candidates.</p>
          </div>
          
          <div className="header-meta">
             <div className={`status-chip ${currentStatus.class}`}>
                {currentStatus.icon} {currentStatus.label}
             </div>
          </div>
        </header>

        <main className="dashboard-grid">
          
          <div className="grid-left">
             <div className="reference-card">
               <span className="ref-label">Reference ID</span>
               <h2 className="ref-value">{onboardingId || "Loading..."}</h2>
               <span className="ref-sub">Generated Automatically</span>
             </div>

             <CandidateForm candidate={candidate} setCandidate={setCandidate} />
          </div>

          <div className="grid-right">
             <PreviewPanel candidate={candidate} />
          </div>

        </main>

        <div className="sticky-action-bar">
           <ActionButtons 
              loading={loading}
              onGenerate={handleGenerateAndSend} 
              onReset={handleReset}
           />
        </div>

      </div>
    </div>
  );
};

export default OnboardingDashboard;