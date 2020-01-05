

export default  (authState = {}, action) => {
  switch(action.type) {
  case('CREATE_USER_SUCCESS'):
    const { user: { uid: userId} } = action;
    return { ...authState, loggedIn: true, userId }
  case('CREATE_USER_FAIL'):
    const { error } = action;
    return { ...authState, loggedIn: false, error }
  default:
    return authState;
  }
}
