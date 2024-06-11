import React, { CSSProperties, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';
import { ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import RenderInWindow from './RenderInWindow';
import NewWindowIconGray from '../../assets/NewWindowIconGray';
import NewWindowIconWhite from '../../assets/NewWindowIconWhite';
import useMediaQuery from '../../hooks/useMediaQuery';
import Button from '../Button';
import Text from '../Text';

const DEFAULT_WIDTH = 400;

const rotatedTextStyles: CSSProperties = {
  writingMode: 'vertical-lr',
  transform: 'rotate(180deg)',
  color: 'white',
  height: 140,
};

interface Tab {
  label: string
  component: () => ReactElement
  contentWidth?: number
}

interface TabbedDrawerProps {
  tabs: Array<Tab>
}

type TabState = {
  [key: number]: boolean
}

function TabbedDrawer({ tabs }: TabbedDrawerProps) {
  const [selectedTab, setSelectedTab] = useState<null | number>(null);
  const [poppedOutState, setPoppedOutState] = useState<TabState>({});
  const isSmallerScreen = useMediaQuery('lg', 'max');
  const [expanded, setExpanded] = useState(false);

  React.useEffect(() => {
    const initPoppedOutState: TabState = {};
    for (let i = 0; i < tabs.length; i++) {
      initPoppedOutState[i] = false;
    }
    setPoppedOutState(initPoppedOutState);
  }, []);

  function handlePopoutOpen(index: number) {
    setPoppedOutState((prev) => ({ ...prev, [index]: true }));
    if (index === selectedTab) { setSelectedTab(null); }
  }
  function handlePopoutClose(index: number) {
    setPoppedOutState((prev) => ({ ...prev, [index]: false }));
    setSelectedTab(null);
  }

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col h-full mt-2">
        {isSmallerScreen
          && (
          <Button className="!focus:outline-none mb-1.5" variant="white" onClick={() => setExpanded(!expanded)} size="sm">
            <div className="flex flex-col">
              <Text size="sm" variant="secondary">QA</Text>
              <ArrowRightOnRectangleIcon className={clsx(
                'h-5 w-5',
                expanded ? 'transform -rotate-90' : 'transform rotate-90',
              )}
              />
            </div>
          </Button>
          )}
        {tabs.map((tab, index) => {
          const isSelected = selectedTab === index && !poppedOutState[index];
          return (
            <button
              key={index}
              className={
                clsx(
                  'rounded-lg rounded-tr-none rounded-br-none p-1.5 text-white',
                  index !== 0 ? 'my-1.5' : '',
                  isSelected ? 'bg-primary-600' : 'bg-white border-2 border-r-0',
                  poppedOutState[index] && 'cursor-not-allowed',
                  (isSmallerScreen && !expanded) && 'hidden',
                )
              }
              type="button"
              onClick={() => {
                if (poppedOutState[index]) return;
                setSelectedTab(selectedTab === index ? null : index);
              }}
            >
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer"
                onClick={() => (poppedOutState[index] ? handlePopoutClose(index) : handlePopoutOpen(index))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    if (poppedOutState[index]) {
                      handlePopoutClose(index);
                    } else {
                      handlePopoutOpen(index);
                    }
                  }
                }}
              >
                {isSelected
                  ? <NewWindowIconWhite />
                  : <NewWindowIconGray />}
              </div>
              <h2 style={{ ...rotatedTextStyles, color: isSelected ? 'white' : 'gray' }}>{tab.label}</h2>
            </button>
          );
        })}
      </div>
      <div
        className="relative overflow-auto h-full transition-effects bg-white shadow-md"
        style={{
          width: isSmallerScreen ? 0
            : `${selectedTab !== null && !poppedOutState[selectedTab] ? tabs[selectedTab].contentWidth || DEFAULT_WIDTH : '0'}px`,
        }}
      >
        <div className="absolute top-0 left-0 overflow-visible h-full transition-effects border-l-2 w-full">
          {tabs.map((tab, index) => {
            const isInNewWindow = poppedOutState[index];
            const isSelected = selectedTab === index;

            if (!isSelected && !isInNewWindow) {
              return null;
            }

            const { component: Component } = tab;

            return (
              <div key={index}>
                {isInNewWindow
                  && (
                  <RenderInWindow onClose={() => handlePopoutClose(index)} title={tab.label}>
                    <Component />
                  </RenderInWindow>
                  )}
                {!isInNewWindow && isSelected
                  && (
                  <>
                    {!isSmallerScreen && <Component />}
                    {isSmallerScreen
                      && (
                      <Dialog open={isSelected} onClose={() => setSelectedTab(null)} className="relative z-[300]">
                        {/* The backdrop, rendered as a fixed sibling to the panel container */}
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        {/* Full-screen scrollable container */}
                        <div className="fixed inset-0 overflow-y-auto">
                          {/* Container to center the panel */}
                          <div className="flex min-h-full items-center justify-center p-4">
                            {/* The actual dialog panel  */}
                            <Dialog.Panel className="relative mx-auto rounded bg-white min-w-[70vw] max-w-[85vw]">
                              <XMarkIcon
                                className="w-8 h-8 cursor-pointer text-gray-400 absolute right-1 top-1"
                                onClick={() => setSelectedTab(null)}
                              />
                              <Component />
                            </Dialog.Panel>
                          </div>
                        </div>
                      </Dialog>
                      )}
                  </>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabbedDrawer;
