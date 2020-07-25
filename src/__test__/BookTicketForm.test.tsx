import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { BookTicketForm } from '../components/BookTicketForm';
import { ITicket } from '../typings';
import { mockResponse } from './mockResponse';
import { mockFetch } from './mockFetch';
import { API_URL } from '../config';
import '@testing-library/jest-dom/extend-expect';

let globalRef: any;
beforeAll(() => {
  globalRef = global;
});
beforeEach(() => {
  mockFetch();
});

describe('test BookTicketForm component', () => {
  test('Form submitted successfully', async () => {
    const { container, getByTestId } = render(
      <BookTicketForm
        ticket={mockResponse[0] as ITicket}
        closeModal={jest.fn()}
      />
    );

    const firstName = container.querySelector('input[name="firstName"]');
    const lastName = container.querySelector('input[name="lastName"]');
    const email = container.querySelector('input[name="email"]');

    await act(async () => {
      firstName && fireEvent.change(firstName, { target: { value: 'Linus' } });
    });

    await act(async () => {
      lastName && fireEvent.change(lastName, { target: { value: 'Torvalds' } });
    });
    await act(async () => {
      email && fireEvent.change(email, { target: { value: 'test@test.com' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('booking-submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(1);
    expect(globalRef.fetch).toHaveBeenCalledWith(`${API_URL}/bookings`, {
      body: `{"firstName":"Linus","lastName":"Torvalds","email":"test@test.com","ticket":{"id":1,"date":"2020-08-20","time":"16:00:00","country":"Ukraine","city":"Kyiv"}}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
  });

  test('Form firstName field required', async () => {
    const { container, getByTestId } = render(
      <BookTicketForm
        ticket={mockResponse[0] as ITicket}
        closeModal={jest.fn()}
      />
    );

    const lastName = container.querySelector('input[name="lastName"]');
    const email = container.querySelector('input[name="email"]');

    await act(async () => {
      lastName && fireEvent.change(lastName, { target: { value: 'Torvalds' } });
    });
    await act(async () => {
      email && fireEvent.change(email, { target: { value: 'test@test.com' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('booking-submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(0);
  });
  test('Form lastName field required', async () => {
    const { container, getByTestId } = render(
      <BookTicketForm
        ticket={mockResponse[0] as ITicket}
        closeModal={jest.fn()}
      />
    );

    const firstName = container.querySelector('input[name="firstName"]');
    const email = container.querySelector('input[name="email"]');

    await act(async () => {
      firstName &&
        fireEvent.change(firstName, { target: { value: 'Torvalds' } });
    });
    await act(async () => {
      email && fireEvent.change(email, { target: { value: 'test@test.com' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('booking-submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(0);
  });
  test('Form submitted successfully', async () => {
    const { container, getByTestId } = render(
      <BookTicketForm
        ticket={mockResponse[0] as ITicket}
        closeModal={jest.fn()}
      />
    );

    const firstName = container.querySelector('input[name="firstName"]');
    const lastName = container.querySelector('input[name="lastName"]');

    await act(async () => {
      firstName && fireEvent.change(firstName, { target: { value: 'Linus' } });
    });

    await act(async () => {
      lastName && fireEvent.change(lastName, { target: { value: 'Torvalds' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('booking-submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(0);
  });
});
