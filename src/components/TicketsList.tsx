import React from 'react';
import {
  Button,
  Box,
  CircularProgress,
  Grid,
  Typography,
  Card,
  Paper
} from '@material-ui/core';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ITicket } from '../typings';
import moment from 'moment';

interface Props {
  pending: boolean;
  tickets: ITicket[] | undefined;
  error: boolean;
}

export const TicketsList: React.FC<Props> = ({ pending, tickets, error }) => {
  if (pending) {
    return (
      <Box justifyContent='center' display='flex'>
        <CircularProgress style={{ margin: 'auto' }} />
      </Box>
    );
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
      {tickets.map(({ id, city, country, date, time }) => (
        <Grid item xs={12} sm={6} key={id} data-testid={`ticket-${id}`}>
          <Card>
            <Box p={2}>
              <Box display='flex' mb={3} justifyContent='space-between'>
                <Box display='flex'>
                  <LocationOnRoundedIcon fontSize='large' color='primary' />
                  <Box ml={1}>
                    <Typography variant='subtitle2'>{country}</Typography>
                    <Typography variant='subtitle2'>{city}</Typography>
                  </Box>
                </Box>
                <Box display='flex'>
                  <Box mr={1}>
                    <Typography variant='subtitle2' align='right'>
                      {moment(date).format('MMM Do YY')}
                    </Typography>
                    <Typography variant='subtitle2' align='right'>
                      {moment(date + ' ' + time).format('HH:mm')}
                    </Typography>
                  </Box>
                  <AccessTimeIcon fontSize='large' color='primary' />
                </Box>
              </Box>
              <Button
                variant='contained'
                color='secondary'
                endIcon={<ShoppingCartRoundedIcon />}
              >
                book
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
