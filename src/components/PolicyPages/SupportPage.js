import React, { useState } from 'react';

const SupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Support</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Contact Details</h3>
            <p className="text-sm mb-2">Last updated on May 23rd 2024</p>
            <p className="text-sm mb-2">You may contact us using the information below:</p>
            <p className="text-sm mb-1">Merchant Legal entity name: TeacherOP</p>
            <p className="text-sm mb-1">Whatsapp: 9884002291</p>
            <p className="text-sm">E-Mail ID: admin@teacherop.com</p>
            <p className="text-sm">Address: Bellandur, 560103, Karnataka, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;