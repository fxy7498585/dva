import request from '../utils/request';


export function getAccessToken() {
  return request('http://localhost:3000/subscribe-message/send', {
    method: 'GET'
  })
}

export function getCategory(token) {
  return request(`http://localhost:3000/subscribe-message/getcategory`, {
    method: 'GET',
    params: {
      access_token: token
    }
  })
}

export function getTemplateList(token) {
  return request('http://localhost:3000/subscribe-message/tmplist', {
    method: 'GET',
    params: {
      access_token: token
    }
  })
}

export function getPubTemplateKeyWordsById(params) {
  return request('http://localhost:3000/subscribe-message/keywords', {
    method: 'GET',
    params: {
      ...params
    }
  })
}

export function getPubTemplateTitleList(params) {
  return request('http://localhost:3000/subscribe-message/titlelist', {
    method: 'GET',
    params: {
      ...params
    }
  });
}

