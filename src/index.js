import dva from 'dva';
import './index.css';
import { createBrowserHistory } from 'history';
import createLoading from 'dva-loading';
import allModule from './models/index';
import { message } from 'antd';
import RouterConfig from './router';
const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
allModule.forEach((item) => {
  app.model(item);
})



// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');
