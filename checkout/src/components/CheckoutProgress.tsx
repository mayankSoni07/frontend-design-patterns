import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const CheckoutProgress: React.FC = () => {
  const { step } = useSelector((state: RootState) => state.checkout);

  const steps = [
    { id: 'address', label: 'Shipping Address', completed: false },
    { id: 'payment', label: 'Payment Method', completed: false },
    { id: 'summary', label: 'Order Summary', completed: false },
  ];

  // Update step completion status
  const currentStepIndex = steps.findIndex(s => s.id === step);
  steps.forEach((s, index) => {
    s.completed = index < currentStepIndex;
  });

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <nav className="flex items-center justify-center">
        <ol className="flex items-center space-x-8">
          {steps.map((stepItem, index) => (
            <li key={stepItem.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    stepItem.completed
                      ? 'border-green-500 bg-green-500'
                      : stepItem.id === step
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {stepItem.completed ? (
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        stepItem.id === step ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${
                    stepItem.id === step
                      ? 'text-blue-600'
                      : stepItem.completed
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {stepItem.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="ml-8 h-0.5 w-16 bg-gray-300" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
