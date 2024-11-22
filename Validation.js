// Validation.js

export function validateCourse(course, ag) {
  if (ag.course_id !== course.id) {
    throw new Error(`Non-matching ids. Assignment group id: ${ag.course_id}, 
                      Course info id: ${course.id}`);
  }
}

export function validateAssignments(ag, submissions) {
  let assignmentFound = false;
  for (const assignment of ag.assignments) {
    if (assignment.id === submissions[0].assignment_id) {
      assignmentFound = true;
      break;
    }
  }
  if (!assignmentFound) {
    throw new Error(`Non-matching ids. Assignment group assignments id: ${ag.assignments.map(a => a.id)}, 
                      Learner's assignment id: ${submissions[0].assignment_id}`);
  }
}

export function validatePoints(ag) {
  for (const assignment of ag.assignments) {
    if (assignment.points_possible <= 0) {
      throw new RangeError(`Value must be a number greater than zero.`);
    }
    if (typeof assignment.points_possible === "string") {
      throw new TypeError(`Value cannot be a string.`);
    }
  }
}
