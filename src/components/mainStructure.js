import React, {Component, useEffect} from 'react';
import Rivers from  '../rivers.js';
import WaterTabs from './watertabs.js'
import WaveTabs from './WaveTabs.js'
import MarkdownFromUrl from './markdownFromUrl.js'
import Journal from './journal.js'
import FbLogin from './fbLogin.js'
import {
  Router,
  Link
} from "@reach/router";
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from '../reducers/mainReducer.js'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// TODO: switch from localStorage to indexedDB
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
import thunk from 'redux-thunk'; // no changes here 😀
import firebase, {dbRef, providers} from '../firebase'
import 'firebase/auth';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
const persistConfig = {
  key: 'root',
  storage,
}


function MainStructure ({
  /** These props are provided by withFirebaseAuth HOC */
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
  signInAnonymously,
  signOut,
  setError,
  user,
  error,
  loading,
} : WrappedComponentProps) {


  return (
    <>
      <nav className="nav bg-light">
      <Link className="brand" to="">S.O. Shreds</Link>
      <Link to="rivers">Rivers: Current</Link>
      <Link to="waves">Waves: Current</Link>
      <Link to="journal">Journal</Link>
      <Link to="about">About</Link>
      <div className="nav-right">
        <FbLogin />
      </div>
      </nav>

    
      <Router>
      <WaterTabs path="rivers/*" rivers={Rivers}/>
      <WaveTabs path="waves/*" />
      <Journal path="journal" rivers={Rivers}/>
      <MarkdownFromUrl path="about" url="descriptions/about.md"/>
      </Router>
      </>
)
}

export default withFirebaseAuth({
  providers: providers,
  firebaseAppAuth: firebase.auth(),
})(MainStructure)
