import { 
  PREVIOUS_SNAPSHOT,
  NEXT_SNAPSHOT,
  START,
  STOP,
  SET_SNAPSHOTS,
  SET_HANDLER,
  SET_SPEED,
  SET_PANEL_WIDTH_PARAMETERS
} from './controlTypes';

const initialState = {
  pointer: -1,
  snapshots: [],
  playerHandler: null,
  speed: 30,
  playing: false,
  handler: null,
  progressWidth: 0,
  speedWidth: 0
};

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PANEL_WIDTH_PARAMETERS: {
      const {panelWidth, uploadPart} = action;
      console.log('action is', action);
      const width = (panelWidth - uploadPart) / 2 - 3;
      return {
        ...state,
        progressWidth: width,
        speedWidth: width
      }
    }
    case SET_SPEED: {
      return {
        ...state,
        speed: action.speed
      };
    }
    case PREVIOUS_SNAPSHOT: {
      const newPointer = state.pointer - action.number;
      return {
        ...state,
        pointer: newPointer < 0 ? 0 : newPointer
      };
    }
    case NEXT_SNAPSHOT: {
      const newPointer = state.pointer + action.number;
      return {
        ...state,
        pointer: newPointer < state.snapshots.length ? newPointer : state.snapshots.length - 1
      };
    }
    case STOP: {
      if (state.playerHandler !== null) {
        clearTimeout(state.playerHandler);
      }
      return {
        ...state,
        playerHandler: null,
        playing: false
      };
    }
    case START: {
      return {
        ...state,
        playerHandler: null,
        playing: true
      };
    }
    case SET_SNAPSHOTS: {
      return {
        ...state,
        snapshots: action.snapshots,
        pointer: 0
      }
    }
    case SET_HANDLER: {
      return {
        ...state,
        handler: action.handler
      }
    }
    default: return state;
  }
}

export default controlReducer;
