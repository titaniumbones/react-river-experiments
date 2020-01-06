import '../node_modules/chartist/dist/chartist.min.css'
import '../node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'
import './chota.css'
import './index.css';
import './rivers.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App.js'




ReactDOM.render(
  <App />,
  document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
