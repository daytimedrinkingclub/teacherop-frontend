import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCourse, answerQuestion } from '../../../api';

const OnboardingForm = ({ onClose }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleCreateCourse = async () => {
    const onQuestionReceived = (question) => {
      setCurrentQuestion(question);
    };

    const onSummaryReceived = (summary) => {
      navigate('/plan-summary', { state: { summary } });
      onClose();
    };

    await createCourse(query, onQuestionReceived, onSummaryReceived);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    await answerQuestion(answer);
    setAnswer('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      {currentQuestion ? (
        <form onSubmit={handleAnswerSubmit}>
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">{currentQuestion.question_text}</p>
            {currentQuestion.answer_type === 'text' && (
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            )}
            {currentQuestion.answer_type === 'subjective' && (
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            )}
            {currentQuestion.answer_type === 'radio' && (
              <div>
                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`radio-${index}`}
                      name="radio-group"
                      value={option}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <label htmlFor={`radio-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {currentQuestion.answer_type === 'checkbox' && (
              <div>
                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      value={option}
                      onChange={(e) => {
                        const newAnswer = [...answer];
                        if (e.target.checked) {
                          newAnswer.push(option);
                        } else {
                          const optionIndex = newAnswer.indexOf(option);
                          if (optionIndex > -1) {
                            newAnswer.splice(optionIndex, 1);
                          }
                        }
                        setAnswer(newAnswer);
                      }}
                    />
                    <label htmlFor={`checkbox-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {currentQuestion.answer_type === 'scale' && (
              <input
                type="range"
                min="1"
                max="10"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full"
              />
            )}
            {currentQuestion.answer_type === 'datepicker' && (
              <input
                type="date"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="text-lg font-semibold mb-4">
            Hi! I'm here to help you create a personalized learning plan.
          </p>
          <button
            onClick={handleCreateCourse}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default OnboardingForm;