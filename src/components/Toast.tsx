import React, { useContext } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { ToastContext } from '../context/toast';

export const Toast = () => {
  const { isOpen, setIsOpen, message, type } = useContext(ToastContext);

  const handleClose = () => setIsOpen(false);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};
