import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import common, {CommonStateT} from './common';
import people, {PeopleStateT} from './people';
import groups, {GroupsStateT} from './groups';

import sagas from './sagas';

import {initSwapiServices} from '~/services/swapi';
import {swapiUrl} from '~/constants/config';

export interface IAppState {
  common: CommonStateT;
  people: PeopleStateT;
  groups: GroupsStateT;
}

export const swapi = initSwapiServices(swapiUrl);

const reducers = combineReducers<IAppState>({
  common,
  people,
  groups,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export default store;
