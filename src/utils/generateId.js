export const generateOfferLetterId = ({
  domainKey = "fullstack",
  serialNumber = 1,
}) => {
  const year = new Date().getFullYear()

  const domainPrefixes = {
    fullstack: "FSD",
    ai_ml: "AIML",
    cybersecurity: "CYB",
    mobileapp: "MAD",
    iot: "IOT",
    datascience: "DSA",
  }

  // Ensure we check the key in lowercase to match the dashboard's state keys
  const prefix = domainPrefixes[domainKey?.toLowerCase()] || "GEN"

  const formattedSerial = String(serialNumber).padStart(4, "0")

  // ID Format: CPL/PREFIX/YEAR/0001
  return `CPL/${prefix}/${year}/${formattedSerial}`
}