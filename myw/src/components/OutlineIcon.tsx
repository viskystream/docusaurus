import React, { memo } from 'react';
import * as heroicons from '@heroicons/react/24/outline';

export type IconName = keyof typeof heroicons

interface OutlineIconProps {
	icon: IconName
	className?: string
}

/**
 * Dynamically Assign Heroicon
 * https://github.com/tailwindlabs/heroicons/issues/278#issuecomment-942136861
 */
function OutlineIcon({ icon, ...props }: OutlineIconProps) {
  let Icon = heroicons[icon];

  if (!Icon) {
    console.warn(`Warning: Icon name of "${icon}" does not exist.`);
    Icon = heroicons.ExclamationCircleIcon;
  }

  return <Icon {...props} />;
}

export default memo(OutlineIcon);
