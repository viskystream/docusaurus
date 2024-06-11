import { ReactNode, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

/**
 * Since VDC uses jss, the css classes that are scraped  in the useEffect below
 * get antiquated class references and styles are not applied. This uses wilcard
 * styles to port css over to new window.
 *
 * @param styleSheet
 * @returns HTMLStyleElement |  null
 */
const scrapeStyles = (styleSheet: any): HTMLStyleElement | null => {
  const isSelector = /.video-/;
  const classNameRegex = /\.(.*)-[0-9]+-[0-9]+-[0-9]+/;
  const styleTag = document.createElement('style');
  let wildcardStyle = '';

  if (
    styleSheet.cssRules[0] != null
    && styleSheet.cssRules[0].selectorText != null
    && isSelector.test(styleSheet.cssRules[0].selectorText)
  ) {
    Object.values(styleSheet.cssRules).forEach((rule: any) => {
      wildcardStyle += rule.cssText.replace(classNameRegex, '[class*="$1"]');
    });

    styleTag.textContent = wildcardStyle;
    return styleTag;
  }

  return null;
};

interface RenderInWindowProps {
  closeWindow?: boolean
  title?: string
  children: ReactNode
  onClose?: () => void
  reInjectStylesDeps?: unknown[]
}

const RenderInWindow = ({
  closeWindow,
  onClose,
  children,
  title,
  reInjectStylesDeps = [],
}: RenderInWindowProps) => {
  const container = useMemo(() => document.createElement('div'), []);
  const newWindow = useMemo(
    () => window.open(
      '',
      '',
      'width=600,height=400,left=200,top=200',
    ),
    [],
  );

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      newWindow?.close();
    });

    if (closeWindow) {
      newWindow?.close();
    }
  }, [closeWindow, newWindow]);

  useEffect(() => {
    if (container) {
      // Copy over styles to the pop-out window
      (Array.from(window.document.styleSheets) as CSSStyleSheet[]).forEach(
        (stylesSheet: CSSStyleSheet) => {
          if (stylesSheet.href) {
            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.href = `${stylesSheet.href}`;
            newWindow?.document.head.appendChild(link);
          } else if (stylesSheet.ownerNode) {
            const vdcStyles = scrapeStyles(stylesSheet);

            if (vdcStyles != null) {
              newWindow?.document.head.appendChild(vdcStyles);
            } else {
              newWindow?.document.head.appendChild(
                stylesSheet.ownerNode.cloneNode(true),
              );
            }
          } else {
            console.log(
              '%c skipping stylesSheet... ',
              'color: red',
              stylesSheet,
            );
          }
        },
      );

      if (title) {
        const titleEl = document.createElement('title');
        titleEl.innerText = title;
        newWindow?.document.head.appendChild(titleEl);
      }

      // Append container to new window
      newWindow?.document.body.appendChild(container);
      // handler when new window is closed
      newWindow?.addEventListener('beforeunload', () => {
        onClose?.();
      });

      // cleanup window
      return () => {
        if (newWindow) {
          newWindow.document.head.innerHTML = '';
          newWindow.document.body.innerHTML = '';
        }
      };
    }

    return () => {};
  }, [container, newWindow, onClose, title, ...reInjectStylesDeps]);

  useEffect(() => () => newWindow?.close(), []);

  return container && createPortal(children, container);
};

export default RenderInWindow;
