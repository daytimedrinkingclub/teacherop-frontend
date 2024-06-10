import React from 'react';

const CourseTile = ({ course, onStartAssessment, onContinueCourse, onArchiveCourse, onDeleteCourse }) => {
  return (
    <div className="bg-white-color shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-600">{course.title}</h3>
      <div className="mb-4">
        <div className="text-gray-600">Progress: {course.progress}%</div>
        <div className="text-gray-600">
          Current Proficiency Score: {course.profficiencyScore !== null ? `${course.profficiencyScore}%` : 'N/A'}
        </div>
        <div className="text-gray-600">Remaining Duration: {course.remainingDuration}</div>
      </div>
      {course.status === 'pending' && (
        <button
          className="bg-accent-color text-white-color px-4 py-2 rounded"
          onClick={() => onStartAssessment(course.id)}
        >
          Start Assessment
        </button>
      )}
      {course.status === 'in-progress' && (
        <button
          className="bg-secondary-color text-white-color px-4 py-2 rounded"
          onClick={() => onContinueCourse(course.id)}
        >
          Continue
        </button>
      )}
      {course.status === 'completed' && (
        <div>
          <button
            className="bg-gray-500 text-white-color px-4 py-2 rounded mr-2"
            onClick={() => onArchiveCourse(course.id)}
          >
            Archive
          </button>
          <button
            className="bg-red-500 text-white-color px-4 py-2 rounded"
            onClick={() => onDeleteCourse(course.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseTile;
