import { combineReducers } from 'redux';
import controlReducer from './control/controlReducers';
import panelReducer from './panel/panelReducers';

const rootReducer = combineReducers({
  control: controlReducer,
  panel: panelReducer
})

export default rootReducer;
