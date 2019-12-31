import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import photoPage from './routes/photo/photo';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/photo" exact component={photoPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;


