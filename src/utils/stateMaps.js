export function mapJournalToProps(state) {
  const loggedIn = state.user?.user
  return {
    entries: loggedIn ? state.journal[loggedIn] : state.journal.anonymous,
    uid: loggedIn,
    filters: state.journalFilter
  };
}

export function mapUserToProps(state) {
  const loggedIn = state.user?.user
  return {
    uid: loggedIn
  };
}

