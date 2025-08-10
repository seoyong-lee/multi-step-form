import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';

type InfoMessageProps = {
  variant?: 'info' | 'warning';
  children: ReactNode;
  wrapperCss?: SerializedStyles;
  textCss?: SerializedStyles;
};

export const InfoMessage = ({
  variant = 'info',
  children,
  wrapperCss,
  textCss,
}: InfoMessageProps) => {
  return (
    <div css={[baseWrapperStyle, wrapperCss]}>
      <p css={[baseTextStyle, variantStyles[variant], textCss]}>{children}</p>
    </div>
  );
};

// Base styles
const baseWrapperStyle = css`
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
`;

const baseTextStyle = css`
  font-size: 14px;
  margin: 0;
`;

// Variants
const variantStyles = {
  info: css`
    color: #296f39;
  `,
  warning: css`
    color: #dc3545;
  `,
} as const;
