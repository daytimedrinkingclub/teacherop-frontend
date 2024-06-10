import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      onSubmit({ title, description, duration, level });
      setTitle('');
      setDescription('');
      setDuration('');
      setLevel('');
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-transparent text-your-app-text-color">
      <div>
        <label htmlFor="title" className="block font-medium">
          What do you want to learn?
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-your-app-border-color rounded text-your-app-text-color"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block font-medium">
          Why do you want to learn this?
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-your-app-border-color rounded text-your-app-text-color"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="duration" className="block font-medium">
          How many hours can you spend on this course per week? (0-30 hours)
        </label>
        <input
          type="range"
          id="duration"
          min="0"
          max="30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full"
          required
        />
        <span>{duration} hours</span>
      </div>
      <div>
        <label htmlFor="level" className="block font-medium">
          On a scale of 0 to 10, how would you rate your current knowledge?
        </label>
        <input
          type="range"
          id="level"
          min="0"
          max="10"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full"
          required
        />
        <span>{level}</span>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-accent-color text-white-color px-6 py-2 rounded mr-2"
        >
          Add Course
        </button>
        <button
        type="button"
        onClick={onCancel}
        className="bg-secondary-color text-text-color px-6 py-2 rounded"
      >
        Cancel
      </button>
      </div>
    </form>
  );
}

export default CourseForm;