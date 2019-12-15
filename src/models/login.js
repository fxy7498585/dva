import { login } from '../services/login.service';
export default {

  namespace: 'login',

  state: {
    isLogin: false,
    loginSuccess: false,
    message: '',
  },

  subscriptions: {

  },

  effects: {
    *login({payload}, {call, put}) {
      const data = yield call(login, payload);
      yield put({ type: 'login_success', payload: data});
      return data;
    }
  },

  reducers: {
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
