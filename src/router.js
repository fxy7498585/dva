import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

import SlicerComponent from './components/slider/slider';
const { ConnectedRouter } = routerRedux;

// import IndexPage from './routes/IndexPage';
// import photoPage from './routes/photo/photo';
// import addTemplate from './routes/subscribeMessage/addTemplate/addTemplate';

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'Index',
      layout: SlicerComponent,
      component: () => import('./routes/IndexPage')
    },
    {
      path: '/photo',
      neme: 'Photo',
      layout: SlicerComponent,
      component: () => import('./routes/photo/photo')
    },
    {
      paht: '/addTemplate',
      name: 'AddTemplate',
      layout: SlicerComponent,
      // models: () => [import('./models/subscribeMessage')],
      component: () => import('./routes/subscribeMessage/addTemplate/addTemplate')
    }
  ]
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map(({path, name, layout, ...dynamics}) => {
            const Component = dynamic({app, ...dynamics})
            return (
              <Route 
                path={path}   
                key={name}
                exact 
                render={(props) => {
                  const {history, location} = props;
                  if(layout) {
                    return (
                      <SlicerComponent history={history} location = {location}>
                        <Component {...props}/>
                      </SlicerComponent>
                    )
                  }
                  return (<Component {...props}/>)
                }}
              />
            )
          })
        }
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;


