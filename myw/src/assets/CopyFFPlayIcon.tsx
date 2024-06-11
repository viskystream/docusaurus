import React from 'react';

interface CopyFFPlayIconProps {
  className?: string,
  onClick?: React.MouseEventHandler<SVGElement>;
}

function CopyFFPlayIcon({ className, onClick }: CopyFFPlayIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} onClick={onClick}>
      <path xmlns="http://www.w3.org/2000/svg" d="M1 1H3.68015C3.75934 1 3.80075 1.09414 3.74724 1.15251L1.02392 4.1234C1.00854 4.14019 1 4.16213 1 4.1849V7.8646C1 7.94598 1.09863 7.98645 1.15579 7.92854L7.96758 1.02708C7.98468 1.00975 8.00801 1 8.03235 1H11.8071C11.8877 1 11.9285 1.09697 11.8722 1.15461L1.15101 12.1311C1.09472 12.1887 1.13555 12.2857 1.21612 12.2857H4.76844C4.79229 12.2857 4.81518 12.2764 4.8322 12.2596L11.8685 5.3513C11.9261 5.29477 12.0233 5.33556 12.0233 5.41624V9.09916C12.0233 9.12292 12.014 9.14573 11.9974 9.16273L9.10079 12.1311C9.04453 12.1888 9.08538 12.2857 9.16593 12.2857H12.0233" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default CopyFFPlayIcon;
