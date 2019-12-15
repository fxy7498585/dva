import dva from 'dva';
import './index.css';
import { createBrowserHistory } from 'history';
import createLoading from 'dva-loading';
import allModule from './models/index';

// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
allModule.forEach((item) => {
  app.model(item);
})


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
