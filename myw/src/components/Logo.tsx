import React, { useState } from 'react';
import clsx from 'clsx';
const BASENAME = '/';
const THEME = 'default';

type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps) {
  const [error, setError] = useState(false);

  /**
   * Remove once all apps use REACT_APP_THEME
   */
  if (error) {
    return (
      <svg
        viewBox="0 0 4167 4167"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
        className={clsx('w-8 h-8', className)}
      >
        <path
          d="M277.781 1186.195l2269.103 885.443-1.943.758 1328.424 518.374 15.521-6.781V1581.575L277.781.005v1186.19z"
          fill="#155e75"
          fillRule="nonzero"
        />
        <path
          d="M2552.696 2073.512L285.54 2958.218l-.007 1208.45 3595.595-1574.779-1328.43-518.377z"
          fill="#06b6d4"
          fillRule="nonzero"
        />
      </svg>
    );
  }

  return (
    <img
      alt="logo"
      onError={() => setError(true)}
      className={clsx('w-8 h-8', className)}
      src={`${BASENAME}/assets/${THEME}/logo.svg`}
    />
  );
}

export default Logo;
