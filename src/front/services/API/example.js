// @flow

// #region imports
import axios from 'axios';
import {defaultOptions, getLocationOrigin, getMethod, jsonHeader} from './fetchTools';
// #endregion

export const getSomething = (
  endpoint = 'api/getSomethingByDefault',
): Promise<any> => {
  const method = getMethod.method;
  const headers = jsonHeader;
  const url = `${getLocationOrigin()}/${endpoint}`;
  const options = { ...defaultOptions };

  return axios
    .request({
      method,
      url,
      withCredentials: true,
      ...headers,
      ...options,
    })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const callApi = async (api) => {
  const response = await fetch(api);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
