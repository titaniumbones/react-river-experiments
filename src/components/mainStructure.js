import React  from 'react';
import Rivers from  '../rivers.js';
import WaterTabs from './watertabs.js'
import WaveTabs from './WaveTabs.js'
import MarkdownFromUrl from './markdownFromUrl.js'
import Journal from './journal.js'
import FbLogin from './fbLogin.js'
import LevelCounter from './levelCounter.jsx'
import {
  Router,
  Link
} from "@reach/router";
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
import firebase, {providers} from '../firebase'
import 'firebase/auth';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth';


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
      <Link to="counter">Counter!</Link>
      <Link to="about">About</Link>
      <div className="nav-right">
        <FbLogin />
      </div>
      </nav>

    
      <Router>
      <WaterTabs path="rivers/*" rivers={Rivers}/>
      <WaveTabs path="waves/*" />
      <Journal path="journal" rivers={Rivers}/>
      <LevelCounter path="counter"/>
      <MarkdownFromUrl path="about" url="descriptions/about.md"/>
      </Router>
      </>
)
}

export default withFirebaseAuth({
  providers: providers,
  firebaseAppAuth: firebase.auth(),
})(MainStructure)
