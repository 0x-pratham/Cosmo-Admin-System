import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

const AUTH_STORAGE_KEY = "cosmolix_offer_letter_admin_session"

function readExpectedCredentials() {
  const username = String(import.meta.env.VITE_ADMIN_USERNAME ?? "").trim()
  const password = String(import.meta.env.VITE_ADMIN_PASSWORD ?? "")
  return { username, password }
}

function isAuthDisabled() {
  return import.meta.env.VITE_AUTH_DISABLED === "true"
}

function readStoredSession() {
  if (typeof sessionStorage === "undefined") return false
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "1"
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const authDisabled = isAuthDisabled()
  const [authenticated, setAuthenticated] = useState(
    () => authDisabled || readStoredSession()
  )

  const credentialsConfigured = useMemo(() => {
    const { username, password } = readExpectedCredentials()
    return username.length > 0 && password.length > 0
  }, [])

  const login = useCallback(
    (username, password) => {
      if (authDisabled) {
        setAuthenticated(true)
        return true
      }

      if (!credentialsConfigured) return false

      const expected = readExpectedCredentials()
      const ok =
        username === expected.username && password === expected.password

      if (ok) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "1")
        setAuthenticated(true)
      }

      return ok
    },
    [authDisabled, credentialsConfigured]
  )

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({
      authDisabled,
      credentialsConfigured,
      authenticated: authDisabled || authenticated,
      login,
      logout,
    }),
    [
      authDisabled,
      authenticated,
      credentialsConfigured,
      login,
      logout,
    ]
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- hook used with AuthProvider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
