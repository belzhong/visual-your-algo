import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Display from './display';
import { 
  resize
} from '../redux';

function fitScreen(dispatch) {
  const control = document.getElementById('control');
  const offsetHeight = control === null ? 0 : control.offsetHeight;
  dispatch(resize(window.innerWidth - 20, window.innerHeight - offsetHeight - 20));
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
