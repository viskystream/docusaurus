import { ReactNode } from 'react';

interface CardCommonProps {
  className?: string,
  children?: ReactNode,
}

export interface CardProps extends CardCommonProps {
  fullWidth?: boolean
  dividers?: boolean
  variant?: string
}

export interface CardHeaderProps extends CardCommonProps {
  overline?: string,
  primary?: string,
  secondary?: ReactNode,
  headerClassName?: string,
}

export interface CardContentProps extends CardCommonProps {
  inset?: boolean,
  gutterTop?: boolean,
  gutterBottom?: boolean,
}

export interface CardFooterProps extends CardCommonProps {
  inset?: boolean
}
