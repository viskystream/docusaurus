import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Text from './Text';

interface PaidStreamPlaceholderProps {
  playerType?: string,
  autoplay?: boolean,
}

function PaidStreamPlaceholder({ playerType, autoplay }: PaidStreamPlaceholderProps) {
  return (
    <React.Fragment>
      <Text size="xl" className="flex jusify-center text-white">
        Valid access token required.
      </Text>
      {!(playerType === 'stock' && autoplay) && (
        <div
          className="absolute left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2 border-3 rounded-full border-white p-3"
        >
          <LockClosedIcon className="w-16 text-white" />
        </div>
      )}
    </React.Fragment>
  );
}

export default PaidStreamPlaceholder;
