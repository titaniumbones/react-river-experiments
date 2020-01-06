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
import firebase, {journalRef, providers} from '../firebase'
import 'firebase/auth';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
import {store} from '../store.js'
import {compareJournals} from '../utils/utils.js'

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
   uid
 } : WrappedComponentProps) {
   const dispatch = useDispatch();
   //const user = useSelector(state => state.user);

   async function mySignIn () {
     signInWithGoogle().then( (result) => {
       // console.log('STOREATSIGNIN', store.getState())
       const newId = result.user?.uid;
       
       newId && dispatch({type: 'CREATE_USER_SUCCESS', payload: newId})
       journalRef
         .child(newId)
         .on('value', (snapshot) => {
           compareJournals(store.getState().journal, snapshot.val())
         })
     })
   }

   async function mySignOut () {
     signOut()
     dispatch({type: 'LOGOUT'});
     
   }
   useEffect (() => {
     console.log('GOTUSERID', user && user.uid)
     let dbEntries;
     if (user) {dbEntries = journalRef
           .child(user.uid).on('value',
                               (snapshot) =>console.log('JOURNALREF', snapshot.val()))}
     // user ?
     //   dispatch({type: 'CREATE_USER_SUCCESS', payload: user.uid}) :
     //   dispatch({type: 'LOGOUT'});
     // user &&
     //   journalRef.child(user.uid).on('value',
     //                                 (snapshot) =>console.log('JOURNALREF', snapshot.val()))
   })

  return (
    <>
    {
      user
        ? <a href="#">Hello, {user.displayName}</a>
      : <button onClick={mySignIn}>Sign in with Google</button>
      }
    {
      user && 
        <button className="bg-dark text-light" onClick={mySignOut}>Sign out</button>
    }
    </>)
  
}

export default withFirebaseAuth({
  providers: providers,
  firebaseAppAuth: firebase.auth(),
})(FbLogin)
