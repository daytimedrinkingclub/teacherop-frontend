import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);

  const togglePolicies = () => {
    setIsPoliciesOpen(!isPoliciesOpen);
  };

  return (
    <footer className="footer bg-background py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="space-x-4 mb-4">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="text-accent underline text-sm sm:text-base"
                onClick={togglePolicies}
              >
               Support & Policies
              </button>
              {isPoliciesOpen && (
                <div className="origin-bottom-right absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Contact Us</Link>
                    <Link to="/terms-of-service" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Terms of Service</Link>
                    <Link to="/privacy-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Privacy Policy</Link>
                    <Link to="/refund-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Refund Policy</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-text-color text-sm sm:text-base">
            © 2024 TeacherOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;