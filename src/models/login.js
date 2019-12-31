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
    }
  },

};
