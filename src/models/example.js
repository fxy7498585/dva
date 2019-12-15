
export default {

  namespace: 'count',

  state: {
    record : 0,
    current: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log('fetch')
      yield put({ type: 'save' });
    },

    *add({ payload}, { call, put}) {
      console.log('*add');
      console.log('payload', payload);
      yield call((timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }, 1000);
      yield put({type: 'save'});
    }
  },

  reducers: {
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
