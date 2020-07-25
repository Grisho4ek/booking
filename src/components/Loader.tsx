import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
interface Props {}

export const Loader = (props: Props) => {
  return (
    <Box justifyContent='center' display='flex'>
      <CircularProgress style={{ margin: 'auto' }} />
    </Box>
  );
};
