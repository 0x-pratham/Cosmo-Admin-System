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
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        flex
        items-center
        justify-center

        ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
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