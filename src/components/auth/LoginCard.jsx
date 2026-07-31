import { User, LockKeyhole, AlertTriangle } from "lucide-react"

import LoginHeader from "./LoginHeader"
import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton"

export default function LoginCard({
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  error,
  notConfigured,
}) {
  return (
    <div
      className="
        w-full
        max-w-lg
        rounded-[32px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-2xl
        shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        p-10
      "
    >
      <LoginHeader />

      {notConfigured ? (
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-amber-400/30
            bg-amber-500/10
            backdrop-blur-md
            p-5
        "
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={22}
              className="text-amber-300 mt-0.5 flex-shrink-0"
            />

            <div>
              <h3
                className="text-white font-semibold"
                style={{
                  fontFamily: "Google Sans Flex",
                }}
              >
                Configuration Required
              </h3>

              <p
                className="mt-2 text-sm leading-7 text-white/75"
                style={{
                  fontFamily: "Google Sans Flex",
                }}
              >
                Administrator credentials have not been configured
                for this environment.
              </p>

              <div
                className="
                  mt-4
                  rounded-xl
                  bg-black/20
                  border
                  border-white/10
                  p-4
                  text-xs
                  text-orange-200
                  font-mono
                  space-y-2
                "
              >
                <div>VITE_ADMIN_USERNAME</div>

                <div>VITE_ADMIN_PASSWORD</div>

                <div>VITE_AUTH_DISABLED=true (Development Only)</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <LoginInput
            label="Administrator ID"
            type="text"
            icon={User}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="Enter your administrator ID"
            required
          />

          <LoginInput
            label="Password"
            type="password"
            icon={LockKeyhole}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />

          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-400/30
                bg-red-500/10
                backdrop-blur-md
                px-5
                py-4
              "
            >
              <p
                className="text-sm text-red-200"
                style={{
                  fontFamily: "Google Sans Flex",
                }}
              >
                {error}
              </p>
            </div>
          )}

          <LoginButton>
            Sign In Securely
          </LoginButton>
        </form>
      )}

      <div className="mt-10 border-t border-white/10 pt-6">
        <p
          className="text-center text-xs text-white/50 leading-6"
          style={{
            fontFamily: "Google Sans Flex",
          }}
        >
          © 2026 Cosmolix Private Limited
          <br />
          Confidential • Authorized Personnel Only
        </p>
      </div>
    </div>
  )
}