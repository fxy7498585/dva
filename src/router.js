import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Count from './routes/count/count';
import Login from './routes/login/login';
import LazyLoadComponent from './routes/lazyLoad/lazyLoad';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/count" exact component={Count} />
        <Route path="/lazy" exact component={LazyLoadComponent} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
