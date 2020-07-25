import React from 'react';
import { render } from '@testing-library/react';
import { TicketInfo } from '../components/TicketInfo';
import { ITicket } from '../typings';
import { mockResponse } from './mockResponse';
import '@testing-library/jest-dom/extend-expect';

describe('test TicketInfo component', () => {
  test('renders ticket info correctly', async () => {
    const { getByText, getAllByText } = render(
      <TicketInfo ticket={mockResponse[0] as ITicket} />
    );

    expect(getAllByText('Ukraine'));
    expect(getByText('Kyiv'));
    expect(getByText('Aug 20th 20'));
    expect(getByText('16:00'));
  });
});
