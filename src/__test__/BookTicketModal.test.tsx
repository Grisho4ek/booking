import React from 'react';
import { render, act } from '@testing-library/react';
import { BookTicketModal } from '../components/BookTicketModal';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '../utils/waitFor';
import { mockResponse } from './mockResponse';
import { mockFetch } from './mockFetch';

beforeEach(() => {
  mockFetch(mockResponse[0]);
});

describe('test BookTicketModal component', () => {
  test('renders ticket info correctly', async () => {
    const { getByText, getAllByText } = render(
      <BookTicketModal
        isOpen={true}
        openModal={jest.fn()}
        closeModal={jest.fn()}
        type='book-ticket'
        objectId={1}
      />
    );

    await act(async () => {
      waitFor();
    });

    expect(getAllByText('Ukraine'));
    expect(getByText('Kyiv'));
    expect(getByText('Aug 20th 20'));
    expect(getByText('16:00'));
  });
});
