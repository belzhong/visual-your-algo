import { RESIZE } from './panelTypes';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight
};

const panelReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE: {
      return {
        ...state,
        width: action.width,
        height: action.height
      };
    }
    default: return state;
  }
}

export default panelReducer;
