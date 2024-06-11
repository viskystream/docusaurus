import React, { ReactElement, memo, useMemo, useCallback, useState, useRef, useEffect, Fragment } from 'react';
import { Highlight, Language } from 'prism-react-renderer';
import { Button } from 'react-bootstrap'; // Adjust according to your library

type FenceProps = {
  children: React.ReactNode;
  language: Language;
};

const classList = {
  wrapper: 'group relative',
  copyButton: 'absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity',
};

const Fence: React.FC<FenceProps> = memo(({ children, language }: FenceProps): ReactElement => {
  const [hasScrollbar, setHasScrollbar] = useState<boolean | null>(false);
  const [copyDone, setCopyDone] = useState<boolean>(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    function handleHasScrollbar() {
      setHasScrollbar(preRef.current && preRef.current?.scrollWidth > preRef.current?.offsetWidth);
    }
    handleHasScrollbar();
    window.addEventListener('resize', handleHasScrollbar);
    return () => window.removeEventListener('resize', handleHasScrollbar);
  }, [children]);

  useEffect(() => {
    if (copyDone) setTimeout(() => setCopyDone(false), 2000);
  }, [copyDone]);

  const code = useMemo(() => {
    let codeString = '';

    React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        codeString += child;
      }
    });

    return codeString.trimEnd();
  }, [children]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopyDone(true);
  }, [code]);

  return (
    <div className={classList.wrapper}>
      <Highlight {...{ language, code }}>
        {({ className, style, tokens, getTokenProps }) => (
          <pre ref={preRef} className={className} style={style}>
            <code>
              {tokens.map((line, index) => (
                <Fragment key={index}>
                  {line.map((token, i) => (
                    <span key={i} {...getTokenProps({ token })} />
                  ))}
                  {'\n'}
                </Fragment>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      <Button
        size={"xs" as any}
        onClick={copy}
        className={`${classList.copyButton} ${hasScrollbar ? 'bottom-6' : 'bottom-2'}`}
      >
        {copyDone ? <span>Copied &#10003;</span> : 'Copy'}
      </Button>
    </div>
  );
});

export default Fence;