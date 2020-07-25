import React, { ReactNode } from 'react';
import { Box, Container } from '@material-ui/core';

interface Props {
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      bgcolor='neutral.main'
      display='flex'
      style={{ minHeight: '100vh' }}
      justifyContent='center'
      py={2}
    >
      <Container maxWidth='md'>
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};
