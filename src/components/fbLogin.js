import React, {Component, useEffect} from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from '../reducers/mainReducer.js'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// TODO: switch from localStorage to indexedDB
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
import thunk from 'redux-thunk'; // no changes here 😀
import firebase, {dbRef, providers} from '../firebase'
import 'firebase/auth';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';


 function FbLogin ({
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
   const dispatch = useDispatch();
   //const user = useSelector(state => state.user);

   useEffect (() => {
     console.log('GOTUSERID', user && user.uid)
     user ?
       dispatch({type: 'CREATE_USER_SUCCESS', payload: user.uid}) :
       dispatch({type: 'LOGOUT'})       
   })

  return (
    <>
    {
      user
        ? <a href="#">Hello, {user.displayName}</a>
      : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    {
      user && 
        <button className="bg-dark text-light" onClick={signOut}>Sign out</button>
    }
    </>)
  
}

export default withFirebaseAuth({
  providers: providers,
  firebaseAppAuth: firebase.auth(),
})(FbLogin)
