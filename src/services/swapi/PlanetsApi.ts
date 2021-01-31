import BaseApi from './BaseApi';

export default class PlanetsApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getPlanets = (value?: Record<string, string | number>) =>
    this.baseApi.get('planets/', value);

  public getPlanetByIdx = (idx: number) => this.baseApi.get(`planets/${idx}`);
}
