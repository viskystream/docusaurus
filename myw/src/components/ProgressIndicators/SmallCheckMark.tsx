import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';

function SmallCheckMark() {
  return (
    <div className="bg-green-100  h-6 w-6 rounded-full flex justify-center items-center border-green-600 border">
      <CheckIcon className="h-3 w-3 text-green-600" strokeWidth={4} />
    </div>
  );
}

export default SmallCheckMark;
