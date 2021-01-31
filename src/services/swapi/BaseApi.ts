import {stringify} from 'query-string';
import axios, {AxiosInstance} from 'axios';
import {swapiUrl} from '~/constants/config';

export default class BaseApi {
  public baseApiURL: string;
  public request: Readonly<AxiosInstance>;

  constructor(baseURL: string = '') {
    this.baseApiURL = `${baseURL}`;
    this.request = axios.create({
      baseURL: swapiUrl,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public get = (url: string, value?: Record<string, string | number>) => {
    let queryPath = `${this.baseApiURL}${url}`;
    if (value != null) {
      queryPath += `?${stringify(value)}`;
    }
    return this.request
      .get(queryPath)
      .then((res) => {
        return res?.data;
      })
      .catch((error) => {
        // todo change approach in real project
        return {message: 'Api Error. Please try later.', errorCode: 'apiError'};
      });
  };
}
