import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountLayout from './Account/AccountLayout';
import CourseForm from './Forms/CourseForm';
import Content from './Content/Content';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleAddCourse = (newCourse) => {
    const newCourseObj = {
      id: courses.length + 1,
      ...newCourse,
      progress: 0,
      profficiencyScore: null,
      remainingDuration: 'Pending Assessment',
      status: 'pending',
    };
    setCourses([...courses, newCourseObj]);
    setShowPopup(false);
  };

  const handleStartAssessment = (courseId) => {
    // Logic to start the assessment and generate proficiency score
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          profficiencyScore: Math.floor(Math.random() * 100),
          remainingDuration: '6 weeks',
          status: 'in-progress',
        };
      }
      return course;
    });
    setCourses(updatedCourses);
  };

  const handleArchiveCourse = (courseId) => {
    // Logic to archive the course
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          status: 'archived',
        };
      }
      return course;
    });
    setCourses(updatedCourses);
  };

  const handleDeleteCourse = (courseId) => {
    // Logic to delete the course
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  const handleContinueCourse = (courseId) => {
    navigate(`/dashboard/content/${courseId}`);
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col h-screen bg-background-color text-text-color">
      <main className="flex-1 p-8">
        {courses.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <button
              className="bg-accent-color text-white-color px-6 py-3 rounded-lg text-xl flex items-center"
              onClick={() => setShowPopup(true)}
            >
              <span className="mr-2">+</span> Create Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white-color shadow-md rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary-color">{course.title}</h3>
                <div className="mb-4">
                  <div className="text-gray-600">
                    Progress: {course.progress}%
                  </div>
                  <div className="text-gray-600">
                    Current Proficiency Score: 
                    {course.profficiencyScore !== null ? `${course.profficiencyScore}%` : 'N/A'}
                  </div>
                  <div className="text-gray-600">
                    Remaining Duration: {course.remainingDuration}
                  </div>
                </div>
                {course.status === 'pending' && (
                  <button
                    className="bg-accent-color text-white-color px-4 py-2 rounded"
                    onClick={() => handleStartAssessment(course.id)}
                  >
                    Start Assessment
                  </button>
                )}
                {course.status === 'in-progress' && (
                  <button
                    className="bg-accent-color text-white-color px-4 py-2 rounded"
                    onClick={() => handleContinueCourse(course.id)}
                  >
                    Continue
                  </button>
                )}
                {course.status === 'completed' && (
                  <div>
                    <button
                      className="bg-gray-500 text-white-color px-4 py-2 rounded mr-2"
                      onClick={() => handleArchiveCourse(course.id)}
                    >
                      Archive
                    </button>
                    <button
                      className="bg-red-500 text-white-color px-4 py-2 rounded"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="bg-white-color shadow-md rounded-lg p-6 flex justify-center items-center">
              <button
                className="bg-accent-color text-white-color px-6 py-3 rounded-lg text-xl"
                onClick={() => setShowPopup(true)}
              >
                Create Course
              </button>
            </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <CourseForm onSubmit={handleAddCourse} onCancel={() => setShowPopup(false)} />
            </div>
          </div>
        )}
        <Routes>
          <Route
            path="/content/:courseId"
            element={<Content courses={courses} />}
          />
          <Route path="/account" element={<AccountLayout />} />
        </Routes>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;