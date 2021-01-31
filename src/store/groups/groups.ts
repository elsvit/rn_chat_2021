import {Reducer} from 'redux';
import {put, takeEvery} from 'redux-saga/effects';

import {IGroup, IGroupRaw, IResponse} from '~/types';
import {swapi} from '~/store';
import {compareByProp} from '~/services/utils';
import {setError, setLoaded, setLoading} from '../common';

// Actions
export enum GroupsActions {
  GROUPS_GET = 'groups/GET',
  GROUPS_GET_SUCCESS = 'groups/GET_SUCCESS',
  GROUPS_GET_BY_IDX = 'groups/GET_BY_IDX',
  GROUPS_SET_SELECTED = 'groups/GROUPS_SET_SELECTED',
  GROUPS_RESET = 'groups/RESET',
}

export type GroupsLoadableT =
  | typeof GroupsActions.GROUPS_GET
  | typeof GroupsActions.GROUPS_GET_BY_IDX;

export interface IGroupGetAction {
  type: typeof GroupsActions.GROUPS_GET;
  payload?: {page: number} & Record<string, string | number>;
}

export interface IGroupGetSuccessAction {
  type: typeof GroupsActions.GROUPS_GET_SUCCESS;
  payload: IResponse<IGroup> & {page: number | null};
}

export interface IGroupGetByIdxAction {
  type: typeof GroupsActions.GROUPS_GET_BY_IDX;
  payload: number;
}

export interface IGroupSetSelectedAction {
  type: typeof GroupsActions.GROUPS_SET_SELECTED;
  payload: IGroup | null;
}

export interface IResetGroupsAction {
  type: typeof GroupsActions.GROUPS_RESET;
}

type GroupsActionsT =
  | IGroupGetAction
  | IGroupGetSuccessAction
  | IGroupGetByIdxAction
  | IGroupSetSelectedAction
  | IResetGroupsAction;

export const getGroupsAction = (
  payload?: {page: number} & Record<string, string | number>,
): IGroupGetAction => ({
  type: GroupsActions.GROUPS_GET,
  payload,
});

export const getGroupsSuccessAction = (
  payload: IResponse<IGroup> & {page: number | null},
): IGroupGetSuccessAction => ({
  type: GroupsActions.GROUPS_GET_SUCCESS,
  payload,
});

export const getGroupsByIdxAction = (payload: number): IGroupGetByIdxAction => ({
  type: GroupsActions.GROUPS_GET_BY_IDX,
  payload,
});

export const setSelectedGroupAction = (payload: IGroup | null): IGroupSetSelectedAction => ({
  type: GroupsActions.GROUPS_SET_SELECTED,
  payload,
});

export const resetGroupsAction = (): IResetGroupsAction => ({
  type: GroupsActions.GROUPS_RESET,
});

//Reducer
export interface IGroupState {
  page: number | null;
  count: number;
  next: string | null;
  previous: string | null;
  list: IGroup[];
  selected: IGroup | null;
}

export type GroupsStateT = Readonly<IGroupState>;

const initialState: IGroupState = {
  page: null,
  count: 0,
  next: null,
  previous: null,
  list: [],
  selected: null,
};

const reducer: Reducer<GroupsStateT> = (
  state: IGroupState = initialState,
  action: GroupsActionsT,
) => {
  switch (action.type) {
    case GroupsActions.GROUPS_GET_SUCCESS: {
      const {count, results, ...rest} = action.payload;
      const length = state.list.length;
      const newList: IGroup[] = results.map((val, idx) => ({...val, idx: length + idx}));
      const list: IGroup[] = [...state.list, ...newList].sort((a, b) =>
        compareByProp(a, b, 'name'),
      );
      return {
        ...state,
        count: state.count + count,
        list,
        ...rest,
      };
    }

    case GroupsActions.GROUPS_SET_SELECTED: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case GroupsActions.GROUPS_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

function* sagaGetGroups({payload}: IGroupGetAction) {
  const actionType = GroupsActions.GROUPS_GET;
  try {
    yield put(setLoading({actionType}));
    const res: IResponse<IGroup> = yield swapi.planetsApi.getPlanets(payload);
    if (res) {
      yield put(getGroupsSuccessAction({...res, page: payload?.page || null}));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

function* sagaSetSelectedGroups({payload}: IGroupGetByIdxAction) {
  const actionType = GroupsActions.GROUPS_GET_BY_IDX;
  try {
    yield put(setLoading({actionType}));
    const res: IGroupRaw = yield swapi.planetsApi.getPlanetByIdx(payload);
    if (res) {
      yield put(setSelectedGroupAction({...res, idx: payload}));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

export function* saga(): Generator {
  yield takeEvery(GroupsActions.GROUPS_GET, sagaGetGroups);
  yield takeEvery(GroupsActions.GROUPS_GET_BY_IDX, sagaSetSelectedGroups);
}
