import '../node_modules/chartist/dist/chartist.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
// import '../node_modules/chota/dist/chota.css'
import './index.css';
import './rivers.css';
import Rivers from  './rivers.js';
import * as serviceWorker from './serviceWorker';
import WaterTabs from './components/watertabs.js'
import WaveTabs from './components/WaveTabs.js'
import MarkdownFromUrl from './components/markdownFromUrl.js'
import Journal from './components/journal.js'
import 'react-tabs/style/react-tabs.css';
import {
  Router,
  Link
} from "@reach/router";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/mainReducer.js'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// TODO: switch from localStorage to indexedDB
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'



// // Add firebase to reducers
// const rootReducer = combineReducers({
//   firebase: firebaseReducer
//   // firestore: firestoreReducer // <- needed if using firestore
// })

const persistConfig = {
  key: 'root',
  storage,
}



const persistedReducer = persistReducer(persistConfig, mainReducer)

const store = createStore(persistedReducer,
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store)
// const Chartist = require('chartist')

function App(props) {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <nav className="nav bg-light">
          <Link className="brand" to="">S.O. Shreds</Link>
          <Link to="rivers">Rivers: Current Levels</Link>
          <Link to="waves">Waves_Current Conditions</Link>
          <Link to="journal">Journal</Link>
          <Link to="about">About</Link>
        </nav>

        <Router>
          <WaterTabs path="rivers" rivers={Rivers}/>
          <WaveTabs path="waves" />
          <Journal path="journal" rivers={Rivers}/>
          <MarkdownFromUrl path="about" url="descriptions/about.md"/>
    </Router>
    </PersistGate>
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
