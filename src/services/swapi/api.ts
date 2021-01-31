import BaseApi from './BaseApi';
import PeopleApi from './PeopleApi';
import PlanetsApi from './PlanetsApi';

export interface ISwapiServices {
  baseApi: BaseApi;
  peopleApi: PeopleApi;
  planetsApi: PlanetsApi;
}

export function initSwapiServices(baseURL: string): ISwapiServices {
  const baseApi = new BaseApi(baseURL);
  const peopleApi = new PeopleApi(baseApi);
  const planetsApi = new PlanetsApi(baseApi);

  return {
    baseApi,
    peopleApi,
    planetsApi,
  };
}
