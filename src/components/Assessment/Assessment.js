import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CourseForm from '../Dashboard/Forms/CourseForm';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Assessment = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        // Make a request to your backend server to generate quiz questions
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (response.ok) {
          const data = await response.json();
          setQuizQuestions(data.questions);
        } else {
          console.error('Failed to generate quiz questions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuizQuestions();
  }, [query]);

  const handleCourseSubmit = async (courseData) => {
    try {
      // Make a request to your backend server to create the course
      const response = await fetch('/api/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...courseData, query, userAnswers }),
      });

      if (response.ok) {
        // Course created successfully, navigate to the dashboard or course page
        navigate('/dashboard');
      } else {
        console.error('Failed to create course');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    // Validate user answers and update userAnswers state
    // You can compare userAnswers with the correct answers from quizQuestions
    // If answers are correct, proceed to create the course
    handleCourseSubmit({ title: query });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl">
          <h2>Assessment</h2>
          <CourseForm onSubmit={handleCourseSubmit} onCancel={() => navigate('/')} />
          {quizQuestions.length > 0 && (
            <form onSubmit={handleQuizSubmit}>
              {quizQuestions.map((question, index) => (
                <div key={index}>
                  <p>{question.text}</p>
                  {question.type === 'mcq' && (
                    <div>
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={userAnswers[index] === option}
                            onChange={() => {
                              const newUserAnswers = [...userAnswers];
                              newUserAnswers[index] = option;
                              setUserAnswers(newUserAnswers);
                            }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Assessment;
