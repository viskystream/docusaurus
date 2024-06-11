import clsx from 'clsx';
import React, { ReactNode, isValidElement, cloneElement } from 'react';

interface ProgressStepperProps {
  children: ReactNode;
  activeStep: number;
  className?: string;
  progressMode?: 'numbered' | 'icon';
  completedTrailClassName?: string;
  isLoading?: boolean;
}

interface CloneableElementProps extends React.Attributes {
  active?: boolean;
  completed?: boolean;
}

function ProgressStepper({
  children,
  activeStep,
  className,
  progressMode = 'numbered',
  completedTrailClassName,
  isLoading,
}: ProgressStepperProps) {
  const childrenCount = React.Children.count(children);
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        const isLastChildrenIndex = index === childrenCount - 1;
        const isCompleted = activeStep > index + 1;

        if (isValidElement(child)) {
          const element = cloneElement(child, {
            active: activeStep === index + 1,
            completed: isCompleted,
            stepNumber: progressMode === 'numbered' ? index + 1 : undefined,
            showBorder: !isLastChildrenIndex,
            completedTrailClassName: isCompleted
              ? completedTrailClassName
              : undefined,
            ...child.props,
          } as CloneableElementProps);

          return (
            <>
              {element}
              {!isLastChildrenIndex && (
                <div className="h-7 pb-1 pl-4">
                  <div
                    className={clsx(
                      'h-full border-l',
                      isCompleted ? completedTrailClassName : '',
                      { '!border-none': isLoading },
                    )}
                  />
                </div>
              )}
            </>
          );
        }
        return child;
      })}
    </div>
  );
}

export default ProgressStepper;
