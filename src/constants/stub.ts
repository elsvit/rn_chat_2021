import {IMessage, ListType} from '~/types';

export const STUB_MESSAGES: IMessage[] = [
  // for simplify
  {
    time: '01/01/2021', // todo change
    message: 'Message',
    userIdx: 3,
    userType: ListType.People,
    id: 'test1',
  },
  {
    time: '01/01/2021', // todo change
    message: 'Message 2',
    userIdx: 3,
    userType: ListType.People,
    id: 'test2',
  },
  {
    userIdx: 0, // me
    userType: ListType.Me,
    time: '01/01/2021', // todo change
    message: 'Message 3',
    id: 'test3',
  },
  {
    time: '01/01/2021', // todo change
    message: 'Message 4',
    userIdx: 3,
    userType: ListType.People,
    id: 'test4',
  },
];
