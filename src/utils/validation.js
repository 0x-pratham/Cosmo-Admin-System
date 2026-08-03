export function validateCandidate(candidate) {
  const errors = [];

  // Full Name
  if (!candidate.fullName?.trim()) {
    errors.push("Candidate Full Name is required.");
  }

  // Email
  if (!candidate.email?.trim()) {
    errors.push("Candidate Email is required.");
  } else {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(candidate.email)) {
      errors.push("Please enter a valid email address.");
    }
  }

  // Phone
  if (!candidate.phone?.trim()) {
    errors.push("Candidate Phone Number is required.");
  }

  // Employee ID
  if (!candidate.employeeId?.trim()) {
    errors.push("Employee ID is required.");
  }

  // Role
  if (!candidate.role?.trim()) {
    errors.push("Internship Role is required.");
  }

  // Department
  if (!candidate.department?.trim()) {
    errors.push("Department is required.");
  }

  // Joining Date
  if (!candidate.joiningDate) {
    errors.push("Joining Date is required.");
  }

  // Reporting Manager
  if (!candidate.reportingManager?.trim()) {
    errors.push("Reporting Manager is required.");
  }

  // HR Contact
  if (!candidate.hrContact?.trim()) {
    errors.push("HR Contact is required.");
  }

  // Welcome Kit
  if (!candidate.welcomeKit?.trim()) {
    errors.push("Welcome Kit information is required.");
  }

  // Candidate Photo
  if (!candidate.photo) {
    errors.push("Candidate Photograph is required.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}