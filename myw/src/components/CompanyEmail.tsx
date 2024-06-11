import React, { memo, ReactNode } from 'react';

const variantOptions = {
  bold: 'font-bold',
  normal: 'font-normal',
  italic: 'italic',
};

type CompanyEmailProps = {
  children: ReactNode;
  variant?: keyof typeof variantOptions
};

const CompanyEmail = memo(({ children, variant = 'normal' }: CompanyEmailProps) => (
  <span className={variantOptions[variant]}>
    {children}
  </span>
));

export default CompanyEmail;
