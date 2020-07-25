import React, { useContext } from 'react';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import { Ticket } from './Ticket';
import { Loader } from './Loader';
import { ITicket } from '../typings';
import { ModalContext } from '../context/modal';

interface Props {
  pending: boolean;
  tickets: ITicket[] | undefined;
  error: boolean;
}

export const TicketsList: React.FC<Props> = ({ pending, tickets, error }) => {
  const { openModal } = useContext(ModalContext);

  if (pending) {
    return <Loader />;
  }

  if (error || !tickets) {
    return null;
  }

  if (tickets?.length === 0) {
    return (
      <Paper>
        <Box p={2}>
          <Typography>Tickets not found</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2}>
      {tickets.map(ticket => (
        <Ticket ticket={ticket} key={ticket.id} openModal={openModal} />
      ))}
    </Grid>
  );
};
