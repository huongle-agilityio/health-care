/**
 * It returns true if the value is empty, false otherwise
 * @param {object} value - The value to check if it's empty.
 * @returns A function that takes a value of type T and returns a boolean.
 */
export const isEmptyObject = (value: object | null): boolean => {
  if (value) {
    return !Object.keys(value).length;
  }

  return true;
};
