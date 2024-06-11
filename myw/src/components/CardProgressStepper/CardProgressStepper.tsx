import clsx from 'clsx';
import React, { ReactNode, isValidElement, cloneElement } from 'react';

interface CardProgressStepperProps {
  children: ReactNode;
  activeStep: number;
  className?: string;
  isLoading?: boolean;
}

interface CloneableElementProps extends React.Attributes {
  active?: boolean;
  completed?: boolean;
}

function CardProgressStepper({
  children, activeStep, className, isLoading,
}: CardProgressStepperProps) {
  const childrenCount = React.Children.count(children);
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        const isLastChildrenIndex = index === childrenCount - 1;

        if (isValidElement(child)) {
          const element = cloneElement(child, {
            active: activeStep === (index + 1),
            completed: activeStep > (index + 1),
            ...child.props,
          } as CloneableElementProps);

          return (
            <>
              {element}
              {!isLastChildrenIndex && (
                <div className="h-7 pl-8 py-1">
                  <div className={clsx('border-l-2 border-blue-500 h-full', { 'border-gray-300': isLoading })} />
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

export default CardProgressStepper;
