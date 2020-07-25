import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { theme } from './theme';

import { ToastProvider } from './providers/ToastProvider';
import { ModalProvider } from './providers/ModalProvider';
import { Layout } from './containers/Layout';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { Toast } from './components/Toast';
import { Modal } from './components/Modal';
import { Portal } from './containers/Portal';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalProvider>
        <ToastProvider>
          <Layout>
            <Router>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='*'>
                  <Page404 />
                </Route>
              </Switch>
            </Router>
          </Layout>
          <Portal id='toast'>
            <Toast />
          </Portal>
          <Modal />
        </ToastProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};
