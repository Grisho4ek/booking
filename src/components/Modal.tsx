import React, { useContext } from 'react';

import { ModalContext } from '../context/modal';
import { BookTicketModal } from './BookTicketModal';

export const Modal = () => {
  const modalProps = useContext(ModalContext);

  if (!modalProps.type) return null;

  switch (modalProps.type) {
    case 'book-ticket':
      return <BookTicketModal {...modalProps} />;

    default:
      return null;
  }
};
