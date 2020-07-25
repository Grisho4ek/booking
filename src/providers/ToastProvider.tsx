import React, { ReactNode, useState } from 'react';
import { ToastContext } from '../context/toast';

interface Props {
  children: ReactNode;
  value?: any;
}

export const ToastProvider: React.FC<Props> = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [type, setType] = useState<'error' | 'success' | undefined>(undefined);

  const { Provider } = ToastContext;

  return (
    <Provider
      value={{
        isOpen,
        setIsOpen,
        message,
        setMessage,
        type,
        setType,
        ...value
      }}
    >
      {children}
    </Provider>
  );
};
