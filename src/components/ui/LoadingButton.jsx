export default function LoadingButton({
  loading = false,
  onClick,
  children,
  fullWidth = true,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        ${fullWidth ? "w-full" : "w-auto px-6"}
        py-4
        rounded-3xl
        font-semibold
        transition-all
        duration-300
        flex
        items-center
        justify-center

        ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-gradient-to-r from-slate-950 to-slate-800 text-white hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99]"
        }
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          {/* SPINNER */}
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

          <span>
            Generating PDF...
          </span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}