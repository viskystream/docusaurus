import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TableOfContents, TableOfContentsSection } from '../utils/generateTableOfContents';
import { getUpdated } from '../components/docsSlice';

type UseTableOfContentsOptions = {
  tableOfContents: TableOfContents;
};

const getElementTop = (el: Element) => {
  const style = window.getComputedStyle(el);
  const scrollMt = parseFloat(style.scrollMarginTop);

  return window.scrollY + el.getBoundingClientRect().top - scrollMt;
};

/**
 * TOC, add top
 */
const mapScrollPositions = (tableOfContents: TableOfContents) => tableOfContents.map((section: TableOfContentsSection) => {
  if (!section.el) return section;

  return {
    ...section,
    top: getElementTop(section.el),
  };
});

const useHighlightTOC = ({ tableOfContents }: UseTableOfContentsOptions) => {
  const [currentItem, setCurrentItem] = useState(tableOfContents?.[0]?.id);

  /**
   * Rerender on layout change (Tabs / Initial Render)
   */
  const updated = useSelector(getUpdated);

  /**
   * Filter unrendered Headings
   */
  const inDocument = useMemo(
    () => tableOfContents.reduce<TableOfContents>((previousValue, currentValue) => {
      if (!currentValue.id) return previousValue;

      const el = document.getElementById(currentValue.id);

      // ignore elements that are not in doc or that have no height (are invisible)
      if (!el || el.offsetHeight === 0) return previousValue;

      previousValue.push({
        ...currentValue,
        el,
      });

      return previousValue;
    }, []),
    [tableOfContents, updated] // eslint-disable-line
  );

  /**
   * Check which section highlighted onScroll
   */
  useEffect(() => {
    const scrollPositions = mapScrollPositions(inDocument);
    if (scrollPositions.length === 0) return undefined;

    function onScroll() {
      const contentTop = window.pageYOffset;
      let current = scrollPositions[0].id;

      for (let i = 0; i < scrollPositions.length; i++) {
        if (scrollPositions[i].top <= contentTop) {
          current = scrollPositions[i].id;
        }
      }

      setCurrentItem(current);
    }

    (window as any).addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });

    onScroll();

    return () => {
      (window as any).removeEventListener('scroll', onScroll, {
        capture: true,
        passive: true,
      });
    };
  }, [inDocument]);

  /**
   * Map highlighted route
   */
  const highlighted = useMemo(() => inDocument.map((section) => {
    if (section.id === currentItem) {
      return {
        ...section,
        highlighted: true,
      };
    }
    return section;
  }), [inDocument, currentItem]);

  return highlighted;
};

export default useHighlightTOC;
