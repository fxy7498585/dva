import request from '../utils/request';

export function login(params) {
  return request('http://localhost:3000/user/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

