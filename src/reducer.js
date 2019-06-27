const initialState = {
  projects: [],
  message: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROJECTS_FETCH_SUCCEEDED':
      return {
        ...state,
        projects: action.payload,
      }
    case 'PROJECTS_FETCH_FAILED':
      return {
        ...state,
        message: action.payload,
      }
    default:
      return state
  }
}

export default reducer
