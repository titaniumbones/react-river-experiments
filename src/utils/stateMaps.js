// so simple! but keepineg here in case I change state structure later
export const userSelector  = (state) => state.user?.user;

export const journalSelector = (state) => {
  const loggedIn = state.user?.user 
  return {
    entries: loggedIn ? state.journal[loggedIn] : state.journal.anonymous,
    uid: loggedIn,
    filters: state.journalFilter
  };
}

export function mapJournalToProps(state) {
  const loggedIn = state.user?.user
  return {
    entries: loggedIn ? state.journal[loggedIn] : state.journal.anonymous,
    uid: loggedIn,
    filters: state.journalFilter
  };
}

export const mapUserToProps = (state) => {
  //const loggedIn = state.user?.user
  return {
    uid: state.user?.user
  };
}

