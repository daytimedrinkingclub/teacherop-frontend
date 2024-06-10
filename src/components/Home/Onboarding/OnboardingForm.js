import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const OnboardingForm = ({ onClose }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      text: 'Why do you want to study?',
      type: 'mcq',
      options: [
        'To improve my skills',
        'To change my career',
        'For personal growth',
        'Other',
      ],
    },
    {
      id: 2,
      text: 'How much do you already know about the subject?',
      type: 'slider',
      min: 0,
      max: 10,
    },
    {
      id: 3,
      text: 'Please provide more details about your learning goals:',
      type: 'text',
    },
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const response = await fetch('/api/submit-answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, answers }),
        });

        if (response.ok) {
          onClose();
        } else {
          console.error('Failed to submit answers');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">{currentQuestion.text}</p>
          {currentQuestion.type === 'mcq' && (
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          {currentQuestion.type === 'slider' && (
            <div className="flex items-center">
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={answers[currentQuestion.id] || currentQuestion.min}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full"
              />
              <span className="ml-2">{answers[currentQuestion.id] || currentQuestion.min}</span>
            </div>
          )}
          {currentQuestion.type === 'text' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;
