import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthProvider } from "@/context/AuthContext"
import Dashboard from "@/pages/Dashboard"
import Login from "@/pages/Login"
import VerifyDocument from "@/pages/VerifyDocument"

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify/*"
          element={<VerifyDocument />}
        />
      </Routes>
    </AuthProvider>
  )
}