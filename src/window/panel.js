import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Display from './display';
import { 
  resize,
  setPanelWidthParameters
} from '../redux';

function fitScreen(dispatch) {
  const controlPanel = document.getElementById('control-panel');
  const offsetHeight = (controlPanel === null ? 0 : controlPanel.offsetHeight);
  const controlUploadStep = document.getElementById('control-upload-step');
  dispatch(setPanelWidthParameters(controlPanel.offsetWidth, controlUploadStep.offsetWidth));
  dispatch(resize(window.innerWidth, window.innerHeight - offsetHeight - 10));
}

function Panel() {
  const dispatch = useDispatch();

  useEffect(() => {
    fitScreen(dispatch);
    window.addEventListener('resize', function() {
      fitScreen(dispatch);
    });
  }, [dispatch]);

  const snapshots = useSelector(state => state.control.snapshots);
  const pointer = useSelector(state => state.control.pointer);
  const snapshot = snapshots[pointer];
  const width = useSelector(state => state.panel.width);
  const x = 3;
  const y = 3;

  return (
    <>
      {
        <Display 
          snapshot={snapshot}
          width={width}
          x={x}
          y={y}
        />
      }
    </>
  );
}

export default Panel;
