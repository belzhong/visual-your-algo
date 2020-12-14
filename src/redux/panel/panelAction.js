import { RESIZE } from './panelTypes';

export const resize = (width, height) => {
  return {
    type: RESIZE,
    width,
    height
  };
};
