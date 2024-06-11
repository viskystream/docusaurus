import clsx from 'clsx';
import React, { ReactNode } from 'react';
import SmallCheckMark from '../ProgressIndicators/SmallCheckMark';
import InProgressPip from '../ProgressIndicators/InProgressPip';
import CheckMark from '../ProgressIndicators/CheckMark';
import NotStartedPip from '../ProgressIndicators/NotStartedPip';
import Skeleton from '../Skeleton';

interface ProgressStepProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  active?: boolean;
  completed?: boolean;
  stepNumber?: number;
  showBorder?: boolean;
  completedTrailClassName?: string;
  isLoading?: boolean;
}

function ProgressStep({
  title,
  children,
  active,
  completed,
  stepNumber,
  showBorder,
  description,
  completedTrailClassName = '',
  isLoading,
}: ProgressStepProps) {
  return (
    <div>
      <div className="flex items-center justify-start gap-4 pb-1 text-sm">
        {stepNumber && (
          <Skeleton active={isLoading}>
            <div
              className={clsx('border rounded-md p-2 h-8 w-8 flex justify-center items-center font-semibold', {
                'text-black': active,
                'text-gray-400': !active && !completed,
              })}
            >
              {stepNumber}
            </div>
          </Skeleton>
        )}
        {!stepNumber && (
          <Skeleton active={isLoading}>
            {active && !completed && <InProgressPip />}
            {completed && <CheckMark />}
            {!active && !completed && <NotStartedPip />}
          </Skeleton>
        )}
        <div className="flex items-center gap-2">
          <div>
            <Skeleton active={isLoading}>
              <div className="font-semibold text-gray-700">{title}</div>
            </Skeleton>
            {description && (
              <Skeleton active={isLoading}>
                <div className="font-semibold text-gray-700">{description}</div>
              </Skeleton>
            )}
          </div>
          {stepNumber && completed && <SmallCheckMark />}
        </div>
      </div>
      {(active || completed) && (
        <div className="pl-4">
          <div className={clsx('pl-6 text-sm', { 'border-l': showBorder && !isLoading, [completedTrailClassName]: showBorder })}>
            <Skeleton active={isLoading} className="w-fit">
              {children}
            </Skeleton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressStep;
