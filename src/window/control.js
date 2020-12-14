import React, { useEffect } from 'react';
import { Upload, message, Button,   Slider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  previousSnapshot, 
  nextSnapshot, 
  stop, 
  start, 
  setSnapshots,
  setHandler,
  setSpeed
} from '../redux';
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined 
} from '@ant-design/icons';

function Control(props) {
  const config = {
    name: 'code.js',
    action: 'http://139.224.73.43/vm',
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
        const response = info.file.response;
        dispatch(setSnapshots(response));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const playing = useSelector(state => state.control.playing);
  const speed = useSelector(state => state.control.speed);
  const pointer = useSelector(state => state.control.pointer);
  const snapshots = useSelector(state => state.control.snapshots);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playing) {
      const handler = setTimeout(() => {
        next(snapshots, pointer, dispatch, 1);
      }, (330 - speed) * 1000 / snapshots.length);
      dispatch(setHandler(handler));
    }
  }, [pointer, playing]);

  return (
    <footer id='control'>
      <Upload {...config}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button
          type="primary"
          icon={<StepBackwardOutlined />}
          onClick={ () => prev(pointer, dispatch, 1) }
          disabled={playing}
        />
      <Button
          type="primary"
          icon={playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={ () => dispatch(playing ? stop() : start()) }/>
      <Button
          type="primary"
          icon={<StepForwardOutlined />}
          onClick={ () => next(snapshots, pointer, dispatch, 1) }
          disabled={playing}
      />
      <div>
        <Slider 
          onChange={value => {
            const diff = pointer - value;
            if (diff < 0) {
              next(snapshots, pointer, dispatch, -diff);
            } else {
              prev(pointer, dispatch, diff);
            }
          }} 
          defaultValue={0} 
          min={0} 
          max={snapshots.length - 1} 
          value={pointer} />
        <Slider 
          onChange={value => {
            dispatch(setSpeed(value));
          }} 
          defaultValue={speed} 
          min={30} 
          max={300} 
          value={speed} />
      </div>
    </footer>
  );
}

function next(snapshots, pointer, dispatch, number=1) {
  dispatch(nextSnapshot(number));
  if (snapshots.length <= pointer + number) {
    dispatch(stop());
  }
}

function prev(pointer, dispatch, number=1) {
  dispatch(previousSnapshot(number));
  if (pointer - number < 0) {
    dispatch(stop());
  }
}

export default Control;
