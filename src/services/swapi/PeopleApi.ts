import BaseApi from './BaseApi';

export default class PeopleApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getPeople = (value?: Record<string, string | number>) =>
    this.baseApi.get('people/', value);

  public getPeopleByIdx = (idx: number) => this.baseApi.get(`people/${idx}`);
}
