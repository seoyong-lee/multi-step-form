import { useFormContext, useFieldArray } from 'react-hook-form';
import { css } from '@emotion/react';
import { BookFormInput } from '../lib/schema';
import { RHFTextField } from '@/shared/ui/react-hook-form/RHFTextField';
import { CharacterCount } from '@/shared/ui/count/CharacterCount';
import { InfoMessage } from '@/shared/ui/info-message/InfoMessage';
import { RHFNumberField } from '@/shared/ui/react-hook-form';

export const StepQuotes = () => {
  const { control, watch } = useFormContext<BookFormInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  const quotes = watch('quotes') || [];
  const totalPages = watch('totalPages');
  const hasMultipleQuotes = quotes.length >= 2;

  const handleAddQuote = () => {
    append({ text: '', page: undefined });
  };

  const handleRemoveQuote = (index: number) => {
    remove(index);
  };

  return (
    <section css={containerStyle}>
      <div css={titleContainerStyle}>
        <h2 css={titleStyle}>4단계 - 인용구</h2>
        <p css={subtitleStyle}>책에서 인상 깊었던 구절이나 인용구를 등록해보세요.</p>
      </div>

      <RHFTextField
        name="totalPages"
        label="도서 전체 페이지 수"
        placeholder="도서의 전체 페이지 수를 입력해주세요 (예: 300)"
        type="number"
        rules={{
          min: {
            value: 1,
            message: '페이지 수는 1 이상이어야 합니다.',
          },
        }}
      />
      <p css={helpTextStyle}>인용구의 페이지 번호는 이 값보다 작아야 합니다.</p>

      <div css={addButtonContainerStyle}>
        <button type="button" onClick={handleAddQuote} css={addButtonStyle}>
          + 인용구 추가
        </button>
      </div>

      {quotes.length === 0 && (
        <InfoMessage variant="info">
          <strong>인용구 등록</strong>
          <br />
          아직 등록된 인용구가 없습니다. 아래 버튼을 클릭하여 첫 번째 인용구를 추가해보세요.
        </InfoMessage>
      )}

      <div css={quotesContainerStyle}>
        {fields.map((field, index) => (
          <div key={field.id} css={quoteCardStyle}>
            <div css={quoteHeaderStyle}>
              <h3 css={quoteTitleStyle}>인용구 {index + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveQuote(index)}
                css={deleteButtonStyle}
              >
                삭제
              </button>
            </div>

            <RHFTextField
              name={`quotes.${index}.text`}
              label="인용구"
              placeholder="인상 깊었던 구절이나 인용구를 입력해주세요..."
              multiline
              rows={3}
              inputCss={quoteInputWrapperStyle}
              rules={{
                maxLength: {
                  value: 500,
                  message: '인용구는 500자 이하여야 합니다.',
                },
              }}
            />
            <CharacterCount
              current={quotes[index]?.text?.length || 0}
              max={500}
              wrapperCss={countWrapperStyle}
            />

            {hasMultipleQuotes && (
              <RHFNumberField
                name={`quotes.${index}.page`}
                label="페이지 번호"
                placeholder="페이지 번호를 입력해주세요 (예: 42)"
                required={hasMultipleQuotes}
                min={1}
                max={Number(totalPages)}
                rules={{
                  min: {
                    value: 1,
                    message: '페이지 번호는 1 이상이어야 합니다.',
                  },
                  max: {
                    value: Number(totalPages),
                    message: `페이지 번호는 도서 전체 페이지 수(${totalPages}페이지)보다 작아야 합니다.`,
                  },
                }}
                inputCss={quoteInputWrapperStyle}
              />
            )}
          </div>
        ))}
      </div>

      {hasMultipleQuotes && (
        <InfoMessage variant="info">
          <strong>페이지 번호 입력</strong>
          <br />
          인용구가 2개 이상일 때는 모든 인용구에 페이지 번호를 입력해야 합니다.
        </InfoMessage>
      )}
    </section>
  );
};

const containerStyle = css`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
`;

const titleContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 32px;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  padding-bottom: 8px;
`;

const subtitleStyle = css`
  color: #6b7280;
  font-size: 14px;
`;

const helpTextStyle = css`
  font-size: 12px;
  color: #6b7280;
  margin-top: 10px;
`;

const quotesContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const quoteCardStyle = css`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const quoteHeaderStyle = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const quoteTitleStyle = css`
  font-size: 18px;
  font-weight: 500;
  color: #111827;
`;

const deleteButtonStyle = css`
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #b91c1c;
  }
`;

const addButtonContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 16px 0;
`;

const addButtonStyle = css`
  padding: 12px 24px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const quoteInputWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  color: #1a1a1a;
`;

const countWrapperStyle = css`
  margin-top: -6px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
