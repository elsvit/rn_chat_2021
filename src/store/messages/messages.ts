import {Reducer} from 'redux';
import {put, takeEvery} from 'redux-saga/effects';

import {IMessage, IResponse, ListType, ITypeIdx} from '~/types';
import {swapi} from '~/store';
import {STUB_MESSAGES} from '~/constants/stub';
import {setError, setLoaded, setLoading} from '../common';

// Actions
export enum MessagesActions {
  MESSAGE_SET_CURRENT_USER = 'messages/SET_CURRENT_USER',
  MESSAGE_SEND_BY_ID = 'messages/SEND_BY_ID', // todo it needs additional success action (=accepted by websocket)
  MESSAGES_GET_BY_ID = 'messages/GET_BY_ID',
  SET_CURRENT_MESSAGES = 'messages/SET_CURRENT_MESSAGES',
  ADD_CURRENT_MESSAGES = 'messages/ADD_CURRENT_MESSAGES',
  MESSAGES_RESET = 'messages/RESET',
}

export type MessagesLoadableT =
  | typeof MessagesActions.MESSAGE_SEND_BY_ID
  | typeof MessagesActions.MESSAGES_GET_BY_ID;

export interface IMessageSetCurrentUserAction {
  type: typeof MessagesActions.MESSAGE_SET_CURRENT_USER;
  payload: ITypeIdx;
}

export interface IMessageSendByIdAction {
  type: typeof MessagesActions.MESSAGE_SEND_BY_ID;
  payload: IMessage;
}

export interface IMessagesGetByIdAction {
  type: typeof MessagesActions.MESSAGES_GET_BY_ID;
  payload: IMessage[];
}

export interface ISetCurrentMessagesAction {
  type: typeof MessagesActions.SET_CURRENT_MESSAGES;
  payload: IMessage[] | null;
}

export interface IAddCurrentMessagesAction {
  type: typeof MessagesActions.ADD_CURRENT_MESSAGES;
  payload: IMessage;
}

export interface IResetMessagesAction {
  type: typeof MessagesActions.MESSAGES_RESET;
}

type MessagesActionsT =
  | IMessageSetCurrentUserAction
  | IMessageSendByIdAction
  | IMessagesGetByIdAction
  | ISetCurrentMessagesAction
  | IAddCurrentMessagesAction
  | IResetMessagesAction;

export const setCurrentUserAction = (payload: ITypeIdx): IMessageSetCurrentUserAction => ({
  type: MessagesActions.MESSAGE_SET_CURRENT_USER,
  payload,
});

export const sendMessageByIdAction = (payload: IMessage): IMessageSendByIdAction => ({
  type: MessagesActions.MESSAGE_SEND_BY_ID,
  payload,
});

export const getMessagesByIdAction = (payload: IMessage[]): IMessagesGetByIdAction => ({
  type: MessagesActions.MESSAGES_GET_BY_ID,
  payload,
});

export const setCurrentMessagesAction = (
  payload: IMessage[] | null,
): ISetCurrentMessagesAction => ({
  type: MessagesActions.SET_CURRENT_MESSAGES,
  payload,
});

export const addCurrentMessagesAction = (payload: IMessage): IAddCurrentMessagesAction => ({
  type: MessagesActions.ADD_CURRENT_MESSAGES,
  payload,
});

export const resetMessagesAction = (): IResetMessagesAction => ({
  type: MessagesActions.MESSAGES_RESET,
});

//Reducer
export interface IMessagesState {
  currentType: ListType | null;
  currentIdx: number | null; // in real in will be string id
  list: IMessage[];
}

export type MessagesStateT = Readonly<IMessagesState>;

const initialState: IMessagesState = {
  currentType: null,
  currentIdx: null,
  list: [],
};

const reducer: Reducer<MessagesStateT> = (
  state: IMessagesState = initialState,
  action: MessagesActionsT,
) => {
  switch (action.type) {
    case MessagesActions.MESSAGE_SET_CURRENT_USER: {
      return {
        ...state,
        currentType: action.payload.type,
        currentIdx: action.payload.idx,
      };
    }

    case MessagesActions.SET_CURRENT_MESSAGES: {
      return {
        ...state,
        list: action.payload || [],
      };
    }

    case MessagesActions.ADD_CURRENT_MESSAGES: {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }

    case MessagesActions.MESSAGES_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

function* sagaGetMessagesById({payload}: IMessagesGetByIdAction) {
  const actionType = MessagesActions.MESSAGES_GET_BY_ID;
  try {
    yield put(setLoading({actionType}));
    // const res: IResponse<IMessage[]> = yield swapi.messagesApi.getMessages(payload); // todo
    const res = STUB_MESSAGES; // stub
    if (res) {
      yield put(setCurrentMessagesAction(res));
    }
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

function* sagaSendMessage({payload}: IMessageSendByIdAction) {
  const actionType = MessagesActions.MESSAGE_SEND_BY_ID;
  try {
    yield put(setLoading({actionType}));
    // yield wss.messagesApi.sendMessage(payload) // websocket
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield put(setError({actionType, error}));
  }
}

export function* saga(): Generator {
  yield takeEvery(MessagesActions.MESSAGES_GET_BY_ID, sagaGetMessagesById);
  yield takeEvery(MessagesActions.MESSAGE_SEND_BY_ID, sagaSendMessage);
}
