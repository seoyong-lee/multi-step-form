import { RHFSelect } from '@/shared/ui/react-hook-form';
import { css } from '@emotion/react';

export const StepPublish = () => {
  const publicOptions = [
    { label: '공개', value: 'true' },
    { label: '비공개', value: 'false' },
  ];

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>5단계 - 공개 여부</h2>

      <div css={formGroupStyle}>
        <RHFSelect
          name="isPublic"
          label="공개 여부"
          required
          options={publicOptions}
          placeholder="공개 여부를 선택해주세요"
        />
        <p css={helpTextStyle}>공개로 설정하면 다른 사용자들이 이 도서 정보를 볼 수 있습니다.</p>
      </div>
    </section>
  );
};

const containerStyle = css`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 32px;
  padding-bottom: 8px;
`;

const formGroupStyle = css`
  margin-bottom: 24px;
`;

const helpTextStyle = css`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
`;
