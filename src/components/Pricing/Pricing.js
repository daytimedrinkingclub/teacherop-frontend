import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: 'The first plan',
      price: '₹450 / Month',
      features: ['All functionalities', 'Unlimited Assessments', 'Includes everything from all plans'],
    },
    {
      id: 2,
      name: 'The best plan',
      price: '₹450 / Month',
      features: ['All functionalities', 'Unlimited Assessments', 'Includes everything from all plans'],
      bestSelling: true,
    },
    {
      id: 3,
      name: 'Same as other plans',
      price: '₹450 / Month',
      features: ['All functionalities', 'Unlimited Assessments', 'Includes everything from all plans'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-background-color text-text-color py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary-color sm:text-4xl">
              Be sincere, Don't be serious
            </h2>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {plans.map((plan) => (
              <div key={plan.id} className={`bg-white-color rounded-lg shadow-lg divide-y divide-gray-200 ${plan.bestSelling ? 'ring-2 ring-accent-color relative' : ''}`}>
                {plan.bestSelling && (
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-color text-white-color">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-extrabold text-primary-color">{plan.name}</h3>
                  <p className="mt-4 text-4xl font-extrabold text-accent-color">{plan.price}</p>
                  <button className="mt-8 w-full bg-accent-color border border-transparent rounded-md py-3 px-6 text-base font-medium text-white-color hover:bg-accent-color-dark">
                    Start Learning
                  </button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-secondary-color">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;