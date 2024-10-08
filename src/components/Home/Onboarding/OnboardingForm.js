import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { answerQuestion } from '../../../api';
import io from 'socket.io-client';

const OnboardingForm = ({ query, onClose }) => {
  const [socket, setSocket] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(); // Connect to the server using Socket.IO
    setSocket(newSocket);

    newSocket.on('questionReceived', (question) => {
      setCurrentQuestion(question);
    });

    newSocket.on('summaryReceived', (summary) => {
      navigate('/plan-summary', { state: { summary } });
      onClose();
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      newSocket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer: answer }];
    setAnswers(newAnswers);
    socket.emit('answerQuestion', { answer }); // Emit the answer to the server
    setAnswer('');
    setCurrentQuestion(null);
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
          <p className="text-lg font-semibold mb-4">Please wait, processing your answers...</p>
        </div>
      )}
    </div>
  );
};

export default OnboardingForm;