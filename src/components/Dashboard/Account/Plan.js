import React from 'react';

const Plan = () => {
  const plan = {
    name: 'That Plan!',
    price: 12,
    features: ['All functionalities', 'Unlimited Assessments'],
  };

  return (
    <div className="bg-white-color p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-primary-color">Current Plan</h2>
      <div>
        <p className="text-lg font-bold text-primary-color">{plan.name}</p>
        <p className="text-secondary-color">${plan.price}/month</p>
        <ul className="mt-4 space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-primary-color">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Plan;