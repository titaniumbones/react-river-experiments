import '../node_modules/chartist/dist/chartist.min.css'
import '../node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'
import './chota.css'
import './index.css';
import './rivers.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import {
//   Router,
//   Link
// } from "@reach/router";
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import mainReducer from './reducers/mainReducer.js'
// import { combineReducers } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// TODO: switch from localStorage to indexedDB
// import { PersistGate } from 'redux-persist/integration/react'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import firebase from 'firebase/app'
import 'firebase/auth'
// import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
// import thunk from 'redux-thunk'; // no changes here 😀
// import firebase, {dbRef, providers} from './firebase'
// import 'firebase/auth';
// import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
import App from './App.js'




ReactDOM.render(
  <App />,
  document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
