import { BookStatus } from '@/entities/book';
import { RHFSelect, RHFTextField } from '@/shared/ui/react-hook-form';
import { useWatch } from 'react-hook-form';
import { css } from '@emotion/react';

export const StepBasicInfo = () => {
  const readingStatus = useWatch({ name: 'readingStatus' }) as BookStatus;

  const shouldShowStartDate =
    readingStatus === BookStatus.READING ||
    readingStatus === BookStatus.READ ||
    readingStatus === BookStatus.PENDING;

  const shouldShowEndDate = readingStatus === BookStatus.READ;

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>1단계 - 도서 기본 정보</h2>

      <div css={formGroupStyle}>
        <RHFTextField
          name="title"
          label="제목"
          required
          placeholder="책 제목을 입력하세요"
          wrapperCss={fieldWrapperStyle}
          labelCss={labelStyle}
          inputCss={inputStyle}
          errorCss={errorStyle}
        />
      </div>

      <div css={formGroupStyle}>
        <RHFTextField
          name="author"
          label="저자"
          placeholder="저자를 입력하세요"
          wrapperCss={fieldWrapperStyle}
          labelCss={labelStyle}
          inputCss={inputStyle}
          errorCss={errorStyle}
        />
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
          wrapperCss={fieldWrapperStyle}
          labelCss={labelStyle}
          selectCss={selectStyle}
          errorCss={errorStyle}
        />
      </div>

      {shouldShowStartDate && (
        <div css={formGroupStyle}>
          <RHFTextField
            name="readingStartDate"
            label="독서 시작일"
            placeholder="YYYY-MM-DD"
            type="date"
            wrapperCss={fieldWrapperStyle}
            labelCss={labelStyle}
            inputCss={inputStyle}
            errorCss={errorStyle}
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
            wrapperCss={fieldWrapperStyle}
            labelCss={labelStyle}
            inputCss={inputStyle}
            errorCss={errorStyle}
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

const fieldWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const labelStyle = css`
  font-weight: 500;
  color: #555;
  font-size: 14px;
`;

const inputStyle = css`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const selectStyle = css`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const errorStyle = css`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;
