import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Ticket } from '../components/Ticket';
import { mockResponse } from './mockResponse';
import '@testing-library/jest-dom/extend-expect';

describe('test Ticket component', () => {
  test('renders ticket info correctly', async () => {
    const openModal = jest.fn();

    const { getByText, getAllByText } = render(
      <Ticket ticket={mockResponse[0]} openModal={openModal} />
    );

    expect(getAllByText('Ukraine'));
    expect(getByText('Kyiv'));
    expect(getByText('Aug 20th 20'));
    expect(getByText('16:00'));

    await act(async () => {
      fireEvent.click(getByText('book'));
    });

    expect(openModal).toHaveBeenCalled();
  });
});
