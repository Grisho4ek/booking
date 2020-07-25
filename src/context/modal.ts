import { createContext } from 'react';
import { ModalContextValues } from '../typings';

export const ModalContext = createContext<ModalContextValues>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  type: undefined,
  objectId: undefined
});
