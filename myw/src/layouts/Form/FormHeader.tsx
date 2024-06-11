import React, { memo } from 'react';
import Text from '../../components/Text';

interface Props {
  primary?: string,
  secondary?: string
}

function FormContent({ primary, secondary }: Props) {
  return (
    <div className="px-4 md:px-0">
      <Text size="lg" shade="dark" weight="medium">{primary}</Text>
      <Text className="mt-1" size="sm">{secondary}</Text>
    </div>
  );
}

export default memo(FormContent);
