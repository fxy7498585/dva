import { add, findAll, update, deleted } from '../services/article.service';
export default {

  namespace: 'article',

  state: {
    articleList: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     dispatch({type: 'slider/changeSelectKy', payload: pathname});
    //   });
    // },
  },

  effects: {

    *update({payload}, {call, put}) {
      const data = yield call(update, payload);
      return data;
    },

    *delete({payload}, {call, put}) {
      const data = yield call(deleted, payload);
      return data;
    },

    *add({payload}, {call, put}) {
      const data = yield call(add, payload);
      return data;
    },
    *findAll({payload}, {call, put}) {
      const data = yield call(findAll);
      yield put({type: 'findAllSuccess', payload: data});
      return data;
    }
  },

  reducers: {
    findAllSuccess(state, action) {
      const articleList = action.payload?.result?.length ? action.payload.result : [];
      const newList = articleList.map((item) => {
        return {
          ...item,
          key: item.id
        }
      });
      return {
        ...state,
        articleList: newList
      }
    },
    changeSelectKy(state, action) {
      const path = action.payload;
      return {
        ...state,
        defaultSelectedKeys: [path]
      }
    },
  },

};
