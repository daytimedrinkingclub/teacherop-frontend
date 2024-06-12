import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import OnboardingForm from './Onboarding/OnboardingForm';
import { createCourse } from '../../api'; // Import the createCourse function

const placeholders = [
  'What do you want to learn today?',
  'I want to learn how to code...',
  'I want to cook lasagna...',
  'I want to learn to play the piano...',
  'I want to to crack the Amazon SDE 1 interview...',
  'I want to learn to spanish...',
  'I want to get 2400/2400 in my SAT...',
  'I want to get into IIT...',
  'I want to learn training a dog...',
];

const HeroSection = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isFocused) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) return;

    const placeholder = placeholders[placeholderIndex];
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayText(placeholder.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > placeholder.length) {
        clearInterval(typingInterval);
      }
    }, 75);

    return () => clearInterval(typingInterval);
  }, [placeholderIndex, isFocused]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      try {
        const response = await createCourse(query);
        if (response.status === 200) {
          setIsModalOpen(true);
        } else {
          console.error('Failed to create course');
        }
      } catch (error) {
        console.error('Error creating course:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuery('');
  };

  return (
    <header className="bg-background flex-1 flex items-center justify-center overflow-auto py-8 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-primary">
          TeacherOP
        </h1>
        <div className="w-full max-w-lg relative">
          <form onSubmit={handleSubmit} className="w-full max-w-lg relative">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition duration-300 ease-in-out text-lg sm:text-xl pr-12"
                placeholder={displayText}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <button type="submit" className="absolute right-0 top-0 mt-3 sm:mt-4 mr-4">
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Onboarding Modal"
        className="w-full max-w-lg mx-auto bg-white rounded-md shadow-lg p-6 mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <OnboardingForm query={query} onClose={closeModal} />
      </Modal>
    </header>
  );
};

export default HeroSection;
