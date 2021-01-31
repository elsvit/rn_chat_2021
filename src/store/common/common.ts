import {Action, Reducer} from 'redux';

import {IError, IErrors, ErrorCodeType, IBoolDict} from '~/types';

import {PeopleLoadableT} from '../people';
import {GroupsLoadableT} from '../groups';
import {MessagesLoadableT} from '../messages';

// Actions
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';
export const ERROR = 'ERROR';
export const RESET = 'common/RESET';
export const RESET_ALL = 'common/RESET_ALL';

export type ActionApiT = PeopleLoadableT | GroupsLoadableT | MessagesLoadableT;

export interface IActionTypePayload {
  actionType: ActionApiT;
}

export interface IErrorPayload {
  actionType: ActionApiT;
  error?: IError;
  message?: string;
}

export interface ILoadingAction extends Action<typeof LOADING> {
  payload: IActionTypePayload;
}

export interface ILoadedAction extends Action<typeof LOADED> {
  payload: IActionTypePayload;
}

export interface IErrorAction extends Action<typeof ERROR> {
  payload: IErrorPayload;
}

export interface IResetAction extends Action<typeof RESET> {
  payload: IActionTypePayload;
}

export interface IResetAllAction extends Action<typeof RESET_ALL> {}

type CommonActionsT =
  | ILoadingAction
  | ILoadedAction
  | IErrorAction
  | IResetAction
  | IResetAllAction;

export const setLoading = ({actionType}: IActionTypePayload): ILoadingAction => ({
  payload: {
    actionType,
  },
  type: LOADING,
});

export const setLoaded = ({actionType}: IActionTypePayload): ILoadedAction => ({
  payload: {
    actionType,
  },
  type: LOADED,
});

export const setError = ({actionType, error: errorProp}: IErrorPayload): IErrorAction => {
  let error: IError = {
    message: String(errorProp) || 'Error',
    code: ErrorCodeType.UNKNOWN,
  };
  if (typeof errorProp !== 'string' && errorProp) {
    error = {
      code: errorProp.code,
      message: errorProp.message || 'Error',
    };
    if (errorProp.errors) {
      error.errors = errorProp.errors;
    }
  }
  return {
    payload: {
      actionType,
      error,
    },
    type: ERROR,
  };
};

export const resetCommonByTypeAction = ({actionType}: IActionTypePayload): IResetAction => ({
  payload: {
    actionType,
  },
  type: RESET,
});

export const resetAllCommonAction = (): IResetAllAction => ({
  type: RESET_ALL,
});

//Reducer
export interface ICommonState {
  error: IErrors;
  loaded: IBoolDict;
  loading: IBoolDict;
}

export type CommonStateT = Readonly<ICommonState>;

const initialState: CommonStateT = {
  error: {},
  loaded: {},
  loading: {},
};

const reducer: Reducer<CommonStateT> = (
  state: ICommonState = initialState,
  action: CommonActionsT,
) => {
  switch (action.type) {
    case LOADING:
      return {
        error: {...state.error, [action.payload.actionType]: null},
        loaded: {...state.loaded, [action.payload.actionType]: false},
        loading: {...state.loading, [action.payload.actionType]: true},
      };

    case LOADED:
      return {
        ...state,
        loaded: {...state.loaded, [action.payload.actionType]: true},
        loading: {...state.loading, [action.payload.actionType]: false},
      };

    case ERROR: {
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.actionType]: action.payload.error,
        },
        loaded: {...state.loaded, [action.payload.actionType]: false},
        loading: {...state.loading, [action.payload.actionType]: false},
      };
    }

    case RESET:
      return {
        ...state,
        error: {...state.error, [action.payload.actionType]: null},
        loaded: {...state.loaded, [action.payload.actionType]: null},
        loading: {...state.loading, [action.payload.actionType]: null},
      };

    case RESET_ALL:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
