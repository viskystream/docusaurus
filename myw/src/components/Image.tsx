import Dialog, { DialogContent } from '../components/Dialog';
import React, { Fragment, memo, useState } from 'react';

type ImageProps = {
  src: string;
  alt: string;
};

const imageStyles = 'p-0 box-content mx-auto max-h-96 max-w-full rounded-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.1)] cursor-pointer hover:scale-105 hover:border-2 hover:border-primary-200 transition duration-500 ease-in-out ';

function Image({ src, alt }: ImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <img
        src={src}
        alt={alt}
        className={imageStyles}
        onClick={() => setOpen(true)}
        aria-hidden="true"
      />
      <Dialog
        open={open}
        setOpen={setOpen}
        className="sm:mx-[5rem] !max-w-none sm:max-w-7xl  min-w-auto sm:!w-auto"
      >
        <DialogContent>
          <img
            src={src}
            alt={alt}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="cursor-pointer max-w-[80vw] min-h-[25rem] max-h-[38rem] min-w-auto"
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default memo(Image);
