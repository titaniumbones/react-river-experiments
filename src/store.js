import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for we
import thunk from 'redux-thunk'; // no changes here 😀
import { persistStore, persistReducer } from 'redux-persist'
import mainReducer from './reducers/mainReducer.js'


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

export {persistor, store}

export default store

