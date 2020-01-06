import store from '../store.js';
import firebase from '../firebase.js'
import Rivers from '../rivers.js'
import Breaks from '../surfspots.js'
export function getSpot (slug) {
  let value;
  console.log("GETSPOT", slug)
  for (const r of Rivers) {
    console.log('GETSPOT', r.slug, slug);
    if (r.slug === slug ) {value = r;}
  }
  for (const b of Breaks) {
    console.log('GETSPOT', b.slug, slug);
    if (b.slug === slug ) {value = b;}
    
  }
  return value;
}

export function isRiver (slug) {
  return (Rivers.findIndex(i => i.slug === slug) <0) ?
    false :
    true
}

export function  compareJournals (local, cloud)  {
  console.log('RUNNING COMPAREJOURNALS')
  // cloud= snapshot.val()
  let uid = store.getState().user?.user
  console.log('UID', uid)
  let myLocalEntries = local[uid]
  if (myLocalEntries) {
  let localCopy = [...myLocalEntries]
  for (let id in cloud) {
    console.log('ENTRYID', id, localCopy)
    //const isHere = local.filter(local => local.id === id)
    const localIndex = localCopy.findIndex(function(i){
      return i.id === id;
    })
      console.log('ENTRYID', localIndex)
    if (localIndex < 0) {
        console.log('NOENTRY', `no entry for ${id}`)
      const {date, entry, spot, updated, rating} = cloud[id];
      store.dispatch({type: 'ADD_ENTRY', payload:{spot, date, entry, id, rating, updated}})
    } else {
      const l = localCopy[localIndex],
            c = cloud[id]
      if (l.updated > c.updated) {
          firebase.database().ref(`journal/${uid}/${l.id}`).set({
            spot: l.spot,
            date: l.date,
            entry: l.entry,
            rating: l.rating,
            updated: l.updated
          })
      } else if (l.updated < c.updated) {
        const {date, entry, spot, updated,rating} = cloud[id];
        store.dispatch({type: 'UPDATE_ENTRY', payload:{spot, date, entry, id, rating, updated}})
      }
      localCopy.splice(localIndex, 1);
    }
    for (let e of localCopy) {
      console.log('LOCALCOPY', e)
    //store.dispatch({type: 'DELETE_ENTRY', payload: {id: e.id}})
    }
  } 
    // if (isHere.length === 0) {
    // } else if (isHere[0].updated > cloud[id].updated) {
    //   const e= isHere[0]
    // } else if (isHere[0].updated < cloud[id].updated) {
    // }
    
  }
  else {
    for (let id in cloud) {
      const {date, entry, spot, updated, rating} = cloud[id];
      store.dispatch({type: 'ADD_ENTRY', payload:{spot, date, entry, id, updated, rating}})
    }
  }
  console.log('FBENTRIES', cloud)
}
