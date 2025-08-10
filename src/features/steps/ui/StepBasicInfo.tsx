import { BookFormData, BookStatus } from '@/entities/book';
import { RHFSelect, RHFTextField } from '@/shared/ui/react-hook-form';
import { useWatch } from 'react-hook-form';
import { css } from '@emotion/react';

export const StepBasicInfo = () => {
  const status = useWatch<BookFormData, 'readingStatus'>({ name: 'readingStatus' });
  const shouldShowStartDate =
    status === BookStatus.READING || status === BookStatus.READ || status === BookStatus.PENDING;
  const shouldShowEndDate = status === BookStatus.READ;

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>1단계 - 도서 기본 정보</h2>

      <div css={formGroupStyle}>
        <RHFTextField name="title" label="제목" required placeholder="책 제목을 입력하세요" />
      </div>
      <div css={formGroupStyle}>
        <RHFTextField name="publicationDate" label="출판일" placeholder="YYYY-MM-DD" type="date" />
      </div>
      <div css={formGroupStyle}>
        <RHFSelect
          name="readingStatus"
          label="독서 상태"
          required
          options={[
            { label: '읽고 싶은 책', value: BookStatus.WANT_TO_READ },
            { label: '읽는 중', value: BookStatus.READING },
            { label: '읽음', value: BookStatus.READ },
            { label: '보류 중', value: BookStatus.PENDING },
          ]}
        />
      </div>
      {shouldShowStartDate && (
        <div css={formGroupStyle}>
          <RHFTextField
            name="readingStartDate"
            label="독서 시작일"
            placeholder="YYYY-MM-DD"
            type="date"
          />
        </div>
      )}
      {shouldShowEndDate && (
        <div css={formGroupStyle}>
          <RHFTextField
            name="readingEndDate"
            label="독서 종료일"
            placeholder="YYYY-MM-DD"
            type="date"
          />
        </div>
      )}
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
