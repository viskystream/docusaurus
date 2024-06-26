/* eslint-disable react/no-array-index-key */
import React, {
  Children, ReactNode, Fragment, memo, useMemo, useCallback, useState, useRef, useEffect,
} from 'react';
import { Highlight, Language } from 'prism-react-renderer';
// import Button from '@dev-center/shared/src/components/Button';

type FenceProps = {
  children: ReactNode
  language: Language
}

const classList = {
  wrapper: 'group relative',
  copyButton: 'absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity',
};

const Fence = memo(({ children, language }: FenceProps) => {
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

  /**
   * Convert children to trimmed string
  */
  const code = useMemo(() => {
    let codeString = '';

    Children.map(children, (child) => {
      if (typeof child === 'string') {
        codeString += child;
      }
    });

    return codeString.trimEnd();
  }, [children]);

  /**
   * Copy code to clipboard
  */
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopyDone(true);
  }, [code]);

  return (
    <div className={classList.wrapper}>
      <Highlight code={code} language={language} theme={undefined}>
        {({
          className, style, tokens, getTokenProps,
        }) => (
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
      <button
        onClick={copy}
        className={`${classList.copyButton} ${hasScrollbar ? 'bottom-6' : 'bottom-2'}`}
      >
        {copyDone ? <span>Copied &#10003;</span> : 'Copy'}
      </button>
    </div>
  );
});

export default Fence;
