import clsx from 'clsx';
import React, { ReactNode, useRef } from 'react';

interface TooltipProps {
  message: string;
  children: ReactNode;
  delay?: number;
  messageClassName?: string;
  position?: 'top' | 'bottom';
}

function Tooltip({
  children, message, delay = 0, messageClassName, position = 'bottom',
}: TooltipProps) {
  const tipRef = useRef<HTMLDivElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleShowTooltip = () => {
    if (tipRef.current === null) return;

    tipRef.current.style.opacity = '1';
    tipRef.current.style.display = 'block';
  };
  const handleHideTooltip = () => {
    if (tipRef.current === null) return;

    if (timeout.current !== null) clearTimeout(timeout.current);

    tipRef.current.style.opacity = '0';
    tipRef.current.style.display = 'none';
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => {
        if (delay === 0) {
          handleShowTooltip();
        } else {
          timeout.current = setTimeout(handleShowTooltip, delay);
        }
      }}
      onMouseLeave={handleHideTooltip}
    >
      <div
        className={clsx('hidden absolute z-10 bg-transparent text-sm whitespace-no-wrap transition-all duration-150 left-1/2 -translate-x-1/2 w-max opacity-0', {
          'top-[100%] pt-4': position === 'bottom',
          'bottom-[100%] pb-4': position === 'top',
        })}
        ref={tipRef}
      >
        <div className={clsx('transition-all bg-gray-500 text-white px-2 py-1 rounded flex items-center text-wrap', messageClassName)}>
          <div
            className={clsx('bg-gray-500 h-3 w-3 absolute left-0 right-0 mx-auto rotate-45', messageClassName, {
              'top-[0.625rem] !border-b-0 !border-r-0': position === 'bottom',
              'bottom-[0.625rem] !border-t-0 !border-l-0': position === 'top',
            })}
          />
          {message}
        </div>
      </div>
      {children}
    </div>
  );
}
export default Tooltip;
