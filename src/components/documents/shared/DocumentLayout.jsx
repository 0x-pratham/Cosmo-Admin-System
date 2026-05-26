export default function DocumentLayout({
  children,
  className = "",
}) {
  return (
    <div className="bg-[#e8ecf2] min-h-screen flex justify-center py-10 px-4 print:bg-white print:py-0">
      <div
        className={`
          relative
          bg-white
          w-[794px]
          min-h-[1123px]
          overflow-hidden
          shadow-2xl
          offer-letter-page
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  )
}