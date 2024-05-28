import ChatDemoMarkdoc from './ChatDemo.markdoc';
import callout from './Callout.markdoc';
import image from './Image.markdoc';
import companyName from './CompanyName.markdoc';
import companyEmail from './CompanyEmail.markdoc';
import linkGrid from './LinkGrid.markdoc';
import linkGridLink from './LinkGridLink.markdoc';
import markdocExample from './MarkdocExample.markdoc';
import tabs from './Tabs.markdoc';
import tabHeader from './TabHeader.markdoc';
import tabHeaderItem from './TabHeaderItem.markdoc';
import tabPanel from './TabPanel.markdoc';
import tabPanelItem from './TabPanelItem.markdoc';
import numberedList from './NumberedList.markdoc';
import numberedListItem from './NumberedListItem.markdoc';
import feedback from './Feedback.markdoc';
import link from './Link.markdoc';
import video from './Video.markdoc';
import definitionHover from './DefinitionHover.markdoc';
import linkCard from './LinkCard.markdoc';

const tags = {
    image,
    callout,
    link,
    'company-name': companyName,
    'company-email': companyEmail,
    'link-grid': linkGrid,
    'link-grid-link': linkGridLink,
    'markdoc-example': markdocExample,
    tabs,
    'tab-header': tabHeader,
    'tab-header-item': tabHeaderItem,
    'tab-panel': tabPanel,
    'tab-panel-item': tabPanelItem,
    'numbered-list-item': numberedListItem,
    'numbered-list': numberedList,
    feedback,
    'chat-demo': ChatDemoMarkdoc,
    video,
    'definition-hover': definitionHover,
    'link-card': linkCard,
};

export default tags;
