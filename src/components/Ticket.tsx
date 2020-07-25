import React from 'react';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';

import { Button, Box, Grid, Typography, Card } from '@material-ui/core';
import { ITicket } from '../typings';

interface Props {
  ticket: ITicket;
  openModal: (type: string, objectid?: number | undefined) => void;
}

export const Ticket: React.FC<Props> = ({ ticket, openModal }) => {
  const { id, city, country, date, time } = ticket;

  return (
    <Grid item xs={12} sm={6} data-testid={`ticket-${id}`}>
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
            data-testid={`book-btn-ticket-${id}`}
            variant='contained'
            color='secondary'
            endIcon={<ShoppingCartRoundedIcon />}
            onClick={() => openModal('book-ticket', id)}
          >
            book
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
