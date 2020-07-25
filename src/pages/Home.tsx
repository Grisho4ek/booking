import React, { useEffect, useContext } from 'react';
import { Search } from '../components/Search';
import { TicketsList } from '../components/TicketsList';
import { useApi } from '../hooks/useApi';
import { ITicket } from '../typings';

import { ToastContext } from '../context/toast';

export const Home = () => {
  const { setIsOpen, setMessage, setType } = useContext(ToastContext);
  const { data: tickets, error, pending, sendRequest } = useApi<ITicket[]>();

  useEffect(() => {
    sendRequest('/tickets');
  }, [sendRequest]);

  useEffect(() => {
    if (error) {
      setIsOpen(true);
      setMessage(error);
      setType('error');
    }
  }, [error, setIsOpen, setMessage, setType]);

  return (
    <>
      <Search sendRequest={sendRequest} />
      <TicketsList pending={pending} tickets={tickets} error={!!error} />
    </>
  );
};
