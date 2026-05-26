export default function DocumentFooter() {
  return (
    <footer
      className="mt-14 flex items-center justify-between border-t pt-6 text-[11px]"
      style={{
        borderColor: "#e2e8f0",
        color: "#64748b"
      }}
    >
      <span>
        © {new Date().getFullYear()} Cosmolix Private Limited
      </span>

      <span className="font-medium">
        Electronically issued document
      </span>
    </footer>
  )
}