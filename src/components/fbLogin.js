import React, {useEffect} from 'react';

import { useDispatch } from 'react-redux';
// TODO: switch from localStorage to indexedDB
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
import firebase, {journalRef, providers} from '../firebase'
import 'firebase/auth';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';
import {store} from '../store.js'
import {compareJournals} from '../utils/utils.js'


function LoginButton (props) {
  const dispatch = useDispatch();
  async function mySignIn () {
    props.providerFn().then( (result) => {
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
  return (
    <button onClick={mySignIn}>Sign in with {props.providerName}</button>
  )
}

// I'll need these props later on I guess, in an abstracted login form ocmponent
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

   async function mySignOut () {
     signOut()
     dispatch({type: 'LOGOUT'});
     
   }
   // const providers = [[signInWithGoogle, "Google"],[signInWithEmailAndPassword, "Email"] ]
   
   const providers = [[signInWithGoogle, "Google"]]
   // useEffect (() => {
   //   console.log('GOTUSERID', user && user.uid)
   // })

  return (
    
    <>
      { user ?
        <>
          <button className="clear dark" href="#">Hello, {user.displayName}</button>
          <button className="bg-dark text-light" onClick={mySignOut}>Sign out</button>
        </>
        : providers.map( ([p, n]) => <LoginButton key={n} providerFn={p} providerName={n}/>) 
      }
    </>
    )
 }

export default withFirebaseAuth({
  providers: providers,
  firebaseAppAuth: firebase.auth(),
})(FbLogin)
