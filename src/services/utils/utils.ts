export function compareByProp(a: any, b: any, propName: string) {
  if (a && b && propName) {
    if (a[propName] < b[propName]) {
      return -1;
    } else if (a[propName] > b[propName]) {
      return 1;
    }
  }
  return 0;
}
