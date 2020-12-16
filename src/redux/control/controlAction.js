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

export const setPanelWidthParameters = (panelWidth, uploadPart) => {
  return {
    type: SET_PANEL_WIDTH_PARAMETERS,
    panelWidth,
    uploadPart
  };
}

export const setSpeed = (value) => {
  return {
    type: SET_SPEED,
    speed: value
  };
}

export const setHandler = (handler) => {
  return {
    type: SET_HANDLER,
    handler
  };
};

export const setSnapshots = (snapshots) => {
  return {
    type: SET_SNAPSHOTS,
    snapshots
  };
};

export const nextSnapshot = (number = 1) => {
  return {
    type: NEXT_SNAPSHOT,
    number
  };
};

export const previousSnapshot = (number = 1) => {
  return {
    type: PREVIOUS_SNAPSHOT,
    number
  };
};

export const stop = () => {
  return {
    type: STOP
  };
};

export const start = (handler) => {
  return {
    type: START,
    handler
  };
};
