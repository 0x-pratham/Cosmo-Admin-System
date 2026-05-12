import { Navigate, useLocation } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { authenticated, authDisabled, credentialsConfigured } = useAuth()

  if (authDisabled || authenticated) {
    return children
  }

  if (!credentialsConfigured) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, reason: "not_configured" }}
      />
    )
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location }}
    />
  )
}
