import React from 'react';
import { Provider } from 'react-redux';
// TODO: switch from localStorage to indexedDB
import { PersistGate } from 'redux-persist/integration/react'
// this wass helpful re: thunk + devtools:
// https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
import 'firebase/auth';
import MainStructure from './components/mainStructure.js'
import {store,persistor} from './store.js'

// const Chartist = require('chartist')



// class AppAsClass extends Component {

//   constructor(props) {
//     super(props)
//     // const {
//     //   /** These props are provided by withFirebaseAuth HOC */
//     //   signInWithEmailAndPassword,
//     //   createUserWithEmailAndPassword,
//     //   signInWithGoogle,
//     //   signInWithFacebook,
//     //   signInWithGithub,
//     //   signInWithTwitter,
//     //   signInAnonymously,
//     //   signOut,
//     //   setError,
//     //   user,
//     //   error,
//     //   loading
//     // } = this.props
//   }

//   handleSignin =  async (authInfo) => {
//     console.log(this.props)
//     const result= await this.signInWithGoogle()
//     console.log('SIGNINRESULT', result)
//     // todo: dispatch
//   }
//   handleSignout = async (signOutFn, authInfo) => {
//     const result= await signOutFn()
//     console.log('SIGNOUTRESULT', result)
//     // todo: dispatch
//   }

//   render() {
//     return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>

//         <nav className="nav bg-light">
//           <Link className="brand" to="">S.O. Shreds</Link>
//           <Link to="rivers">Rivers: Current</Link>
//       <Link to="waves">Waves: Current</Link>
//           <Link to="journal">Journal</Link>
//           <Link to="about">About</Link>
//           <div className="nav-right">
//           {
//             this.user
//               ? <a href="#">Hello, {this.user.displayName}</a>
//             : <button onClick={this.handleSignin}>Sign in with Google</button>
//           }
//             {
//               this.user && 
//                 <button class="bg-dark text-light" onClick={this.handleSignout(this.signOut)}>Sign out</button>
//             }
//           </div>
//         </nav>

        
//         <Router>
//           <WaterTabs path="rivers/*" rivers={Rivers}/>
//           <WaveTabs path="waves/*" />
//           <Journal path="journal" rivers={Rivers}/>
//           <MarkdownFromUrl path="about" url="descriptions/about.md"/>
//         </Router>
        
//       </PersistGate>
//     </Provider>
//   )}
// }


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


