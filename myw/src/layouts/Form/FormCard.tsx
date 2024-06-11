import React, { memo, ReactNode } from 'react';
import { Card, CardContent } from '../../components/Card';

interface Props {
  children: ReactNode;
  className?: string;
  inset?: any;
}

function FormCard({ children, className }: Props) {
  return (
    <Card fullWidth className={className}>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}

export default memo(FormCard);
