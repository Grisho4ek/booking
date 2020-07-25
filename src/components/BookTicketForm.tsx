import React, { useEffect, useContext } from 'react';
import { Box, Button, TextField, DialogActions } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { ToastContext } from '../context/toast';
import { useApi } from '../hooks/useApi';
import { IFormField, ITicket, IBook, ApiMethods } from '../typings';

interface Props {
  ticket: ITicket | undefined;
  closeModal: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export const BookTicketForm: React.FC<Props> = ({ ticket, closeModal }) => {
  const { setIsOpen, setMessage, setType } = useContext(ToastContext);

  const { data, error, sendRequest } = useApi<IBook, IBook>();

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: ''
  };

  useEffect(() => {
    if (error) {
      setIsOpen(true);
      setMessage(error);
      setType('error');
    }
  }, [error, setIsOpen, setMessage, setType]);

  useEffect(() => {
    if (data) {
      setIsOpen(true);
      setMessage('Ticket was booked successfully');
      setType('success');
      closeModal();
    }
  }, [data, setIsOpen, setMessage, setType, closeModal]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        await sendRequest('/bookings', ApiMethods.POST, {
          ...values,
          ticket: ticket!
        });

        setSubmitting(false);
      }}
      validationSchema={bookSchema}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box mb={4}>
            {fields.map(({ name, type, label }) => (
              <Box mb={2} key={name}>
                <Field
                  as={TextField}
                  fullWidth
                  name={name}
                  type={type}
                  label={label}
                  InputLabelProps={{
                    shrink: true
                  }}
                  data-testid={name}
                  error={touched[name] && !!errors[name]}
                  helperText={
                    touched[name] && !!errors[name] ? errors[name] : undefined
                  }
                />
              </Box>
            ))}
          </Box>
          <DialogActions>
            <Button onClick={closeModal} color='primary' variant='outlined'>
              Close
            </Button>
            <Button
              color='secondary'
              variant='contained'
              type='submit'
              data-testid='booking-submit'
              disabled={isSubmitting}
            >
              Book
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

const fields: IFormField<FormValues>[] = [
  { name: 'firstName', type: 'text', label: 'First Name' },
  { name: 'lastName', type: 'text', label: 'Last Name' },
  { name: 'email', type: 'email', label: 'Email' }
];

const bookSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Email is invalid').required('Required')
});
