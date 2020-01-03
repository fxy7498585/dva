import { getAccessToken, getCategory, getTemplateList, getPubTemplateKeyWordsById, getPubTemplateTitleList } from '../services/subscribeMessage.service';
export default {

  namespace: 'subscribeMessage',

  state: {
    access_token: '',
    categoryList: [],
    templateList: [],
    templateTitleList: [],
    templateKeyWords: []
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     dispatch({type: 'slider/changeSelectKy', payload: pathname});
    //   });
    // },
  },

  effects: {
    *getAccessToken({payload}, {call, put}) {
      const data = yield call(getAccessToken);
      yield put({type: 'getAccessTokenSuccess', payload: data});
      return data;
    },
    *getCategory({payload}, {call, put}) {
      const data = yield call(getCategory, localStorage.getItem('access_token'));
      yield put({type: 'getCategorySuccess', payload: data});
      return data;
    },
    *getTemplateList({payload}, {call, put}) {
      const data = yield call(getTemplateList, localStorage.getItem('access_token'));
      yield put({type: 'getTemplateListSuccess', payload: data});
      return data;
    },
    *getPubTemplateKeyWordsById({payload}, {call, put}) {
      const data = yield call(getPubTemplateKeyWordsById, {
        access_token: localStorage.getItem('access_token'),
        tid: payload
      });
      yield put({
        type: 'getPubTemplateKeyWordsByIdSuccess',
        payload: data
      });
      return data;
    },

    *getPubTemplateTitleList({payload}, {call, put}) {
      const data = yield call(getPubTemplateTitleList, {
        access_token: localStorage.getItem('access_token'),
        ids: payload,
        start: 0,
        limit: 30,
      });
      yield put({type: 'getPubTemplateTitleListSuccess', payload: data});
      return data;

    },

  },

  reducers: {

    getPubTemplateKeyWordsByIdSuccess(state, action) {
      const templateKeyWords = action?.payload?.data;
      return {
        ...state,
        templateKeyWords
      }
    },

    getPubTemplateTitleListSuccess(state, action) {
      const templateTitleList = action?.payload?.data;
      return {
        ...state,
        templateTitleList
      }
    },
    getTemplateListSuccess(state, action) {
      const templateList = action?.payload?.data;
      return {
        ...state,
        templateList
      }
    },
    getAccessTokenSuccess (state, action) {
      const token = action?.payload?.access_token;
      localStorage.setItem('access_token', token);
      return {
        ...state,
        access_token: token
      }
    },
    getCategorySuccess(state, action) {
      const categoryList = action?.payload?.data;
      return {
        ...state,
        categoryList
      }
    },
  },

};
