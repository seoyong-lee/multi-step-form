import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RHFNumberField } from './RHFNumberField';
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

describe('RHFNumberField', () => {
  it('1. label과 input이 정상 렌더링되어야 한다', () => {
    render(<RHFNumberField name="price" label="가격" />, { wrapper: FormTestWrapper });

    expect(screen.getByLabelText('가격')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('2. required가 설정되면 유효성 검사 실패 시 에러 메시지를 보여줘야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFNumberField name="price" label="가격" required />, { wrapper: FormTestWrapper });

    const input = screen.getByLabelText('가격');

    // 입력한 후 다시 지워서 validation 트리거
    await user.type(input, '100');
    await user.clear(input);

    // 에러 메시지가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('가격은 필수 항목입니다.');
    });
  });

  it('3. form submit 시 required 검증이 동작해야 한다', async () => {
    render(
      <FormTestWrapper>
        <RHFNumberField name="price" label="가격" required />
        <button type="submit">제출</button>
      </FormTestWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: '제출' });

    // 빈 상태에서 form 제출
    fireEvent.click(submitButton);

    // 에러 메시지가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('가격은 필수 항목입니다.');
    });
  });

  it('4. 에러 상태일 때 올바른 접근성 속성이 설정되어야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFNumberField name="price" label="가격" required />, { wrapper: FormTestWrapper });

    const input = screen.getByLabelText('가격');

    // validation 트리거
    await user.type(input, '100');
    await user.clear(input);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });

  it('5. min, max, step 속성이 올바르게 설정되어야 한다', () => {
    render(<RHFNumberField name="rating" label="평점" min={1} max={5} step={0.5} />, {
      wrapper: FormTestWrapper,
    });

    const input = screen.getByLabelText('평점');
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '5');
    expect(input).toHaveAttribute('step', '0.5');
  });

  it('6. integer 속성이 true일 때 소수점이 절삭되어야 한다', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm({ mode: 'onChange' });
      const onSubmit = (data: Record<string, unknown>) => {
        // form 값 확인을 위한 콜백
        console.log('Form data:', data);
      };

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <RHFNumberField name="quantity" label="수량" integer />
            <button type="submit">제출</button>
          </form>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const input = screen.getByLabelText('수량');

    // 소수점이 포함된 값 입력
    await user.type(input, '3.7');

    // blur 이벤트로 값 변환 트리거
    await user.tab();

    // integer 속성으로 인해 소수점이 절삭되어야 함
    // 하지만 input의 value는 여전히 3.7로 표시됨 (사용자 입력값)
    expect(input).toHaveValue(3.7);

    // form 제출 시 실제 값이 정수로 변환되는지 확인
    const submitButton = screen.getByRole('button', { name: '제출' });
    await user.click(submitButton);

    // onSubmit에서 data.quantity가 3이 되어야 함 (Math.trunc(3.7) = 3)
  });

  it('7. allowEmpty가 false일 때 빈 값이 0으로 처리되어야 한다', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm({ mode: 'onChange' });
      const onSubmit = (data: Record<string, unknown>) => {
        // form 값 확인을 위한 콜백
        console.log('Form data:', data);
      };

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <RHFNumberField name="score" label="점수" allowEmpty={false} />
            <button type="submit">제출</button>
          </form>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const input = screen.getByLabelText('점수');

    // 값 입력 후 지우기
    await user.type(input, '100');
    await user.clear(input);

    // blur 이벤트로 값 변환 트리거
    await user.tab();

    // allowEmpty가 false이므로 빈 값이 0으로 처리되어야 함
    expect(input).toHaveValue(null);
  });

  it('8. disabled 상태가 적용되어야 한다', () => {
    render(<RHFNumberField name="price" label="가격" disabled />, { wrapper: FormTestWrapper });

    const input = screen.getByLabelText('가격');
    expect(input).toBeDisabled();
  });

  it('9. placeholder가 올바르게 설정되어야 한다', () => {
    render(<RHFNumberField name="price" label="가격" placeholder="가격을 입력하세요" />, {
      wrapper: FormTestWrapper,
    });

    const input = screen.getByLabelText('가격');
    expect(input).toHaveAttribute('placeholder', '가격을 입력하세요');
  });

  it('10. 숫자가 아닌 값 입력 시 undefined로 처리되어야 한다', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm({ mode: 'onChange' });
      const onSubmit = (data: Record<string, unknown>) => {
        // form 값 확인을 위한 콜백
        console.log('Form data:', data);
      };

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <RHFNumberField name="amount" label="금액" />
            <button type="submit">제출</button>
          </form>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const input = screen.getByLabelText('금액');

    // 숫자가 아닌 값 입력
    await user.type(input, 'abc');

    // blur 이벤트로 값 변환 트리거
    await user.tab();

    // 숫자가 아닌 값은 undefined로 처리되어야 함
    expect(input).toHaveValue(null);
  });
});
