import React from 'react';
import { Paper, Box, Button, TextField, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import queryString from 'query-string';
import * as Yup from 'yup';
import moment from 'moment';

interface Props {
  sendRequest: (url: string) => Promise<void>;
}

interface FormValues {
  date: string;
  country: string;
}

enum Fields {
  date = 'date',
  country = 'country'
}

const fields = [
  { name: Fields.date, type: 'date', label: 'Departure date' },
  { name: Fields.country, type: 'text', label: 'Country to travel' }
];

const searchSchema = Yup.object().shape({
  date: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  country: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export const Search: React.FC<Props> = ({ sendRequest }) => {
  const initialValues: FormValues = {
    date: '',
    country: ''
  };

  return (
    <Box mb={3}>
      <Paper component='div' elevation={3}>
        <Box p={2}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              const date = values.date
                ? moment(values.date).format('DD.MM.YYYY')
                : undefined;

              await sendRequest(
                `/tickets/?${queryString.stringify({
                  country: values.country,
                  date
                })}`
              );
              setSubmitting(false);
            }}
            validationSchema={searchSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Grid
                  container
                  alignItems='flex-start'
                  justify='space-between'
                  spacing={2}
                >
                  {fields.map(({ name, type, label }) => (
                    <Grid item xs={12} sm={6} md={5} key={name}>
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
                          touched[name] && !!errors[name]
                            ? errors[name]
                            : undefined
                        }
                      />
                    </Grid>
                  ))}
                  <Grid item md={2}>
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      size='large'
                      type='submit'
                      data-testid='submit'
                      disabled={isSubmitting}
                    >
                      find
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};
