import { ReactNode } from 'react';
import { css } from '@emotion/react';

export const BookFormLayout = ({
  stepContent,
  navigation,
}: {
  stepContent: ReactNode;
  navigation: ReactNode;
}) => {
  return (
    <div css={containerStyles}>
      <main css={mainStyles}>
        {stepContent}
        {navigation}
      </main>
      <aside css={asideStyles}>
        <></>
      </aside>
    </div>
  );
};

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
