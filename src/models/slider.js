import { login } from '../services/login.service';
export default {

  namespace: 'slider',

  state: {
    defaultSelectedKeys: ['/']
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({type: 'slider/changeSelectKy', payload: pathname});
      });
    },
  },

  effects: {
    *login({payload}, {call, put}) {
      const data = yield call(login, payload);
      yield put({ type: 'login_success', payload: data});
      return data;
    }
  },

  reducers: {
    changeSelectKy(state, action) {
      console.log(state, action);
      const path = action.payload;
      return {
        ...state,
        defaultSelectedKeys: [path]
      }
    },
    login_success(state, action) {
      const {login, message} = action.payload;
      return {
        ...state,
        loginSuccess: login === 'success' ? true : false,
        message
      }
    },
    save(state, action) {
      console.log('执行了save')
      return { ...state, ...action.payload };
    },
    add(state, action) {
      console.log('count/add');
      console.log('state', state);
      console.log('action', action);
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.current ? newCurrent : state.current,
        current: newCurrent
      }
    }
  },

};
