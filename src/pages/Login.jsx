import { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

import LoginCard from "@/components/auth/LoginCard"

import loginBg from "@/assets/images/login-bg.png"

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
        "Admin sign-in is not configured. Configure administrator credentials before continuing."
      )
      return
    }

    const ok = login(username, password)

    if (!ok) {
      setError("Invalid administrator credentials.")
      return
    }

    navigate(from, { replace: true })
  }

  const notConfigured =
    !credentialsConfigured ||
    location.state?.reason === "not_configured"

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      {/* Orange Gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-transparent to-black/50" />

      {/* Main Layout */}

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}

            <div className="hidden lg:block">

              <span
                className="uppercase tracking-[0.35em] text-orange-300 text-sm"
                style={{
                  fontFamily: "Google Sans Flex",
                }}
              >
                Enterprise Platform
              </span>

              <h1
                className="mt-6 text-6xl text-white font-bold leading-tight"
                style={{
                  fontFamily: "Times New Roman",
                }}
              >
                Intelligent
                <br />
                Administration
                <br />
                System
              </h1>

              <p
                className="mt-8 max-w-xl text-lg leading-8 text-white/75"
                style={{
                  fontFamily: "Google Sans Flex",
                }}
              >
                Securely manage administrative operations,
                employee resources, offer letter generation,
                workflow automation and organizational
                activities through a unified enterprise
                platform.
              </p>

            </div>

            {/* RIGHT SIDE */}

            <div className="flex justify-center lg:justify-end">

              <LoginCard
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                error={error}
                notConfigured={notConfigured}
              />

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}