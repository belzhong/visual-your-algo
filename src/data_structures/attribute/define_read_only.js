export function defineReadOnly(obj, attribute, value) {
  Object.defineProperty(obj, attribute, {
    writable: false,
    value
  });
}
