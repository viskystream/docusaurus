import React, { useState } from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function Feedback() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-fit">
      <Text component="div" size="xl">{clicked ? 'Thank you for your feedback' : 'Was this page helpful?'}</Text>
      {clicked ? (
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16" />
        </div>
      ) : (
        <div className="flex gap-6">
          <Button
            variant="white"
            size="lg"
            componentClassName="text-xl font-normal w-20"
            onClick={() => {
              setClicked(true);
            }}
          >
            Yes
          </Button>
          <Button
            variant="white"
            size="lg"
            componentClassName="text-xl font-normal w-20"
            onClick={() => {
              setClicked(true);
            }}
          >
            No
          </Button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
