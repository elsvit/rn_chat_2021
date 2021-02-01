import {IMessage, ListType} from '~/types';
import {uuidV4} from '~/services/utils';

export const STUB_MESSAGES: IMessage[] = [
  // for simplify
  {
    time: 'Sun Jan 30 2021 22:07:28 GMT+0200', // todo change
    message:
      'Need some placeholder text in your code? Type lorem and press Tab. If needed, you can add the text together with a tag: just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 3,
    userType: ListType.People,
    id: uuidV4(),
  },
  {
    time: 'Sun Jan 30 2021 22:07:38 GMT+0200', // todo change
    message:
      'Need some placeholder text in your code? Type lorem and press Tab. If needed, you can add the text together with a tag: just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 3,
    userType: ListType.People,
    id: uuidV4(),
  },
  {
    userIdx: 0, // me
    userType: ListType.Me,
    time: 'Sun Jan 31 2021 21:07:48 GMT+0200', // todo change
    message: 'Type lorem and press Tab. ',
    // message: 'Small',
    id: uuidV4(),
  },
  {
    time: 'Sun Jan 31 2021 21:27:58 GMT+0200', // todo change
    message:
      ' If needed, you can add the text together with a tag: just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 3,
    userType: ListType.People,
    id: 'test4',
  },
  {
    time: 'Sun Jan 31 2021 22:00:58 GMT+0200', // todo change
    message:
      ' If needed, you can add the text together with a tag: just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 0,
    userType: ListType.Me,
    id: 'test5',
  },
  {
    time: 'Sun Jan 31 2021 22:03:58 GMT+0200', // todo change
    message:
      ' If needed, you can add the text together with a tag: just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 3,
    userType: ListType.People,
    id: 'test6',
  },
  {
    time: 'Sun Jan 31 2021 22:04:58 GMT+0200', // todo change
    message:
      ' If needed, you can add the text together with a tag: just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 3,
    userType: ListType.People,
    id: 'test7',
  },
  {
    time: 'Sun Jan 31 2021 22:07:58 GMT+0200', // todo change
    message:
      ' just add a tag name and > before lorem',
    // message: 'Small',
    userIdx: 0,
    userType: ListType.Me,
    id: 'test8',
  },
];
