import React from 'react';
import { ITicket } from '../typings';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';

interface Props {
  ticket: ITicket | undefined;
}

export const TicketInfo: React.FC<Props> = ({ ticket }) => {
  if (!ticket) return null;
  const { country, city, date, time } = ticket;

  const infoFields = [
    {
      label: 'Date',
      value: moment(date).format('MMM Do YY')
    },
    {
      label: 'Time',
      value: moment(date + ' ' + time).format('HH:mm')
    },
    {
      label: 'Country',
      value: country
    },
    {
      label: 'City',
      value: city
    }
  ];

  return (
    <>
      {infoFields.map(({ label, value }) => (
        <Box key={label}>
          <Typography variant='subtitle2'>{label}</Typography>
          <Typography variant='h6'>{value}</Typography>
        </Box>
      ))}
    </>
  );
};
