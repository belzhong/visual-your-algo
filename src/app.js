import 'antd/dist/antd.css';
import Window from './window/window';
import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Window />
      </div>
    </Provider>
  );
}

export default App;
