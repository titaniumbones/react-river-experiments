import React, {Component} from 'react';
import Rivers from  './rivers.js';
import WaterTabs from './components/watertabs.js'
import WaveTabs from './components/WaveTabs.js'
import MarkdownFromUrl from './components/markdownFromUrl.js'
import Journal from './components/journal.js'

import {
  Router,
  Link
} from "@reach/router";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from './reducers/mainReducer.js'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// TODO: switch from localStorage to indexedDB
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
import thunk from 'redux-thunk'; // no changes here 😀
import firebase, {dbRef, providers} from './firebase'
import 'firebase/auth';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
import MainStructure from './components/mainStructure.js'
const persistConfig = {
  key: 'root',
  storage,
}



const persistedReducer = persistReducer(persistConfig, mainReducer)

const store = createStore(persistedReducer,
                          compose (applyMiddleware(thunk), 
                                   window.__REDUX_DEVTOOLS_EXTENSION__ ?
                                   window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
const persistor = persistStore(store)

// const Chartist = require('chartist')



class AppAsClass extends Component {

  constructor(props) {
    super(props)
    // const {
    //   /** These props are provided by withFirebaseAuth HOC */
    //   signInWithEmailAndPassword,
    //   createUserWithEmailAndPassword,
    //   signInWithGoogle,
    //   signInWithFacebook,
    //   signInWithGithub,
    //   signInWithTwitter,
    //   signInAnonymously,
    //   signOut,
    //   setError,
    //   user,
    //   error,
    //   loading
    // } = this.props
  }

  handleSignin =  async (authInfo) => {
    console.log(this.props)
    const result= await this.signInWithGoogle()
    console.log('SIGNINRESULT', result)
    // todo: dispatch
  }
  handleSignout = async (signOutFn, authInfo) => {
    const result= await signOutFn()
    console.log('SIGNOUTRESULT', result)
    // todo: dispatch
  }

  render() {
    return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <nav className="nav bg-light">
          <Link className="brand" to="">S.O. Shreds</Link>
          <Link to="rivers">Rivers: Current</Link>
      <Link to="waves">Waves: Current</Link>
          <Link to="journal">Journal</Link>
          <Link to="about">About</Link>
          <div className="nav-right">
          {
            this.user
              ? <a href="#">Hello, {this.user.displayName}</a>
            : <button onClick={this.handleSignin}>Sign in with Google</button>
          }
            {
              this.user && 
                <button class="bg-dark text-light" onClick={this.handleSignout(this.signOut)}>Sign out</button>
            }
          </div>
        </nav>

        
        <Router>
          <WaterTabs path="rivers/*" rivers={Rivers}/>
          <WaveTabs path="waves/*" />
          <Journal path="journal" rivers={Rivers}/>
          <MarkdownFromUrl path="about" url="descriptions/about.md"/>
        </Router>
        
      </PersistGate>
    </Provider>
  )}
}


export default function App () {
  //console.log(signInWithGoogle)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <MainStructure/>
      </PersistGate>
    </Provider>
  )
}


