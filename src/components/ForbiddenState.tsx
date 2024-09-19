import React from 'react';
import { ShieldX } from 'lucide-react';

const ForbiddenState = ({ message = "You are not the admin", description = "" }) => {
  return (
    <div className='w-full flex justify-center'>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <ShieldX className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">{message}</h3>
        <p className="text-sm text-gray-500 max-w-sm">{description}</p>
      </div>
    </div>
  );
};

export default ForbiddenState;