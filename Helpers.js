// Helpers.js

export function isLate(submissionDate, dueDate) {
  return new Date(submissionDate) > new Date(dueDate);
}
