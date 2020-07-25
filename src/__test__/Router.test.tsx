import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Page404 } from '../pages/Page404';
import { Layout } from '../containers/Layout';
import '@testing-library/jest-dom/extend-expect';

describe('test routing', () => {
  test('landing on a bad page shows 404 page', () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='*'>
              <Page404 />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
    expect(getByText('404'));
  });

  test('Home page if route "/"', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { getByTestId } = render(
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='*'>
              <Page404 />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
    expect(getByTestId('home-page'));
  });
});
