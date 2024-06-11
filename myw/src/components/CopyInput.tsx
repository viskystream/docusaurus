/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { memo, useState, useCallback } from 'react';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import Input, { BaseInputProps } from './Input';

interface CopyInputProps extends BaseInputProps {
  label: string
  value: string
}

function CopyInput({
  label, value, type = 'text', ...otherProps
}: CopyInputProps) {
  const [copied, setCopied] = useState(false);

  const onAdornmentClick = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  }, [value]);

  const adornmentClassName = copied ? 'text-green-400' : '';
  const icon = copied ? ClipboardDocumentCheckIcon : ClipboardDocumentIcon;

  return (
    <Input
      label={label}
      type={type}
      defaultValue={value}
      // @ts-ignore
      icon={icon}
      iconPosition="end"
      onAdornmentClick={onAdornmentClick}
      adornmentClassName={adornmentClassName}
      {...otherProps}
    />
  );
}

export default memo(CopyInput);
