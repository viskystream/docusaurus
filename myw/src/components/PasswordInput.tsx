import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Input, { InputProps } from './Input';

function PasswordInput(props: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <Input
      type={show ? 'text' : 'password'}
      onAdornmentClick={() => setShow((prev) => !prev)}
      icon={show ? EyeSlashIcon : EyeIcon}
      iconPosition="end"
      {...props}
    />
  );
}

export default PasswordInput;
