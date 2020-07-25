import React, { ReactNode, useState } from 'react';
import { ModalContext } from '../context/modal';
import { ModalType } from '../typings';

interface Props {
  children: ReactNode;
  value?: any;
}

export const ModalProvider: React.FC<Props> = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<undefined | ModalType>(undefined);
  const [objectId, setObjectId] = useState<number | undefined>(undefined);

  const { Provider } = ModalContext;

  const openModal = (type: ModalType, objectId?: number) => {
    setIsOpen(true);
    setType(type);
    objectId && setObjectId(objectId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setType(undefined);
    setObjectId(undefined);
  };

  return (
    <Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        type,
        objectId,
        ...value
      }}
    >
      {children}
    </Provider>
  );
};
