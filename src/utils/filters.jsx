import moment from 'moment';

export function starFilter (crit, entry) {
  return (entry.rating >= crit) ?
    true :
    false
}

export function dateFilter (crit, entry) {
  function v (d) { return moment(d).valueOf()}
  return (v(entry.date) >= v(crit[0]) && v(entry.date) <= v(crit[1])) ?
    true :
    false
}

export function spotFilter (crit, entry) {
  return (crit === entry.spot)
}

const filterMap = {
  rating: starFilter,
  spot: spotFilter,
  date: dateFilter
}
export function filterEntries (f, entries) {
  let copyEntries = [...entries];
  for (const [key, value] of Object.entries(f)) {
    if (value) {
      const filterFn = filterMap[key];
      const filterCriterion = value
      copyEntries = copyEntries.filter( (ent) => filterFn(filterCriterion, ent))
    }
  }
  return copyEntries
}
