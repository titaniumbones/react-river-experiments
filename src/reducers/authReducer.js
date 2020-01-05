

export default  (authState = {}, action) => {
  switch(action.type) {
  case('CREATE_USER_SUCCESS'):
    // const { user } = action.payload;
    return { loggedIn: true, user: action.payload }
  case('CREATE_USER_FAIL'):
    const { error } = action;
    return { ...authState, loggedIn: false, error }
  case ('LOGOUT'):
    return {loggedIn: false}
  default:
    return authState;
  }
}
