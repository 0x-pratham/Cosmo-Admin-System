import { useState } from "react"

import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    authenticated,
    authDisabled,
    credentialsConfigured,
    login,
  } = useAuth()

  const from = location.state?.from?.pathname ?? "/"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  if (authDisabled || authenticated) {
    return (
      <Navigate
        to={from}
        replace
      />
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!credentialsConfigured) {
      setError(
        "Admin sign-in is not configured. Set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in the deployment environment."
      )
      return
    }

    const ok = login(username, password)
    if (!ok) {
      setError("Invalid username or password.")
      return
    }

    navigate(from, { replace: true })
  }

  const notConfigured =
    !credentialsConfigured ||
    location.state?.reason === "not_configured"

  return (
    <div className="min-h-screen bg-[#e8ecf2] flex flex-col">
      <div className="bg-[#0f172a] text-white px-8 py-5 shadow-lg border-b border-slate-800/80">
        <div className="max-w-md mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-semibold">
            Internal tooling
          </p>

          <h1 className="text-2xl font-bold tracking-tight mt-1">
            Admin sign in
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Offer letter generation is restricted to administrators.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/90 p-8">
          {notConfigured ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <p className="font-semibold">
                Credentials not configured
              </p>

              <p className="mt-2 text-amber-900/90 leading-relaxed">
                Add{" "}
                <span className="font-mono text-xs">
                  VITE_ADMIN_USERNAME
                </span>{" "}
                and{" "}
                <span className="font-mono text-xs">
                  VITE_ADMIN_PASSWORD
                </span>{" "}
                to your environment before deploying. For local development
                only, you may set{" "}
                <span className="font-mono text-xs">
                  VITE_AUTH_DISABLED=true
                </span>{" "}
                to skip login.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                  required
                />
              </div>

              {error ? (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0f172a] text-white font-semibold py-3 hover:bg-slate-900 transition-colors"
              >
                Sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
