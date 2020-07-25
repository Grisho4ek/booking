import React, { useEffect } from 'react';
import { Box, Dialog, Typography, IconButton } from '@material-ui/core';
import { TicketInfo } from './TicketInfo';
import { BookTicketForm } from './BookTicketForm';
import { ModalContextValues, ITicket } from '../typings';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { useApi } from '../hooks/useApi';
import { Loader } from './Loader';

export const BookTicketModal: React.FC<ModalContextValues> = ({
  isOpen,
  closeModal,
  objectId
}) => {
  const matches = useMediaQuery('(min-width:568px)');
  const { data: ticket, pending, sendRequest } = useApi<ITicket>();

  useEffect(() => {
    objectId && sendRequest(`/tickets/${objectId}`);
  }, [objectId, sendRequest]);

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth
      TransitionComponent={Transition}
    >
      <Box
        data-testid='booking-modal'
        px={2}
        pt={2}
        pb={1}
        display='flex'
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <Typography variant='h5'>Book a ticket</Typography>

        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={closeModal}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
      {pending ? (
        <Loader />
      ) : (
        <Box display={matches ? 'flex' : undefined}>
          <Box px={2} mb={2} flexGrow={1} width={matches ? '40%' : undefined}>
            <TicketInfo ticket={ticket} />
          </Box>
          <Box px={2} mb={2} flexGrow={1} width={matches ? '60%' : undefined}>
            <BookTicketForm ticket={ticket} closeModal={closeModal} />
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});
