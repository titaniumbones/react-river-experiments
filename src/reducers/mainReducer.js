import { combineReducers } from 'redux';
import authReducer from './authReducer.js'
import {initialState } from './initialState.js'
function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues)
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }
    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
  return updatedItems
}


function journalReducer(journalState=[], action) {
  
  switch (action.type){
      case 'ADD_ENTRY':
    // TODO: should these be object properties instead?
    // might make it easier to update
    const newJournal = journalState.concat(action.payload)
    return newJournal
  case 'UPDATE_ENTRY':
    // TODO: fix so that we iterate through and change the one entry
    // should be really easy but feels a bit unwieldy
    const updatedEntries = journalState.map( (entry) => {
      if (entry.id === action.payload.id) {
        return action.payload
      }
      return entry 
    })
    return updatedEntries
  case 'DELETE_ENTRY':
    console.log('DELETEENTRY', journalState)
    const newState = journalState.filter( (entry) => {
      if (entry.id === action.payload.id) {
        return false
      }
      return true
    })
    return  newState
  default:
    return journalState
  }
}

function chartsReducer(chartsState=initialState, action) {
  switch (action.type) {
  case 'UPDATE_CHART':
    {const newChartsState = {...chartsState}
    newChartsState[action.id] = action.payload
    return newChartsState}
  case 'DELETE_CHART':
    {const newChartsState = {...chartsState}
    delete newChartsState[action.id]
    return newChartsState}
  default:
    return chartsState
  }
}

//TODO: actually track UI state!!
export function uiReducer (uiState={}, action) {
  switch (action.type) {
  case 'SET_ACTIVE_TAB':
    return uiState
  default:
    return uiState
  }
}

export function journalFilterReducer (filterState=[], action) {
  switch (action.type) {
  case 'SET_FILTER':
    return { ...filterState, ...action.payload}
  default:
    return filterState
  }
}

export default function mainReducer(state=initialState, action) {
  // just gonna leave this blank for now
  // which is the same as `return undefined;`
  console.log('REDUCING!')
  return {
    
    charts: chartsReducer(state.charts, action),
    current: [],
    sessions: [],
    ui: uiReducer(state.ui, action),
    user: authReducer(state.user, action),
    journal: (state.user?.user) ?
              {[state.user.user] : journalReducer(state.journal[state.user.user], action),
               anonymous: state.journal.anonymous}
              :
              {anonymous: journalReducer(state.journal.anonymous, action)}
             
    ,
    journalFilter: journalFilterReducer(state.journalFilter, action)
  }
}
