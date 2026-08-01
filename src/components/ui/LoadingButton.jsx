export default function LoadingButton({
  loading = false,
  onClick,
  children,
  fullWidth = true,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`
        ${fullWidth ? "w-full" : "w-auto px-8"}

        h-14
        rounded-2xl
        flex
        items-center
        justify-center
        font-semibold
        text-[15px]
        transition-all
        duration-300
        active:scale-[0.98]
        disabled:cursor-not-allowed
      `}
      style={
        loading
          ? {
              background: "#CFC7C2",
              color: "#FFFFFF",
            }
          : {
              background: "linear-gradient(135deg,#D3600B 0%,#E9813B 100%)",
              color: "#FFFFFF",
              fontFamily: '"Google Sans Flex", sans-serif',
              boxShadow: "0 10px 24px rgba(211,96,11,.20)",
            }
      }
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.background =
            "linear-gradient(135deg,#8C3B08 0%,#D3600B 100%)";

          e.currentTarget.style.boxShadow =
            "0 14px 28px rgba(211,96,11,.28)";
        }
      }}
      onMouseLeave={(e) => {
        if (!loading) {
          e.currentTarget.style.background =
            "linear-gradient(135deg,#D3600B 0%,#E9813B 100%)";

          e.currentTarget.style.boxShadow =
            "0 10px 24px rgba(211,96,11,.20)";
        }
      }}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full animate-spin"
            style={{
              border: "2px solid rgba(255,255,255,.45)",
              borderTopColor: "#FFFFFF",
            }}
          />

          <span>Generating Offer Letter...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}