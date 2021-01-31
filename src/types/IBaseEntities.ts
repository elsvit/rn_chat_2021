export interface IResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IBoolDict {
  [key: string]: boolean | null | undefined;
}

export enum ListType {
  People = 'people',
  Groups = 'groups',
  Me = 'Me',
}

export interface ITypeIdx {
  type: ListType;
  idx: number;
}
