import { ReactNode } from 'react';
import { css } from '@emotion/react';

interface BookFormLayoutProps {
  children: ReactNode;
}

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <main css={mainStyles}>{children}</main>;
};

const Sidebar = () => {
  return <aside css={asideStyles}></aside>;
};

export const BookFormLayout = ({ children }: BookFormLayoutProps) => {
  return (
    <div css={containerStyles}>
      <main css={mainStyles}>{children}</main>
      <aside css={asideStyles}></aside>
    </div>
  );
};

BookFormLayout.Content = Content;
BookFormLayout.Sidebar = Sidebar;

const containerStyles = css`
  display: flex;
  min-height: 100vh;
`;

const mainStyles = css`
  flex: 1;
  padding: 24px;
`;

const asideStyles = css`
  width: 400px;
  background: #f9f9f9;
  padding: 24px;
`;
