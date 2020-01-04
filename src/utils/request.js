// import fetch from 'dva/fetch';



// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// /**
//  * Requests a URL, returning a promise.
//  *
//  * @param  {string} url       The URL we want to request
//  * @param  {object} [options] The options we want to pass to "fetch"
//  * @return {object}           An object containing either "data" or "err"
//  */
// const headers = {
//   'content-type': 'application/json',
// };

// export default function request(url, options) {
//   console.log(url)
//   return fetch(url, {headers, ...options})
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => {
//       return data
//     })
//     .catch(err => ({ err }));
// }

import axios from 'axios';
// import { message } from 'antd';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('response.data', response.data);
    // if ( response.data.errcode) {
    //   message.error(response.data.errcode, response.data.errmsg);
    //   return;
    // }
    return response.data;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
export default function request(url, options) {
  return axios({
    url,
    ...options
  })
  .then(checkStatus)
  .then(data => {
    return data;
  })
  .catch(err =>  {
    console.log('err', err);
    throw new Error(err)
  })
}
