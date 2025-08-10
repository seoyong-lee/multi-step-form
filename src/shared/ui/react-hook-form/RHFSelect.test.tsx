import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RHFSelect } from './RHFSelect';
import { FormProvider, useForm } from 'react-hook-form';

// 테스트용 폼 래퍼 컴포넌트
const FormTestWrapper = ({
  onSubmit,
  children,
}: {
  onSubmit?: Parameters<ReturnType<typeof useForm>['handleSubmit']>[0];
  children: React.ReactNode;
}) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: { category: '' },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit ?? (() => {}))}>{children}</form>
    </FormProvider>
  );
};

// 테스트용 옵션 데이터
const testOptions = [
  { label: '소설', value: 'novel' },
  { label: '에세이', value: 'essay' },
  { label: '자기계발', value: 'self-development' },
];

describe('RHFSelect', () => {
  it('1. label과 select가 정상 렌더링되어야 한다', () => {
    render(<RHFSelect name="category" label="카테고리" options={testOptions} />, {
      wrapper: FormTestWrapper,
    });

    expect(screen.getByLabelText('카테고리')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('2. options가 올바르게 렌더링되어야 한다', () => {
    render(<RHFSelect name="category" label="카테고리" options={testOptions} />, {
      wrapper: FormTestWrapper,
    });

    // placeholder option 확인
    expect(screen.getByText('선택해주세요')).toBeInTheDocument();

    // 각 옵션이 존재하는지 확인
    testOptions.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('3. required가 설정되면 유효성 검사 실패 시 에러 메시지를 보여줘야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFSelect name="category" label="카테고리" options={testOptions} required />, {
      wrapper: FormTestWrapper,
    });

    const select = screen.getByRole('combobox');

    // 옵션을 선택한 후 다시 빈 값으로 변경하여 validation 트리거
    await user.selectOptions(select, 'novel');
    await user.selectOptions(select, '');

    // 유효성 검사 수동 트리거 - blur 이벤트로 validation 실행
    await user.tab(); // 다음 요소로 포커스 이동하여 blur 트리거

    // 에러 메시지가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('카테고리은 필수 선택 항목입니다.');
    });
  });

  it('4. form submit 시 required 검증이 동작해야 한다', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const methods = useForm({
        mode: 'onChange',
        defaultValues: { category: '' },
      });

      const handleSubmit = async () => {
        // form submit 시 validation이 실행되도록 함
        await methods.trigger('category');
      };

      return (
        <FormProvider {...methods}>
          <div>
            <RHFSelect name="category" label="카테고리" options={testOptions} required />
            <button type="button" onClick={handleSubmit}>
              제출
            </button>
          </div>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const submitButton = screen.getByRole('button', { name: '제출' });

    // 빈 상태에서 validation 실행
    await user.click(submitButton);

    // 에러 메시지가 나타날 때까지 대기
    await waitFor(
      () => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent('카테고리은 필수 선택 항목입니다.');
      },
      { timeout: 3000 },
    );
  });

  it('5. 옵션을 선택했을 때 값이 변경되어야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFSelect name="category" label="카테고리" options={testOptions} />, {
      wrapper: FormTestWrapper,
    });

    const select = screen.getByRole('combobox');

    // 옵션 선택
    await user.selectOptions(select, 'essay');

    // 선택된 값 확인
    expect(select).toHaveValue('essay');
    expect(screen.getByRole('option', { name: '에세이' })).toHaveProperty('selected', true);
  });

  it('6. placeholder가 커스텀으로 설정되어야 한다', () => {
    render(
      <RHFSelect
        name="category"
        label="카테고리"
        options={testOptions}
        placeholder="카테고리를 선택하세요"
      />,
      { wrapper: FormTestWrapper },
    );

    expect(screen.getByText('카테고리를 선택하세요')).toBeInTheDocument();
  });

  it('7. disabled 상태가 적용되어야 한다', () => {
    render(<RHFSelect name="category" label="카테고리" options={testOptions} disabled />, {
      wrapper: FormTestWrapper,
    });

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('8. 에러 상태일 때 올바른 접근성 속성이 설정되어야 한다', async () => {
    const user = userEvent.setup();

    render(<RHFSelect name="category" label="카테고리" options={testOptions} required />, {
      wrapper: FormTestWrapper,
    });

    const select = screen.getByRole('combobox');

    // validation 트리거
    await user.selectOptions(select, 'novel');
    await user.selectOptions(select, '');

    // blur 이벤트로 validation 실행
    await user.tab();

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(select).toHaveAttribute('aria-invalid', 'true');
      expect(select).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });
});
