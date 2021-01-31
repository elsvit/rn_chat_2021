import {ListType} from './IBaseEntities';

export interface ITimeMessage {
  time: string;
  message: string;
}

export interface IMessage extends ITimeMessage {
  userIdx: number; // usually id: string
  userType: ListType;
  id: string;
}
