import React, { memo, ReactNode } from 'react';

const variantOptions = {
  bold: 'font-bold',
  normal: 'font-normal',
  italic: 'italic',
};

type CompanyNameProps = {
  children: ReactNode;
  variant?: keyof typeof variantOptions
};

const CompanyName = memo(({ children, variant = 'bold' }: CompanyNameProps) => (
  <span className={variantOptions[variant]}>
    {children}
  </span>
));

export default CompanyName;
