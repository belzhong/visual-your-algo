import { defineReadOnly } from './define_read_only.js';

export function defineVuaAttributes(obj, attributes) {
  const table = new Map(attributes);
  for (const [key, value] of table.entries()) {
    defineReadOnly(obj, key, value);
  }
}
