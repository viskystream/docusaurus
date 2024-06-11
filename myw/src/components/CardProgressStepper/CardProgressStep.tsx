import React, { ReactNode } from 'react';
import clsx from 'clsx';
import CheckMark from '../ProgressIndicators/CheckMark';
import InProgressPip from '../ProgressIndicators/InProgressPip';
import Skeleton from '../Skeleton';

interface CardProgressStepProps {
  title: string;
  description?: string;
  children?: ReactNode;
  active?: boolean;
  completed?: boolean;
  className?: string;
  isLoading?: boolean;
}

function CardProgressStep({
  title,
  description,
  children,
  active,
  completed,
  className,
  isLoading,
}: CardProgressStepProps) {
  return (
    <div className={clsx('rounded-md border bg-white p-4', className)}>
      <div className="flex items-center justify-start gap-4">
        <Skeleton active={isLoading} className="!rounded-full">
          <div>
            {completed && <CheckMark />}
            {active && <InProgressPip />}
          </div>
        </Skeleton>
        <div>
          <Skeleton active={isLoading}>
            <div className="font-semibold text-gray-700">{title}</div>
            <div className="text-sm text-gray-700">{description}</div>
          </Skeleton>
        </div>
      </div>
      {children && <div className="mt-4 pl-6">{children}</div>}
    </div>
  );
}

export default CardProgressStep;
