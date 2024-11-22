// Calculations.js

export function calculateScore(submission, assignment) {
  const score = submission.score / assignment.points_possible;
  return (score * 100).toFixed(2);
}

export function calculateLateScore(submission, assignment) {
  const score = submission.score / assignment.points_possible;
  const ten_pct_reduction = score * 0.10;
  const late_score = (score - ten_pct_reduction) * 100;
  return late_score.toFixed(2);
}
