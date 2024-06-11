import React from 'react';

function LinearProgress() {
  return (
    <div className="w-full h-0.5 bg-transparent overflow-hidden">
      <div className="h-full w-1/3 bg-primary-500 animate-linear-progress-slideRight" />
    </div>
  );
}

export default LinearProgress;
