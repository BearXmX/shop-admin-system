const state = {
  currentUser: JSON.parse(window.localStorage.getItem('currentUser')!) as LoginResponseType | {},
}

export default state
