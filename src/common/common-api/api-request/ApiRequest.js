import axios from 'axios';

/**
 * To make API request (GET,POST,PUT,PATCH,DELETE)
 *
 * @author  Htet Ko Hmue
 * @create
 * Parameter must be object type and must be following format
 */
export const ApiRequest = async (value) => {
  let result;
  const path = process.env.REACT_APP_BACKEND_URL;
  const parameter = {
    baseURL: path,
    method: value.method,
    url: value.url,
    data: value.params,
  };
  await axios(parameter)
    .then(async (response) => {
      // call api response error handler
      if (response.data.status === 'OK') {
        result = { flag: true, response_data: response.data };
      }
      if (response.data.status === 'NG') {
        result = { flag: false, message: response.data.message };
      }
    })
    .catch(async (error) => {
      if (error.response === undefined || error.response === 'undefined') {
        result = { flag: false, message: 'Cannot connect to server' };
      }
      result = {
        flag: false,
        message: 'No internet connection! Please check your internet connection and try again.',
      };
    });
  return result;
};
