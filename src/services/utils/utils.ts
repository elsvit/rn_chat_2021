import moment from 'moment';

export function compareByProp(a: any, b: any, propName: string): number {
  if (a && b && propName) {
    if (a[propName] < b[propName]) {
      return -1;
    } else if (a[propName] > b[propName]) {
      return 1;
    }
  }
  return 0;
}

export function getLocalDate(): string {
  const newDate = new Date();
  const dateStr = moment(newDate).toLocaleString();
  return dateStr;
}

export function uuidV4(): string {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
    // eslint-disable-next-line no-bitwise
    ((rnd) => (c === 'x' ? rnd : (rnd & 0x3) | 0x8).toString(16))((Math.random() * 16) | 0),
  );
  return uuid;
}
