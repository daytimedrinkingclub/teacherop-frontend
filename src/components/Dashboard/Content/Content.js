import React, { useState, useEffect } from 'react';
import Progress from "../../ui/Progress";
import { ReactComponent as BookOpenIcon } from './icons/BookOpenIcon.svg';
import { ReactComponent as CheckIcon } from './icons/CheckIcon.svg';
import { ReactComponent as CircleIcon } from './icons/CircleIcon.svg';
import { ReactComponent as FolderIcon } from './icons/FolderIcon.svg';
import { ReactComponent as MailQuestionIcon } from './icons/MailQuestionIcon.svg';
import { ReactComponent as NotebookIcon } from './icons/NotebookIcon.svg';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

export default function Content() {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // Simulate a fetch call
    setTimeout(() => {
      import('../../../data/sampleData.json')
        .then(data => setCourseData(data.default))
        .catch(error => console.error('Failed to load data', error));
    }, 1000);
  }, []);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col md:flex-row bg-background">
        {/* Sidebar with dynamic course progress */}
        <div className="border-r bg-gray-100 dark:bg-gray-800 md:w-[280px]">
          <div className="flex h-full max-h-screen flex-col gap-2 px-4 py-6">
            <div className="flex items-center gap-2 pb-4">
              <BookOpenIcon className="h-5 w-5 shrink-0 text-primary" />
              <h3 className="text-lg font-semibold text-primary">Progress</h3>
            </div>
            {/* Dynamically generated list items */}
            {courseData.sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
                <nav className="flex-1 overflow-auto">
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50">
                          <CheckIcon className="h-4 w-4 shrink-0 text-primary" />
                          {item.name}
                          <Progress value={item.progress} className="ml-auto" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-white">
          <div className="prose prose-gray mx-auto max-w-6xl dark:prose-invert">
            {courseData.content.map((contentSection) => (
              <div key={contentSection.id}>
                                <h1 id={contentSection.id} className="text-3xl font-bold text-primary">{contentSection.title}</h1>
                <p className="text-secondary">{contentSection.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}