import React, { memo, ReactNode } from 'react';

function Split({ children }: { children: ReactNode }) {
  return <div className="grow overflow-y-auto">{children}</div>;
}

export default memo(Split);
