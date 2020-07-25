import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@material-ui/core';

export const Page404 = () => {
  return (
    <Paper>
      <Box p={2}>
        <Typography align='center' variant='h1'>
          404
        </Typography>
        <Box display='flex' justifyContent='center'>
          <Button to='/' component={Link} variant='outlined' color='primary'>
            Go to home page
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
