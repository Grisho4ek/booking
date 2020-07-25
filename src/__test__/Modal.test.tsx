import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from '../components/Modal';
import { ModalProvider } from '../providers/ModalProvider';

describe('test Modal component', () => {
  test('Modal component renders correctly if type book-ticket', () => {
    const { getByTestId } = render(
      <ModalProvider
        value={{
          isOpen: true,
          type: 'book-ticket',
          objectId: 1,
          openModal: jest.fn(),
          closeModal: jest.fn()
        }}
      >
        <Modal />
      </ModalProvider>
    );
    expect(getByTestId('booking-modal')).toBeInTheDocument();
  });

  test('Modal component is not shown', () => {
    const { container } = render(
      <ModalProvider
        value={{
          isOpen: false,
          type: 'book-ticket',
          objectId: 1,
          openModal: jest.fn(),
          closeModal: jest.fn()
        }}
      >
        <Modal />
      </ModalProvider>
    );
    expect(container.querySelector("[data-testid='booking-modal']")).toBeNull();
  });

  test('Modal component works corectly if type === undefined', () => {
    const { container } = render(
      <ModalProvider
        value={{
          isOpen: true,
          type: undefined,
          objectId: 1,
          openModal: jest.fn(),
          closeModal: jest.fn()
        }}
      >
        <Modal />
      </ModalProvider>
    );
    expect(container.querySelector("[data-testid='booking-modal']")).toBeNull();
  });
});
