import React, { useState } from 'react';

const UserData = () => {
  // Placeholder user data
  const [user, setUser] = useState({
    name: 'Neel Seth',
    email: 'neelseth@gmail.com',
    linkedin: 'https://www.linkedin.com/in/neelseth',
    twitter: 'https://twitter.com/neelseth',
    age: 28,
    gender: 'Male',
    currentJob: 'Product Manager',
    qualifications: 'Computer Science Engineer',
    preferredLearningMode: 'Nothing as such',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white-color p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-primary-color">About You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-bold text-primary-color mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <p className="font-bold text-primary-color mb-1">Email:</p>
          <p className="text-primary-color">{user.email}</p>
        </div>
        <div>
          <label htmlFor="age" className="block font-bold text-primary-color mb-1">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block font-bold text-primary-color mb-1">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="currentJob" className="block font-bold text-primary-color mb-1">
            Current Work Profile (Job):
          </label>
          <input
            type="text"
            id="currentJob"
            name="currentJob"
            value={user.currentJob}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="qualifications" className="block font-bold text-primary-color mb-1">
            Qualifications:
          </label>
          <input
            type="text"
            id="qualifications"
            name="qualifications"
            value={user.qualifications}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="preferredLearningMode" className="block font-bold text-primary-color mb-1">
            Anything you would like to tell us about yourself:
          </label>
          <textarea
            id="preferredLearningMode"
            name="preferredLearningMode"
            value={user.preferredLearningMode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={4}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default UserData;