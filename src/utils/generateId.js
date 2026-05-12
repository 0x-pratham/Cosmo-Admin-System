export const generateOfferLetterId = ({
  domainKey = "GEN",
  serialNumber = 1,
}) => {
  // CURRENT YEAR
  const year = new Date().getFullYear()

  // DOMAIN PREFIX MAP
  const domainPrefixes = {
    fullstack: "FSD",
    ai_ml: "AIML",
    cybersecurity: "CYB",
    mobileapp: "MAD",
    iot: "IOT",
    datascience: "DSA",
  }

  // GET PREFIX
  const prefix = domainPrefixes[domainKey] || "GEN"

  // SERIAL FORMAT
  const formattedSerial = String(serialNumber).padStart(4, "0")

  // FINAL OFFER ID
  return `CPL/${prefix}/${year}/${formattedSerial}`
}