import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthProvider } from "@/context/AuthContext"
import AdminHub from "@/pages/AdminHub" // Naya Central Hub Import kiya
import Dashboard from "@/pages/Dashboard" // Ye aapka Offer Letter Dashboard hai
import Login from "@/pages/Login"
import VerifyDocument from "@/pages/VerifyDocument"
import CertificateDashboard from "@/pages/CertificateDashboard"
import OnboardingDashboard from "@/pages/OnboardingDashboard"
import Welcome from "@/pages/Welcome" 

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        {/* 1. Naya Central Hub Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminHub />
            </ProtectedRoute>
          }
        />

        {/* 2. Offer Letter Dashboard Route */}
        <Route
          path="/offer-letters"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 3. Onboarding Pass Route */}
        <Route
          path="/onboarding-pass"
          element={
            <ProtectedRoute>
              <OnboardingDashboard />
            </ProtectedRoute>
          }
        />

        {/* 4. Certificates Route */}
        <Route 
          path="/certificates" 
          element={
            <ProtectedRoute>
              <CertificateDashboard />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/verify/*"
          element={<VerifyDocument />}
        />

        <Route 
          path="/welcome/:verificationToken" 
          element={<Welcome />} 
        />
      </Routes>
    </AuthProvider>
  )
}