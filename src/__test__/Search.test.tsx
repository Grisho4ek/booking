import React from 'react';
import { Search } from '../components/Search';
import { useApi } from '../hooks/useApi';
import { render, fireEvent, act } from '@testing-library/react';
import { API_URL } from '../config';
import '@testing-library/jest-dom/extend-expect';

import { mockFetch } from './mockFetch';

let globalRef: any;
beforeAll(() => {
  globalRef = global;
});
beforeEach(() => {
  mockFetch();
});

const SearchWithHook = () => {
  const { sendRequest } = useApi();
  return <Search sendRequest={sendRequest} />;
};

describe('testing Search component', () => {
  test('Form submitted successfully if only country field was fulfilled', async () => {
    const { getByTestId, container } = render(<SearchWithHook />);

    const countryInput = container.querySelector('input[name="country"]');

    await act(async () => {
      countryInput &&
        fireEvent.change(countryInput, { target: { value: 'Ukraine' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(1);
    expect(globalRef.fetch).toHaveBeenCalledWith(
      `${API_URL}/tickets/?country=Ukraine`,
      {
        body: undefined,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
      }
    );
  });

  test('Form submitted successfully if only date field was fulfilled', async () => {
    const { getByTestId, container } = render(<SearchWithHook />);

    const dateInput = container.querySelector('input[name="date"]');

    await act(async () => {
      dateInput &&
        fireEvent.change(dateInput, { target: { value: '2020-07-16' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(1);
    expect(globalRef.fetch).toHaveBeenCalledWith(
      `${API_URL}/tickets/?date=16.07.2020`,
      {
        body: undefined,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
      }
    );
  });

  test('Form submitted successfully if date field and country field were fulfilled', async () => {
    const { getByTestId, container } = render(<SearchWithHook />);

    const dateInput = container.querySelector('input[name="date"]');
    const countryInput = container.querySelector('input[name="country"]');

    await act(async () => {
      dateInput &&
        fireEvent.change(dateInput, { target: { value: '2020-07-16' } });
    });

    await act(async () => {
      countryInput &&
        fireEvent.change(countryInput, { target: { value: 'Ukraine' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(1);
    expect(globalRef.fetch).toHaveBeenCalledWith(
      `${API_URL}/tickets/?country=Ukraine&date=16.07.2020`,
      {
        body: undefined,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
      }
    );
  });
  test('Form submitted successfully if fields were not fulfilled', async () => {
    const { getByTestId } = render(<SearchWithHook />);

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(globalRef.fetch).toHaveBeenCalledTimes(1);
    expect(globalRef.fetch).toHaveBeenCalledWith(`${API_URL}/tickets`, {
      body: undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'GET'
    });
  });
});
