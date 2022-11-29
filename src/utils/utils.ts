interface anyObj {
  [propertyName: string]: any;
}
export const isObjectEqual = (objA: anyObj, objB: anyObj): boolean => {
  let item: string;
  for (item in objA) {
    if (!objB.hasOwnProperty(item)) {
      // non-existent
      return false;
    }
    if (objA[item] !== objB[item]) {
      // Unequal
      return false;
    }
  }
  return true;
};
