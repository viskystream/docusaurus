import { useState } from 'react';

const useSlideOver = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};

export default useSlideOver;
