import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useFetchMarkdoc from '../hooks/useFetchMarkdoc';
import { Link } from 'react-router-dom';
import { usePopper } from 'react-popper';

interface Props {
  children: ReactNode,
  path: string
}

function DefinitionHover({ children, path }: Props) {
  const [referenceElement, setReferenceElement] = React.useState<HTMLSpanElement|null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement|null>(null);
  const { styles, attributes, update } = usePopper(referenceElement, popperElement);

  const { render, error, loading } = useFetchMarkdoc({ path: `/glossary/${path}` });

  const destinationEl = document.querySelector('#portal-destination');

  useEffect(() => {
    if (popperElement) popperElement.style.display = 'none';

    function show() {
      if (popperElement) popperElement.style.display = 'block';

      // We need to tell Popper to update the tooltip position
      // after we show the tooltip, otherwise it will be incorrect
      if (update) update();
    }

    function hide() {
      if (popperElement) popperElement.style.display = 'none';
    }

    referenceElement?.addEventListener('mouseenter', show);
    referenceElement?.addEventListener('focus', show);
    referenceElement?.addEventListener('mouseleave', hide);
    referenceElement?.addEventListener('blur', hide);
    return () => {
      referenceElement?.removeEventListener('mouseenter', show);
      referenceElement?.removeEventListener('focus', show);
      referenceElement?.removeEventListener('mouseleave', hide);
      referenceElement?.removeEventListener('blur', hide);
    };
  }, [popperElement, referenceElement, update]);

  return (
    <span className="relative" ref={setReferenceElement}>
      <Link
        to={`glossary#${path}`}
        className="bg-primary-100 !shadow-none text-primary-500"
      >
        {children}
      </Link>
      {destinationEl && ReactDOM.createPortal(
        <div
          className="border border-solid rounded-lg p-5 bg-white shadow-md text-sm max-w-md w-max prose"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {loading ? 'Loading...' : render}
          {error ? error.message : null}
        </div>,
        destinationEl,
      )}
    </span>
  );
}

export default DefinitionHover;
