import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

function CheckMark() {
  return (
    <div className="bg-green-200 p-[1px] w-fit rounded-full">
      <CheckCircleIcon className="h-8 w-8 text-green-600" />
    </div>
  );
}

export default CheckMark;
