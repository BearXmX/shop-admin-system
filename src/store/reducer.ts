import state from './state'

const reducer = (initState = state, action: { type: string; payload: any }) => {
  const type = action.type

  const payload = action.payload || null

  switch (type) {
    case 'login':
      return {
        ...initState,
        currentUser: payload,
      }
    case 'quit':
      return {
        ...initState,
        currentUser: payload,
      }
    default:
      return initState
  }
}

export default reducer
