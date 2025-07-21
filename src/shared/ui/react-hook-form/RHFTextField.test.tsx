import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RHFTextField } from './RHFTextField';
import { FormProvider, useForm } from 'react-hook-form';

// 테스트용 폼 래퍼 컴포넌트
const FormTestWrapper = ({
  onSubmit,
  children,
}: {
  onSubmit?: Parameters<ReturnType<typeof useForm>['handleSubmit']>[0];
  children: React.ReactNode;
}) => {
  const methods = useForm({ mode: 'onChange' });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit ?? (() => {}))}>{children}</form>
    </FormProvider>
  );
};

describe('RHFTextField', () => {
  it('1. label과 input이 정상 렌더링되어야 한다', () => {
    render(<RHFTextField name="title" label="제목" />, { wrapper: FormTestWrapper });

    expect(screen.getByLabelText('제목')).toBeInTheDocument();
  });

  it('2. required가 설정되면 유효성 검사 실패 시 에러 메시지를 보여줘야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFTextField name="title" label="제목" required />, { wrapper: FormTestWrapper });

    const input = screen.getByLabelText('제목');

    // 입력한 후 다시 지워서 validation 트리거
    await user.type(input, 'test');
    await user.clear(input);

    // 에러 메시지가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('제목은 필수 항목입니다.');
    });
  });

  it('3. form submit 시 required 검증이 동작해야 한다', async () => {
    render(
      <FormTestWrapper>
        <RHFTextField name="title" label="제목" required />
        <button type="submit">제출</button>
      </FormTestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: '제출' });

    // 빈 상태에서 form 제출
    fireEvent.click(submitButton);

    // 에러 메시지가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('제목은 필수 항목입니다.');
    });
  });

  it('4. className props가 각 요소에 적용되어야 한다', () => {
    render(
      <RHFTextField
        name="title"
        label="제목"
        wrapperClassName="wrapper"
        labelClassName="label"
        inputClassName="input"
        errorClassName="error"
      />,
      { wrapper: FormTestWrapper },
    );

    expect(screen.getByLabelText('제목')).toHaveClass('input');
    expect(screen.getByText('제목')).toHaveClass('label');
    expect(screen.getByLabelText('제목').closest('div')).toHaveClass('wrapper');
  });

  it('5. 에러 상태일 때 올바른 접근성 속성이 설정되어야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFTextField name="title" label="제목" required />, { wrapper: FormTestWrapper });

    const input = screen.getByLabelText('제목');

    // validation 트리거
    await user.type(input, 'test');
    await user.clear(input);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });
});
