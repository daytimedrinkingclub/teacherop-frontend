import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const StaticPage = ({ title, contentFile }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/content/${contentFile}`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [contentFile]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaticPage;