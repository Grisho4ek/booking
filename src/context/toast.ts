import React, { createContext } from 'react';

interface ToastContextValues {
  isOpen: boolean;
  message: string | undefined;
  type: 'error' | 'success' | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setType: React.Dispatch<
    React.SetStateAction<'error' | 'success' | undefined>
  >;
}

export const ToastContext = createContext<ToastContextValues>({
  isOpen: false,
  message: undefined,
  type: undefined,
  setIsOpen: () => {},
  setMessage: () => {},
  setType: () => {}
});
