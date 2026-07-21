export const generateOfferLetterId = ({
  domainKey = "fullstack",
  serialNumber = 1,
}) => {
  const year = new Date().getFullYear()

  const domainPrefixes = {
    // Existing Legacy Domains
    fullstack: "FSD",
    ai_ml: "AIML",
    cybersecurity: "CYB",
    mobileapp: "MAD",
    iot: "IOT",
    datascience: "DSA",

    // New Domains
    software_development: "SDE",
    uiux_design: "UIX",
    quality_assurance: "QAE",
    digital_marketing: "DGM",
    content_marketing: "CNT",
    business_development: "BDE",
    hr_operations: "HRO",
    client_relations: "CSR",
    finance_accounts: "FIN",
    project_coordination: "PMO",
    game_marketing: "GMK",
  }

  // Ensure we check the key in lowercase to match the dashboard's state keys
  const prefix = domainPrefixes[domainKey?.toLowerCase()] || "GEN"

  const formattedSerial = String(serialNumber).padStart(4, "0")

  // ID Format: CPL/PREFIX/YEAR/0001
  return `CPL/${prefix}/${year}/${formattedSerial}`
}