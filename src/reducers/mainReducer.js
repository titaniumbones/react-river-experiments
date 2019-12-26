import { combineReducers } from 'redux'
const initialState = {
  journal: {
    entries: [
      {spot: 'irvine', date: 'December 10, 2019', id: 235,
       entry:'Moderate Level.  somewhat sticky hole at the bottom of three ledges, Mike flipped and the hole was big enough to hold a solo canoe.  Flippy hole at the river-right bottom of Triple Drop, flipped both me and Ian. River left, center both too low torun; pothole in trible drop river right clearly visible as a spouting rooster tail. Ledges clearly visible within the dam waterfall, deifnitely below a safe level for me to run.  Canyon section no harder than class II,but still continuous to the junction with the Gorge section.  Gorge fairly mellow, Chute at a good level.'}],
    current: {spot:'', date:'', entry:'' }
  },
  charts: [],
  sessions: [],
  current: []
}


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
    const newJournal = journalState.entries.concat(action.payload)
    return {entries: newJournal}
  case 'UPDATE_ENTRY':
    // TODO: fix so that we iterate through and change the one entry
    // should be really easy but feels a bit unwieldy
    const updatedEntries = journalState.entries.map( (entry) => {
      if (entry.id === action.payload.id) {
        return action.payload
      }
      return entry 
    })
    return {entries: updatedEntries}
  case 'DELETE_ENTRY':
    // TODO: fix so that we iterate through and change the one entry
    // should be really easy but feels a bit unwieldy
    return {
      entries: journalState.entries.filter( (entry) => {
        if (entry.id === action.payload.id) {
          return false
        }
        return true
      })
    }
  default:
    return journalState
  }
}

function chartsReducer(chartsState=initialState, action) {
  switch (action.type) {
  case 'UPDATE_CHART':
    const newChartsState = {...chartsState}
    newChartsState[action.id] = action.payload
    return newChartsState
  default:
    return chartsState
  }
}
  
export default function mainReducer(state=initialState, action) {
  // just gonna leave this blank for now
  // which is the same as `return undefined;`
  console.log('REDUCING!')
  return {
    journal: journalReducer(state.journal, action),
    charts: chartsReducer(state.charts, action),
    current: [],
    sessions: []
  }

}

