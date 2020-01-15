import request from '../utils/request';

export function add(params) {
  return request('https://localhost:3000/article/add', {
    method: 'POST',
    data: {
      ...params
    }
  });
}

export function findAll() {
  return request('https://localhost:3000/article/find', {
    method: 'GET',
  });
}

export function update(params) {
  return request('https://localhost:3000/article/update', {
    method: 'post',
    data: {
      ...params
    }
  });
}

export function deleted(params) {
  return request('https://localhost:3000/article/delete', {
    method: 'post',
    data: {
      ...params
    }
  });
}