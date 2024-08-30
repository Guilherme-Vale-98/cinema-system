import React from 'react';

type Props = {};

const Unauthorized: React.FC<Props> = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
        <p className="mt-4 text-gray-700">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;