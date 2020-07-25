import React, { useEffect } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TicketsList } from '../components/TicketsList';
import { useApi } from '../hooks/useApi';
import { ITicket } from '../typings';
import { mockResponse } from './mockResponse';
import { mockFetch } from './mockFetch';
import { waitFor } from '../utils/waitFor';

beforeEach(() => {
  mockFetch(mockResponse);
});

const TicketsListWithUseApiHook = () => {
  const { data: tickets, error, pending, sendRequest } = useApi<ITicket[]>();

  useEffect(() => {
    sendRequest('/tickets');
  }, [sendRequest]);

  return <TicketsList pending={pending} tickets={tickets} error={!!error} />;
};

describe('test TicketsList component', () => {
  test('renders tickets correctly', async () => {
    const { getByText, getAllByText, getByTestId } = render(
      <TicketsListWithUseApiHook />
    );

    await act(async () => {
      waitFor();
    });

    expect(getByTestId('ticket-1'));
    expect(getByTestId('ticket-2'));
    expect(getAllByText('Ukraine'));
    expect(getByText('Kyiv'));
    expect(getByText('Lviv'));
    expect(getAllByText('Aug 20th 20'));
    expect(getByText('16:00'));
    expect(getByText('15:30'));
    expect(getAllByText('book'));
  });
});
