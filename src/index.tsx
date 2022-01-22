import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import App from './App';
import store from './redux/NotificationsStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
