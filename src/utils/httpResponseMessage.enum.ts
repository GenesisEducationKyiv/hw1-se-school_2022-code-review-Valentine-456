const HttpResponseMessage = {
  INVALID_STATUS_VALUE: "Invalid status value",
  EMAIL_VALIDATION_FAILED: "Email validation was not passed",
  EMAIL_ADDED: "This email is added",
  EMAIL_EXISTS: "This email is already registered!",
  EMAILS_SENT: "Mailing is sent out!",
  NO_EMAIL: "Email is required",
  BAD_REQUEST: "Bad request",
} as const;

export { HttpResponseMessage };
