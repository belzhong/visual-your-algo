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
        message.success(`${info.file.name} file uploaded successfully`);
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
  const progressWidth = useSelector(state => state.control.progressWidth);
  const speedWidth = useSelector(state => state.control.speedWidth);

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
    <footer>
      <div id='control-upload-step'style={{float: 'left'}}>
        <Upload {...config}>
          <Button icon={<UploadOutlined />}>上传代码</Button>
        </Upload>
        <Button
          style={{marginLeft: 3}}
          type="primary"
          icon={<StepBackwardOutlined />}
          onClick={ () => prev(pointer, dispatch, 1) }
          disabled={playing}
        />
        <Button
          style={{marginLeft: 3}}
          type="primary"
          icon={playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={ () => dispatch(playing ? stop() : start()) }/>
        <Button
          style={{marginLeft: 3}}
          type="primary"
          icon={<StepForwardOutlined />}
          onClick={ () => next(snapshots, pointer, dispatch, 1) }
          disabled={playing}
        />
        <a 
          style={{marginLeft: 3, marginRight: 3}}
          target={'_blank'}
          rel={'noreferrer'}
          href="https://github.com/belzhong/visual-your-algo">使用说明</a>
      </div>
      <div
        style={{float: 'left', width: speedWidth, marginRight: 5}} >
        <Slider 
          onChange={value => {
            dispatch(setSpeed(value));
          }} 
          defaultValue={speed} 
          min={30} 
          max={300} 
          value={speed} />
      </div>
      <div
        style={{float: 'left', width: progressWidth}} >
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
