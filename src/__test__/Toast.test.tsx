import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from '../components/Toast';
import { ToastProvider } from '../providers/ToastProvider';
import { errText } from '../hooks/useApi';

describe('test Toast component', () => {
  const message = 'Success';

  test('Toast component renders correctly (error alert)', () => {
    const { container, getByText } = render(
      <ToastProvider value={{ isOpen: true, message: errText, type: 'error' }}>
        <Toast />
      </ToastProvider>
    );
    expect(
      container.querySelector('.MuiAlert-filledError')
    ).toBeInTheDocument();
    expect(getByText(errText));
  });

  test('Toast component renders correctly (success alert)', () => {
    const { container, getByText } = render(
      <ToastProvider value={{ isOpen: true, message, type: 'success' }}>
        <Toast />
      </ToastProvider>
    );
    expect(
      container.querySelector('.MuiAlert-filledSuccess')
    ).toBeInTheDocument();
    expect(getByText(message));
  });

  test('Toast component is not shown', () => {
    const { container } = render(
      <ToastProvider value={{ isOpen: false, message, type: 'success' }}>
        <Toast />
      </ToastProvider>
    );
    expect(container.querySelector('.MuiSnackbar-root')).toBeNull();
  });
});
