import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginInput({
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  autoComplete,
  placeholder,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"

  return (
    <div className="space-y-3">
      {/* Label */}
      <label
        className="block text-sm font-medium text-white/80"
        style={{
          fontFamily: "Google Sans Flex",
        }}
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <div
        className="
          relative
          flex
          items-center
          rounded-2xl
          border
          border-white/15
          bg-white/10
          backdrop-blur-xl
          transition-all
          duration-300
          focus-within:border-orange-400
          focus-within:ring-4
          focus-within:ring-orange-500/20
        "
      >
        {/* Left Icon */}
        {Icon && (
          <Icon
            className="
              ml-4
              h-5
              w-5
              text-white/60
              flex-shrink-0
            "
          />
        )}

        {/* Input */}
        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className="
            w-full
            bg-transparent
            px-4
            py-4
            text-white
            placeholder:text-white/40
            outline-none
          "
          style={{
            fontFamily: "Google Sans Flex",
          }}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              mr-4
              text-white/60
              hover:text-orange-300
              transition-colors
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}