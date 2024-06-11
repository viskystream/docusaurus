import React, { memo } from 'react';

function Video({ src, type }: { src: string, type?: string }) {
  return (
    <video controls width="100%" className="p-0 rounded-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.1)]">
      <track kind="captions" />
      <source src={src} type={type} />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  );
}

export default memo(Video);
