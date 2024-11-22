// Main.js

import { validateCourse, validateAssignments, validatePoints } from './Validation.js';
import { calculateScore, calculateLateScore } from './Calculations.js';
import { isLate } from './Helpers.js';
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from './Data.js';

// Main function to get learner data
function getLearnerData(course, ag, submissions) {
  try {
    validateCourse(course, ag);
    validateAssignments(ag, submissions);
    validatePoints(ag);

    const result = [];
    for (const submission of submissions) {
      let assignment = null;

      // Find the assignment
      for (const a of ag.assignments) {
        if (a.id === submission.assignment_id) {
          assignment = a;
          break;
        }
      }

      if (!assignment) {
        throw new Error(`Assignment id ${submission.assignment_id} not found in assignment group.`);
      }

      let avg;
      if (isLate(submission.submission.submitted_at, assignment.due_at)) {
        avg = calculateLateScore(submission.submission, assignment);
        console.log(`Late Submission: ${submission.learner_id}, Assignment ID: ${assignment.id}, Avg: ${avg}`);
      } else {
        avg = calculateScore(submission.submission, assignment);
        console.log(`On-Time Submission: ${submission.learner_id}, Assignment ID: ${assignment.id}, Avg: ${avg}`);
      }

      result.push(
          {
            learner_id: submission.learner_id,
            assignment_id: assignment.id,
            avg: avg,
            score: submission.submission.score
          }
      );
    }

    return result;
  } catch (e) {
    switch (e.constructor) {
      case Error:
        throw new Error('ALERT! ' + e.message);
      case RangeError:
        throw new RangeError('Division by zero. ' + e.message);
      case TypeError:
        throw new TypeError('Invalid type. ' + e.message);
      default:
        throw e;
    }
  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

export default getLearnerData;
