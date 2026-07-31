import { Loader2, ArrowRight } from "lucide-react"

export default function LoginButton({
  loading = false,
  disabled = false,
  children = "Sign In Securely",
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="
        group
        relative
        flex
        w-full
        items-center
        justify-center
        gap-2
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-[#FF8A00]
        via-[#FF7A00]
        to-[#FF6A00]
        px-6
        py-4
        text-white
        font-semibold
        shadow-lg
        shadow-orange-500/30
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:scale-[1.02]
        hover:shadow-2xl
        hover:shadow-orange-500/40
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
      style={{
        fontFamily: "Google Sans Flex",
      }}
    >
      {/* Animated Shine Effect */}
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      {loading ? (
        <>
          <Loader2
            size={20}
            className="animate-spin"
          />

          <span>Authenticating...</span>
        </>
      ) : (
        <>
          <span>{children}</span>

          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </>
      )}
    </button>
  )
}