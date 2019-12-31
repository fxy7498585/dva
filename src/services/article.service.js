import request from '../utils/request';

export function add(params) {
  return request('http://localhost:3000/article/add', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export function findAll() {
  return request('http://localhost:3000/article/find', {
    method: 'GET',
  });
}

