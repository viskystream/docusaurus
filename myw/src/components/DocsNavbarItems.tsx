import React, { memo } from 'react';
import { NavbarItem, NavbarSection } from './Navbar';
import SearchInput from './SearchInput/SearchInput';

const BASENAME = process.env.BASENAME || '/';

function DocsNavbarItems() {
  const hasAdminRole = 'true';
  const isDevEnv = process.env.NODE_ENV === 'development';
  return (
    <>
      <NavbarSection className="overflow-x-auto no-scrollbar">
        <NavbarItem
          to="/docs/introduction"
          external={BASENAME !== ''}
        >
          Articles
        </NavbarItem>
        <NavbarItem
          to={BASENAME === '/apps/demos' ? '/playground' : '/apps/demos/playground'}
          external={BASENAME !== '/apps/demos'}
        >
          Playground
        </NavbarItem>
        <NavbarItem
          to="/docs/apis"
          external={BASENAME !== ''}
        >
          API
        </NavbarItem>
        {hasAdminRole && isDevEnv && (
          <NavbarItem
            to={BASENAME === '/apps/demos' ? '/sandbox' : '/apps/demos/sandbox'}
            external={BASENAME !== '/apps/demos'}
          >
            Component Library
          </NavbarItem>
        )}
        {hasAdminRole && isDevEnv && (
          <NavbarItem
            to={
              BASENAME === '' ? '/docs/components' : `${window.location.origin}/docs/components`
            }
            external={BASENAME !== ''}
          >
            Docs Components
          </NavbarItem>
        )}
        {hasAdminRole && (
          <NavbarItem
            to={BASENAME === '' ? '/docs/internal-developer-docs' : `${window.location.origin}/docs/internal-developer-docs`}
            external={BASENAME !== ''}
          >
            Internal Developer Docs
          </NavbarItem>
        )}
      </NavbarSection>
      <NavbarSection>
        <SearchInput />
      </NavbarSection>
    </>
  );
}

export default memo(DocsNavbarItems);
